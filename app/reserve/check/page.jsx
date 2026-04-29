"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

const USER_STORAGE_KEY = "sakurakuUser";
const CURRENT_RESERVATION_STORAGE_KEY = "sakurakuCurrentReservation";
const RESERVATIONS_STORAGE_KEY = "sakurakuReservations";
const AVAILABILITY_STORAGE_KEY = "sakurakuAvailability";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
const BUFFER_MINUTES = 60;

function timeStringToMinutes(time) {
  if (!time) return 0;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function generateTimeSlots() {
  const slots = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

function getBlockedEndMinutes(startTime, treatmentMinutes) {
  const startMinutes = timeStringToMinutes(startTime);
  const closeMinutes = CLOSE_HOUR * 60;
  const blockedEndMinutes = startMinutes + treatmentMinutes + BUFFER_MINUTES;

  return Math.min(blockedEndMinutes, closeMinutes);
}

function getSlotsToRestore(reservation) {
  if (!reservation?.startTime) return [];

  const totalMinutes = Number(reservation?.totalMinutes) || 60;
  const startMinutes = timeStringToMinutes(reservation.startTime);
  const blockedEndMinutes = getBlockedEndMinutes(
    reservation.startTime,
    totalMinutes
  );

  return generateTimeSlots().filter((slot) => {
    const slotMinutes = timeStringToMinutes(slot);
    return slotMinutes >= startMinutes && slotMinutes < blockedEndMinutes;
  });
}

function isSameDay(dateKey) {
  if (!dateKey) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reservationDate = new Date(dateKey);
  reservationDate.setHours(0, 0, 0, 0);

  return reservationDate.getTime() === today.getTime();
}

function isActiveReservation(reservation) {
  return reservation?.status !== "cancelled";
}

function sortReservationsByDateTime(a, b) {
  const aKey = `${a?.date || ""} ${a?.startTime || ""}`;
  const bKey = `${b?.date || ""} ${b?.startTime || ""}`;
  return aKey.localeCompare(bKey);
}

function readJsonArrayFromStorage(key) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`${key} の読み込みに失敗しました`, error);
    return [];
  }
}

function readCurrentReservationFromStorage() {
  try {
    const saved = localStorage.getItem(CURRENT_RESERVATION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("現在予約の読み込みに失敗しました", error);
    return null;
  }
}

export default function ReserveCheckPage() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [pendingCancelReservation, setPendingCancelReservation] = useState(null);
  const [isCancelProcessing, setIsCancelProcessing] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (!savedUser) {
          window.location.href = "/register";
          return;
        }

        const parsedUser = JSON.parse(savedUser);

        if (!parsedUser?.isLoggedIn) {
          window.location.href = "/register";
          return;
        }

        let userReservations = [];

        if (parsedUser?.userId) {
          const reservationsQuery = query(
            collection(db, "reservations"),
            where("customerId", "==", parsedUser.userId)
          );
          const snapshot = await getDocs(reservationsQuery);

          userReservations = snapshot.docs
            .map((reservationDoc) => ({
              id: reservationDoc.id,
              ...reservationDoc.data(),
            }))
            .filter(isActiveReservation)
            .sort(sortReservationsByDateTime);
        }

        if (userReservations.length === 0) {
          const localReservations = readJsonArrayFromStorage(
            RESERVATIONS_STORAGE_KEY
          );
          const currentReservation = readCurrentReservationFromStorage();
          const combinedReservations = currentReservation
            ? [currentReservation, ...localReservations]
            : localReservations;

          userReservations = combinedReservations
            .filter((item) => {
              const reservationName =
                item?.customerName || item?.customer?.name || "";

              if (item?.customerId && parsedUser?.userId) {
                return item.customerId === parsedUser.userId;
              }

              return reservationName === parsedUser.name;
            })
            .filter(isActiveReservation)
            .filter((item, index, self) => {
              const itemId = item?.id || `${item?.date}-${item?.startTime}`;
              return (
                self.findIndex(
                  (other) =>
                    (other?.id || `${other?.date}-${other?.startTime}`) ===
                    itemId
                ) === index
              );
            })
            .sort(sortReservationsByDateTime);
        }

        setReservations(userReservations);
      } catch (error) {
        console.error("予約情報の読み込みに失敗しました", error);
        setReservations([]);
      }
    };

    loadReservations();
  }, []);

  const removeLocalReservationBackup = (targetReservation) => {
    try {
      const savedReservations = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      const allReservations = savedReservations
        ? JSON.parse(savedReservations)
        : [];

      const updatedReservations = Array.isArray(allReservations)
        ? allReservations.filter((item) => item.id !== targetReservation.id)
        : [];

      localStorage.setItem(
        RESERVATIONS_STORAGE_KEY,
        JSON.stringify(updatedReservations)
      );

      const savedCurrent = localStorage.getItem(CURRENT_RESERVATION_STORAGE_KEY);

      if (savedCurrent) {
        const currentReservation = JSON.parse(savedCurrent);

        if (currentReservation?.id === targetReservation.id) {
          localStorage.removeItem(CURRENT_RESERVATION_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("localStorage側の予約削除に失敗しました", error);
    }
  };

  const removeReservation = async (targetReservation) => {
    if (!targetReservation?.id || !targetReservation?.date) return;

    const reservationRef = doc(db, "reservations", targetReservation.id);
    const availabilityRef = doc(db, "availability", targetReservation.date);
    const slotsToRestore = getSlotsToRestore(targetReservation);

    await runTransaction(db, async (transaction) => {
      const availabilitySnap = await transaction.get(availabilityRef);

      const currentDay =
        availabilitySnap.exists() &&
        Array.isArray(availabilitySnap.data()?.slots)
          ? availabilitySnap.data().slots
          : [];

      const restoredDay = Array.from(
        new Set([...currentDay, ...slotsToRestore])
      ).sort((a, b) => timeStringToMinutes(a) - timeStringToMinutes(b));

      transaction.set(
        availabilityRef,
        {
          date: targetReservation.date,
          slots: restoredDay,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      transaction.set(
        reservationRef,
        {
          status: "cancelled",
          cancelledAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    });

    removeLocalReservationBackup(targetReservation);

    try {
      const savedAvailability = localStorage.getItem(AVAILABILITY_STORAGE_KEY);

      if (savedAvailability) {
        const availability = JSON.parse(savedAvailability);
        const currentDay = Array.isArray(availability[targetReservation.date])
          ? availability[targetReservation.date]
          : [];

        const restoredDay = Array.from(
          new Set([...currentDay, ...slotsToRestore])
        ).sort((a, b) => timeStringToMinutes(a) - timeStringToMinutes(b));

        localStorage.setItem(
          AVAILABILITY_STORAGE_KEY,
          JSON.stringify({
            ...availability,
            [targetReservation.date]: restoredDay,
          })
        );
      }
    } catch (error) {
      console.error("localStorage側の空き枠復元に失敗しました", error);
    }

    setReservations((prev) =>
      prev.filter((item) => item.id !== targetReservation.id)
    );
    setSelectedReservation(null);
  };

  const handleChangeReservation = async (targetReservation) => {
    if (isSameDay(targetReservation?.date)) {
      alert("当日の変更はLINEにてご連絡ください。");
      return;
    }

    try {
      await removeReservation(targetReservation);
      window.location.href = "/menu";
    } catch (error) {
      console.error("予約変更処理に失敗しました", error);
      alert("予約変更処理に失敗しました。もう一度お試しください。");
    }
  };

  const handleCancelReservation = (targetReservation) => {
    if (isSameDay(targetReservation?.date)) {
      alert("当日のキャンセルはLINEにてご連絡ください。");
      return;
    }

    setPendingCancelReservation(targetReservation);
  };

  const handleCloseCancelConfirm = () => {
    if (isCancelProcessing) return;
    setPendingCancelReservation(null);
  };

  const handleConfirmCancelReservation = async () => {
    if (!pendingCancelReservation || isCancelProcessing) return;

    try {
      setIsCancelProcessing(true);
      await removeReservation(pendingCancelReservation);
      setPendingCancelReservation(null);
      setNoticeMessage("ご予約を取り消しました");
    } catch (error) {
      console.error("予約の取り消しに失敗しました", error);
      alert("予約の取り消しに失敗しました。もう一度お試しください。");
    } finally {
      setIsCancelProcessing(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.hederaWrap}>
          <img
            src="/images/hedera.png"
            alt="hedera decoration"
            style={styles.hederaImage}
          />
        </div>

        <div style={styles.titleBox}>
          <span style={styles.titleText}>ご予約内容</span>
        </div>

        <div style={styles.card}>
          <div style={styles.listArea}>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <button
                  key={reservation.id}
                  type="button"
                  onClick={() => setSelectedReservation(reservation)}
                  style={styles.reservationRow}
                >
                  <div style={styles.rowDate}>
                    {reservation.reserveDate || ""}
                  </div>
                  <div style={styles.rowTime}>
                    {reservation.reserveTime || ""}
                  </div>
                </button>
              ))
            ) : (
              <div style={styles.emptyText}>
                現在表示できるご予約はありません。
              </div>
            )}
          </div>

          <div style={styles.message}>
            <div>ご来店を心よりお待ちしております🌸</div>
            <div>ご不明な点がありましたらお気軽にLINEからお問合せください</div>
          </div>

          <div style={styles.buttonArea}>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              style={styles.backButton}
            >
              戻る
            </button>
          </div>

          <div style={styles.historyLinkWrap}>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/reserve/history";
              }}
              style={styles.historyLink}
            >
              過去のご予約を見る
            </button>
          </div>
        </div>
      </div>

      {selectedReservation && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedReservation(null)}
        >
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedReservation(null)}
              style={styles.closeButton}
            >
              ×
            </button>

            <div style={styles.modalDateBox}>
              <div style={styles.modalDate}>
                {selectedReservation.reserveDate || ""}
              </div>
              <div style={styles.modalTime}>
                {selectedReservation.reserveTime || ""}
              </div>
            </div>

            <div style={styles.modalMenu}>
              <div>
                {selectedReservation.menuName || ""}
                {selectedReservation.menuTime
                  ? `（${selectedReservation.menuTime}）`
                  : ""}
              </div>
              {selectedReservation.price && (
                <div style={styles.modalPrice}>{selectedReservation.price}</div>
              )}
            </div>

            {Array.isArray(selectedReservation.options) &&
              selectedReservation.options.length > 0 && (
                <div style={styles.modalOptions}>
                  <div style={styles.optionTitle}>オプション</div>
                  <div style={styles.optionText}>
                    {selectedReservation.options.join("　")}
                  </div>
                </div>
              )}

            {selectedReservation.totalPrice && (
              <div style={styles.totalPrice}>
                合計　{selectedReservation.totalPrice}
              </div>
            )}

            <div style={styles.modalDivider} />

            <button
              type="button"
              onClick={() => handleChangeReservation(selectedReservation)}
              style={styles.changeButton}
            >
              この予約を変更する
            </button>

            <button
              type="button"
              onClick={() => handleCancelReservation(selectedReservation)}
              style={styles.cancelButton}
            >
              この予約を取り消す
            </button>
          </div>
        </div>
      )}

      {pendingCancelReservation && (
        <div
          style={styles.confirmOverlay}
          onClick={handleCloseCancelConfirm}
        >
          <div
            style={styles.confirmCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.confirmTitle}>ご予約を取り消しますか？</div>
            <div style={styles.confirmText}>
              取り消した予約枠は、再度ご予約可能な状態に戻ります。
            </div>

            <button
              type="button"
              onClick={handleConfirmCancelReservation}
              disabled={isCancelProcessing}
              style={{
                ...styles.confirmOkButton,
                ...(isCancelProcessing ? styles.confirmButtonDisabled : {}),
              }}
            >
              {isCancelProcessing ? "取り消し中..." : "取り消す"}
            </button>

            <button
              type="button"
              onClick={handleCloseCancelConfirm}
              disabled={isCancelProcessing}
              style={{
                ...styles.confirmCancelButton,
                ...(isCancelProcessing ? styles.confirmButtonDisabled : {}),
              }}
            >
              戻る
            </button>
          </div>
        </div>
      )}

      {noticeMessage && (
        <div
          style={styles.confirmOverlay}
          onClick={() => setNoticeMessage("")}
        >
          <div
            style={styles.confirmCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.confirmTitle}>{noticeMessage}</div>
            <button
              type="button"
              onClick={() => setNoticeMessage("")}
              style={styles.confirmOkButton}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokume.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px 24px",
    boxSizing: "border-box",
  },

  wrap: {
    position: "relative",
    width: "100%",
    maxWidth: "390px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  hederaWrap: {
    position: "absolute",
    top: "-6px",
    left: 0,
    width: "100%",
    height: "92px",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 3,
  },

  hederaImage: {
    width: "100%",
    height: "auto",
    display: "block",
    userSelect: "none",
  },

  titleBox: {
    position: "relative",
    zIndex: 2,
    width: "68%",
    maxWidth: "250px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "12px",
    marginBottom: "14px",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,248,243,0.46) 55%, rgba(255,245,239,0.34) 100%)",
    borderRadius: "18px",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    boxShadow:
      "0 3px 10px rgba(120, 90, 70, 0.04), inset 0 1px 0 rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.14)",
  },

  titleText: {
    color: "#6e4b41",
    fontSize: "clamp(16px, 4.2vw, 20px)",
    fontWeight: 500,
    letterSpacing: "0.05em",
    lineHeight: 1.2,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    textShadow: "0 1px 3px rgba(255,255,255,0.18)",
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "340px",
    background: "rgba(255, 250, 246, 0.9)",
    borderRadius: "28px",
    padding: "14px 14px 16px",
    boxSizing: "border-box",
    boxShadow: "0 8px 20px rgba(110, 80, 65, 0.06)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    marginTop: "2px",
  },

  listArea: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "14px",
  },

  reservationRow: {
    width: "100%",
    border: "none",
    borderRadius: "22px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "12px 10px 11px",
    textAlign: "center",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  rowDate: {
    color: "#6a4337",
    fontSize: "clamp(16px, 4.4vw, 22px)",
    fontWeight: 600,
    letterSpacing: "0.02em",
    lineHeight: 1.35,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  rowTime: {
    color: "#6a4337",
    fontSize: "clamp(16px, 4.2vw, 21px)",
    fontWeight: 600,
    letterSpacing: "0.01em",
    lineHeight: 1.3,
    marginTop: "2px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  emptyText: {
    color: "#84675d",
    fontSize: "clamp(13px, 3.2vw, 15px)",
    lineHeight: 1.7,
    textAlign: "center",
    padding: "20px 8px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  message: {
    color: "#84675d",
    fontSize: "clamp(10px, 2.75vw, 13px)",
    lineHeight: 1.6,
    letterSpacing: "0.01em",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    textAlign: "center",
    marginBottom: "12px",
  },

  buttonArea: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "8px",
  },

  backButton: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#8d7066",
    fontSize: "clamp(13px, 3.1vw, 15px)",
    letterSpacing: "0.04em",
    cursor: "pointer",
    padding: "0",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  historyLinkWrap: {
    textAlign: "center",
    marginTop: 0,
  },

  historyLink: {
    border: "none",
    background: "transparent",
    color: "#8f766a",
    fontSize: "clamp(12px, 2.95vw, 14px)",
    letterSpacing: "0.03em",
    cursor: "pointer",
    padding: "4px 6px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(49, 35, 29, 0.28)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000,
    boxSizing: "border-box",
  },

  modalCard: {
    position: "relative",
    width: "100%",
    maxWidth: "340px",
    background: "rgba(255, 250, 246, 0.96)",
    borderRadius: "28px",
    padding: "18px 14px 16px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(110, 80, 65, 0.18)",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "14px",
    border: "none",
    background: "transparent",
    color: "#8d7066",
    fontSize: "28px",
    lineHeight: 1,
    cursor: "pointer",
  },

  modalDateBox: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "22px",
    padding: "12px 10px 11px",
    textAlign: "center",
    marginBottom: "12px",
  },

  modalDate: {
    color: "#6a4337",
    fontSize: "clamp(16px, 4.4vw, 22px)",
    fontWeight: 600,
    lineHeight: 1.35,
  },

  modalDateLabel: {
    fontSize: "clamp(12px, 3.2vw, 14px)",
    fontWeight: 500,
    color: "#8a7167",
  },

  modalTime: {
    color: "#6a4337",
    fontSize: "clamp(16px, 4.2vw, 21px)",
    fontWeight: 600,
    lineHeight: 1.3,
    marginTop: "2px",
  },

  modalMenu: {
    textAlign: "center",
    color: "#7d5b50",
    fontSize: "clamp(16px, 4vw, 20px)",
    lineHeight: 1.55,
    letterSpacing: "0.02em",
    marginBottom: "8px",
  },

  modalPrice: {
    fontSize: "clamp(14px, 3.6vw, 18px)",
    color: "#8d7066",
    marginTop: "1px",
  },

  modalOptions: {
    color: "#8c6c61",
    fontSize: "clamp(11px, 2.9vw, 14px)",
    lineHeight: 1.65,
    textAlign: "center",
    marginBottom: "8px",
  },

  optionTitle: {
    marginBottom: "2px",
    fontSize: "clamp(12px, 3.1vw, 14px)",
  },

  optionText: {
    color: "#9a7f76",
    fontSize: "clamp(10px, 2.7vw, 13px)",
    lineHeight: 1.7,
  },

  totalPrice: {
    textAlign: "center",
    color: "#6f4b41",
    fontSize: "clamp(16px, 4vw, 19px)",
    lineHeight: 1.45,
    letterSpacing: "0.02em",
    marginBottom: "10px",
    borderBottom: "1px solid rgba(120, 89, 74, 0.25)",
    paddingBottom: "4px",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
  },

  modalDivider: {
    width: "100%",
    height: "1px",
    background: "rgba(120, 89, 74, 0.12)",
    marginBottom: "12px",
  },

  changeButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #dfa4b5 0%, #d291a4 100%)",
    color: "#fffdfb",
    fontSize: "clamp(16px, 4.2vw, 22px)",
    fontWeight: 700,
    letterSpacing: "0.03em",
    padding: "13px 16px",
    cursor: "pointer",
    boxShadow: "0 7px 16px rgba(210, 140, 160, 0.13)",
    fontFamily: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
    marginBottom: "10px",
  },

  cancelButton: {
    width: "100%",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.82)",
    color: "#7d5b50",
    fontSize: "clamp(15px, 3.9vw, 20px)",
    fontWeight: 500,
    letterSpacing: "0.03em",
    padding: "12px 16px",
    cursor: "pointer",
    border: "1.5px solid rgba(145, 112, 101, 0.16)",
    boxShadow: "none",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  confirmOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(49, 35, 29, 0.34)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "22px",
    zIndex: 2000,
    boxSizing: "border-box",
  },

  confirmCard: {
    width: "100%",
    maxWidth: "320px",
    background: "rgba(255, 250, 246, 0.98)",
    borderRadius: "28px",
    padding: "24px 18px 18px",
    boxSizing: "border-box",
    boxShadow: "0 14px 34px rgba(110, 80, 65, 0.2)",
    border: "1px solid rgba(255,255,255,0.48)",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    textAlign: "center",
  },

  confirmTitle: {
    color: "#6e4b41",
    fontSize: "clamp(18px, 4.6vw, 22px)",
    fontWeight: 700,
    lineHeight: 1.55,
    letterSpacing: "0.04em",
    marginBottom: "10px",
  },

  confirmText: {
    color: "#8a7167",
    fontSize: "clamp(12px, 3.2vw, 14px)",
    lineHeight: 1.75,
    letterSpacing: "0.02em",
    marginBottom: "18px",
  },

  confirmOkButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #dfa4b5 0%, #d291a4 100%)",
    color: "#fffdfb",
    fontSize: "clamp(16px, 4vw, 20px)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    padding: "13px 16px",
    cursor: "pointer",
    boxShadow: "0 7px 16px rgba(210, 140, 160, 0.13)",
    fontFamily: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
    marginBottom: "10px",
  },

  confirmCancelButton: {
    width: "100%",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.82)",
    color: "#7d5b50",
    fontSize: "clamp(15px, 3.8vw, 19px)",
    fontWeight: 500,
    letterSpacing: "0.04em",
    padding: "12px 16px",
    cursor: "pointer",
    border: "1.5px solid rgba(145, 112, 101, 0.16)",
    boxShadow: "none",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  confirmButtonDisabled: {
    opacity: 0.62,
    cursor: "not-allowed",
  },
};
