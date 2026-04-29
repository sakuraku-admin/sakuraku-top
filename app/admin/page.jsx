"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
const BUFFER_MINUTES = 60;

const DEFAULT_MENU_NAME = "深整コース 120分";
const DEFAULT_TREATMENT_MINUTES = 120;

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getTodayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatJapaneseDate(date) {
  const weeks = ["日", "月", "火", "水", "木", "金", "土"];
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: weeks[date.getDay()],
  };
}

function generateTimeSlots() {
  const slots = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

function timeStringToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTimeString(totalMinutes) {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function buildMockAvailability() {
  const today = new Date();
  const data = {};
  const allSlots = generateTimeSlots();

  for (let i = 0; i < 42; i++) {
    const date = addDays(today, i);
    const dateKey = formatDateKey(date);

    data[dateKey] = allSlots;
  }

  return data;
}

function canReserveAt(startTime, treatmentMinutes) {
  const start = timeStringToMinutes(startTime);
  const treatmentEnd = start + treatmentMinutes;
  const close = CLOSE_HOUR * 60;

  return treatmentEnd <= close;
}

function getBlockedEndTime(startTime, treatmentMinutes, bufferMinutes) {
  const start = timeStringToMinutes(startTime);
  const close = CLOSE_HOUR * 60;
  const blockedEnd = start + treatmentMinutes + bufferMinutes;

  return Math.min(blockedEnd, close);
}

function isStartMarkedAvailable(dateKey, time, mockAvailability) {
  const dayStarts = mockAvailability[dateKey] || [];
  return dayStarts.includes(time);
}

function isToday(dateKey) {
  const todayKey = formatDateKey(new Date());
  return dateKey === todayKey;
}

function buildAvailabilityFromFirestoreDocs(docs) {
  const base = buildMockAvailability();

  docs.forEach((snap) => {
    const data = snap.data();
    if (Array.isArray(data?.slots)) {
      base[snap.id] = data.slots;
    }
  });

  return base;
}

async function readAvailabilityFromFirestore() {
  try {
    const snapshot = await getDocs(collection(db, "availability"));
    return buildAvailabilityFromFirestoreDocs(snapshot.docs);
  } catch (error) {
    console.error("Firestoreの予約枠データ読み込みに失敗しました", error);
    return buildMockAvailability();
  }
}

async function readReservationsFromFirestore() {
  try {
    const reservationsQuery = query(
      collection(db, "reservations"),
      where("status", "==", "active")
    );

    const snapshot = await getDocs(reservationsQuery);

    return snapshot.docs.map((snap) => ({
      id: snap.id,
      ...snap.data(),
    }));
  } catch (error) {
    console.error("Firestoreの予約一覧データ読み込みに失敗しました", error);
    return [];
  }
}

function findReservationStart(dateKey, time, reservations) {
  return reservations.find(
    (reservation) => reservation?.date === dateKey && reservation?.startTime === time
  );
}

function getReservationBlockedEndTime(reservation) {
  const treatmentMinutes = Number(reservation?.totalMinutes) || 60;
  return getBlockedEndTime(
    reservation?.startTime || "",
    treatmentMinutes,
    BUFFER_MINUTES
  );
}

function getSlotsToRestore(reservation) {
  if (!reservation?.startTime) return [];

  const startMinutes = timeStringToMinutes(reservation.startTime);
  const blockedEndMinutes = getReservationBlockedEndTime(reservation);

  return generateTimeSlots().filter((slot) => {
    const slotMinutes = timeStringToMinutes(slot);
    return slotMinutes >= startMinutes && slotMinutes < blockedEndMinutes;
  });
}

function ReserveDateTimeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [weekStart, setWeekStart] = useState(getTodayStart());
  const [selected, setSelected] = useState(null);
  const [mockAvailability, setMockAvailability] = useState(buildMockAvailability);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const courseId = searchParams.get("courseId") || "";
  const courseName = searchParams.get("courseName") || DEFAULT_MENU_NAME;
  const durationParam = searchParams.get("duration");
  const optionMinutesParam = searchParams.get("optionMinutes");
  const selectedOptionsParam = searchParams.get("selectedOptions") || "";
  const optionPriceParam = searchParams.get("optionPrice") || "";
  const priceParam = searchParams.get("price") || "";
  const typeParam = searchParams.get("type") || "";

  const baseTreatmentMinutes =
    Number.parseInt(durationParam, 10) || DEFAULT_TREATMENT_MINUTES;
  const optionMinutes = Number.parseInt(optionMinutesParam, 10) || 0;
  const treatmentMinutes = baseTreatmentMinutes + optionMinutes;

  const displayMenuName = selectedOptionsParam
    ? `${courseName}＋${selectedOptionsParam}`
    : courseName;

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  useEffect(() => {
    const loadFirestoreData = async () => {
      const [availabilityData, reservationData] = await Promise.all([
        readAvailabilityFromFirestore(),
        readReservationsFromFirestore(),
      ]);

      setMockAvailability(availabilityData);
      setReservations(reservationData);
    };

    loadFirestoreData();
  }, []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const handlePrevWeek = () => {
    setWeekStart((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => addDays(prev, 7));
  };

  const handleSelect = async (dateKey, time) => {
    const withinBusinessHours = canReserveAt(time, treatmentMinutes);
    const reservedStart = findReservationStart(dateKey, time, reservations);

    if (!withinBusinessHours || reservedStart) return;

    const currentDay = mockAvailability[dateKey] || generateTimeSlots();
    const isOpen = currentDay.includes(time);

    const nextDay = isOpen
      ? currentDay.filter((slot) => slot !== time)
      : [...currentDay, time].sort(
          (a, b) => timeStringToMinutes(a) - timeStringToMinutes(b)
        );

    const nextAvailability = {
      ...mockAvailability,
      [dateKey]: nextDay,
    };

    setMockAvailability(nextAvailability);
    setSelected({ dateKey, time });

    try {
      await setDoc(
        doc(db, "availability", dateKey),
        {
          date: dateKey,
          slots: nextDay,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Firestoreの予約枠データ保存に失敗しました", error);
      alert("予約枠の保存に失敗しました。もう一度お試しください。");
      setMockAvailability(mockAvailability);
    }
  };

  const handleAdminCancelReservation = async (targetReservation) => {
    if (!targetReservation) return;

    const customerName =
      targetReservation.customerName ||
      targetReservation.customer?.name ||
      "お客様";

    const confirmed = window.confirm(
      `${customerName} 様のご予約をキャンセルしますか？`
    );

    if (!confirmed) return;

    try {
      const reservationRef = doc(db, "reservations", targetReservation.id);
      const availabilityRef = doc(db, "availability", targetReservation.date);

      const restoredDay = await runTransaction(db, async (transaction) => {
        const availabilitySnap = await transaction.get(availabilityRef);

        const currentDay =
          availabilitySnap.exists() &&
          Array.isArray(availabilitySnap.data()?.slots)
            ? availabilitySnap.data().slots
            : mockAvailability[targetReservation.date] || generateTimeSlots();

        const slotsToRestore = getSlotsToRestore(targetReservation);

        const nextDay = Array.from(
          new Set([...currentDay, ...slotsToRestore])
        ).sort((a, b) => timeStringToMinutes(a) - timeStringToMinutes(b));

        transaction.update(reservationRef, {
          status: "cancelled",
          cancelledAt: serverTimestamp(),
        });

        transaction.set(
          availabilityRef,
          {
            date: targetReservation.date,
            slots: nextDay,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        return nextDay;
      });

      setReservations((prev) =>
        prev.filter((item) => item.id !== targetReservation.id)
      );

      setMockAvailability((prev) => ({
        ...prev,
        [targetReservation.date]: restoredDay,
      }));

      setSelectedReservation(null);
      alert("ご予約をキャンセルしました");
    } catch (error) {
      console.error("管理画面での予約キャンセルに失敗しました", error);
      alert("予約キャンセル処理に失敗しました。もう一度お試しください。");
    }
  };

  const handleGoConfirm = () => {
    if (!selected) return;

    const params = new URLSearchParams({
      courseId,
      courseName,
      duration: String(baseTreatmentMinutes),
      optionMinutes: String(optionMinutes),
      selectedOptions: selectedOptionsParam,
      optionPrice: optionPriceParam,
      price: priceParam,
      type: typeParam,
      totalMinutes: String(treatmentMinutes),
      date: selected.dateKey,
      time: selected.time,
    });

    router.push(`/reserve/confirm?${params.toString()}`);
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>カレンダー管理</h1>

        <div style={styles.switchWrap}>
          <button style={{ ...styles.switchButton, ...styles.switchButtonActive }}>
            カレンダー管理
          </button>

          <button
            onClick={() => (window.location.href = "/admin/list")}
            style={styles.switchButton}
          >
            予約一覧
          </button>
        </div>

        <section style={styles.calendarInfoCard}>
          <div style={styles.weekButtonRow}>
            <button onClick={handlePrevWeek} style={styles.weekButton}>
              ← 前の週
            </button>

            <button onClick={handleNextWeek} style={styles.weekButton}>
              次の週 →
            </button>
          </div>
        </section>

        <section style={styles.calendarCard}>
          <div style={styles.calendarScroll}>
            <table style={styles.calendarTable}>
              <thead>
                <tr>
                  <th style={styles.timeHead}>時間</th>
                  {weekDates.map((date) => {
                    const jp = formatJapaneseDate(date);
                    const isSat = date.getDay() === 6;
                    const isSun = date.getDay() === 0;

                    return (
                      <th key={formatDateKey(date)} style={styles.dateHead}>
                        <div
                          style={{
                            ...styles.dateTop,
                            color: isSun
                              ? "#d87088"
                              : isSat
                              ? "#6e78d8"
                              : "#5a3a2c",
                          }}
                        >
                          {jp.month}/{jp.day}
                        </div>
                        <div
                          style={{
                            ...styles.dateBottom,
                            color: isSun
                              ? "#d87088"
                              : isSat
                              ? "#6e78d8"
                              : "#5a3a2c",
                          }}
                        >
                          ({jp.week})
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {timeSlots.map((time) => {
                  const [hour, minute] = time.split(":");
                  const isHalf = minute === "30";

                  return (
                    <tr key={`row-${time}`}>
                      <td
                        style={{
                          ...styles.timeCell,
                          ...(isHalf ? styles.timeCellHalf : styles.timeCellHour),
                        }}
                      >
                        {isHalf ? (
                          <span style={styles.halfMinute}>{time}</span>
                        ) : (
                          time
                        )}
                      </td>

                      {weekDates.map((date) => {
                        const dateKey = formatDateKey(date);

                        const reservedStart = findReservationStart(
                          dateKey,
                          time,
                          reservations
                        );

                        const markedAvailable = isStartMarkedAvailable(
                          dateKey,
                          time,
                          mockAvailability
                        );
                        const withinBusinessHours = canReserveAt(
                          time,
                          treatmentMinutes
                        );

                        const isReservable =
                          !isToday(dateKey) &&
                          markedAvailable &&
                          withinBusinessHours;

                        const isSelected =
                          selected?.dateKey === dateKey &&
                          selected?.time === time;

                        const blockedEndTime = getBlockedEndTime(
                          time,
                          treatmentMinutes,
                          BUFFER_MINUTES
                        );

                        return (
                          <td
                            key={`${dateKey}-${time}`}
                            style={{
                              ...styles.slotCell,
                              ...(reservedStart
                                ? styles.slotCellReserved
                                : isReservable
                                ? styles.slotCellAvailable
                                : styles.slotCellUnavailable),
                            }}
                          >
                            {reservedStart ? (
                              <button
                                type="button"
                                onClick={() => setSelectedReservation(reservedStart)}
                                style={{
                                  ...styles.slotButton,
                                  ...styles.slotReserved,
                                }}
                                title={`${reservedStart.customerName || reservedStart.customer?.name || "お客様"} 様のご予約`}
                              >
                                予
                              </button>
                            ) : withinBusinessHours ? (
                              <button
                                onClick={() => handleSelect(dateKey, time)}
                                style={{
                                  ...styles.slotButton,
                                  ...(markedAvailable
                                    ? isSelected
                                      ? styles.slotSelected
                                      : styles.slotAvailable
                                    : styles.slotClosed),
                                }}
                                title={`施術終了 ${minutesToTimeString(
                                  timeStringToMinutes(time) + treatmentMinutes
                                )} / 枠確保 ${blockedEndTime}まで`}
                              >
                                {markedAvailable ? "◎" : "✕"}
                              </button>
                            ) : (
                              <div style={styles.slotUnavailableMark}>✕</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
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
              style={styles.modalCloseButton}
              aria-label="閉じる"
            >
              ×
            </button>

            <div style={styles.modalTitle}>ご予約詳細</div>

            <div style={styles.modalDateBox}>
              <div style={styles.modalDate}>
                {selectedReservation.reserveDate || selectedReservation.date || ""}
              </div>
              <div style={styles.modalTime}>
                {selectedReservation.reserveTime || selectedReservation.startTime || ""}
              </div>
            </div>

            <div style={styles.modalInfoBlock}>
              <div style={styles.modalLabel}>お客様</div>
              <div style={styles.modalValue}>
                {selectedReservation.customerName ||
                  selectedReservation.customer?.name ||
                  "お名前未登録"}{" "}
                様
              </div>
            </div>

            <div style={styles.modalInfoBlock}>
              <div style={styles.modalLabel}>コース</div>
              <div style={styles.modalValue}>
                {selectedReservation.menuName || ""}
                {selectedReservation.menuTime
                  ? `（${selectedReservation.menuTime}）`
                  : ""}
              </div>
            </div>

            <div style={styles.modalInfoBlock}>
              <div style={styles.modalLabel}>所要時間</div>
              <div style={styles.modalValue}>
                {selectedReservation.totalTime ||
                  (selectedReservation.totalMinutes
                    ? `${selectedReservation.totalMinutes}分`
                    : "未登録")}
              </div>
            </div>

            <div style={styles.modalInfoBlock}>
              <div style={styles.modalLabel}>オプション</div>
              <div style={styles.modalOptionValue}>
                {Array.isArray(selectedReservation.options) &&
                selectedReservation.options.length > 0
                  ? selectedReservation.options.join("　")
                  : "なし"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAdminCancelReservation(selectedReservation)}
              style={styles.modalCancelButton}
            >
              この予約をキャンセルする
            </button>

            <button
              type="button"
              onClick={() => setSelectedReservation(null)}
              style={styles.modalCloseBottom}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ReserveDateTimePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <ReserveDateTimeContent />
    </Suspense>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokumekanri.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "28px 18px 56px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },

  title: {
    margin: "0 0 14px 0",
    textAlign: "center",
    color: "#5a3a2c",
    fontSize: "clamp(1.15rem, 5.4vw, 1.5rem)",
    lineHeight: 1.45,
    letterSpacing: "0.03em",
    fontWeight: 700,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    textShadow: "0 1px 6px rgba(255,255,255,0.28)",
  },

  switchWrap: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "12px",
  },

  switchButton: {
    border: "none",
    borderRadius: "999px",
    padding: "11px 10px",
    background: "rgba(255,255,255,0.72)",
    color: "#5f665f",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.9rem",
    boxShadow: "0 6px 16px rgba(90, 110, 95, 0.10)",
  },

  switchButtonActive: {
    background:
      "linear-gradient(180deg, rgba(146, 185, 166, 0.96) 0%, rgba(123, 161, 143, 0.96) 100%)",
    color: "#fffdfa",
    boxShadow: "0 8px 18px rgba(90, 130, 110, 0.18)",
  },

  infoCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    background: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "20px",
    padding: "10px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  infoMiniBox: {
    background: "rgba(255, 250, 247, 0.72)",
    border: "1px solid rgba(170, 130, 109, 0.12)",
    borderRadius: "14px",
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    boxSizing: "border-box",
  },

  infoLabel: {
    fontSize: "0.72rem",
    color: "#9c7f72",
    lineHeight: 1.4,
  },

  infoValue: {
    fontSize: "0.88rem",
    color: "#5a3a2c",
    fontWeight: 700,
    lineHeight: 1.4,
  },

  calendarInfoCard: {
    marginTop: "12px",
    background: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "20px",
    padding: "12px 12px 10px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  weekButtonRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  weekButton: {
    border: "none",
    borderRadius: "999px",
    padding: "10px 8px",
    background:
      "linear-gradient(180deg, rgba(190, 141, 121, 0.96) 0%, rgba(163, 116, 97, 0.96) 100%)",
    color: "#fffaf7",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.84rem",
    whiteSpace: "nowrap",
    boxShadow: "0 8px 18px rgba(140, 106, 83, 0.18)",
  },

  topNextButtonWrap: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "center",
  },

  calendarCard: {
    marginTop: "12px",
    background: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "22px",
    padding: "8px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  calendarScroll: {
    maxHeight: "560px",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "18px",
    background: "#fffdfa",
    border: "1px solid #ece1d8",
  },

  calendarTable: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    background: "#fffdfa",
  },

  timeHead: {
    width: "54px",
    minWidth: "54px",
    height: "68px",
    background: "#f4ece5",
    color: "#5a3a2c",
    fontWeight: 700,
    textAlign: "center",
    fontSize: "0.86rem",
    borderBottom: "1px solid #e6d8cf",
    padding: 0,
    position: "sticky",
    top: 0,
    zIndex: 4,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  dateHead: {
    width: "calc((100% - 54px) / 7)",
    minWidth: "44px",
    height: "68px",
    background: "#fdf7f2",
    borderBottom: "1px solid #e6d8cf",
    borderLeft: "1px solid #f0e6de",
    padding: "6px 2px",
    textAlign: "center",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 3,
  },

  dateTop: {
    fontSize: "0.82rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },

  dateBottom: {
    marginTop: "4px",
    fontSize: "0.74rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },

  timeCell: {
    width: "54px",
    minWidth: "54px",
    height: "54px",
    background: "#faf5f0",
    color: "#5a3a2c",
    fontWeight: 700,
    textAlign: "center",
    borderBottom: "1px solid #eee2d9",
    padding: 0,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  timeCellHour: {
    fontSize: "0.82rem",
    letterSpacing: "0.01em",
  },

  timeCellHalf: {
    fontSize: "0.72rem",
    color: "#8f786d",
  },

  halfMinute: {
    color: "#8f786d",
    opacity: 0.78,
  },

  slotCell: {
    height: "54px",
    borderBottom: "1px solid #eee2d9",
    borderLeft: "1px solid #f2e8e1",
    textAlign: "center",
    padding: 0,
    boxSizing: "border-box",
  },

  slotCellAvailable: {
    background: "#fffdfa",
  },

  slotCellUnavailable: {
    background: "#f1ebe6",
  },

  slotCellReserved: {
    background: "rgba(226, 236, 230, 0.92)",
  },

  slotButton: {
    width: "42px",
    height: "42px",
    borderRadius: "999px",
    fontSize: "1.38rem",
    fontWeight: 700,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.18s ease",
    padding: 0,
    lineHeight: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  slotAvailable: {
    color: "#e2a3b4",
    boxShadow: "none",
    transform: "none",
  },

  slotSelected: {
    color: "#df7e98",
    boxShadow: "none",
    transform: "scale(1.08)",
  },

  slotClosed: {
    color: "#9d918a",
    boxShadow: "none",
    transform: "none",
  },

  slotReserved: {
    color: "#6f8f7e",
    cursor: "pointer",
    boxShadow: "none",
    transform: "none",
  },

  slotUnavailableMark: {
    color: "#9d918a",
    fontSize: "0.96rem",
    fontWeight: 700,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    margin: "0 auto",
    userSelect: "none",
  },

  bottomButtonWrap: {
    marginTop: "22px",
    display: "flex",
    justifyContent: "center",
  },

  nextButton: {
    border: "none",
    borderRadius: "999px",
    padding: "14px 26px",
    fontSize: "1rem",
    fontWeight: 700,
    background: "#d98b9a",
    color: "#fffdfb",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(217, 139, 154, 0.24)",
  },

  nextButtonDisabled: {
    background: "#ccbdb7",
    cursor: "not-allowed",
    boxShadow: "none",
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
      '\"Hiragino Mincho ProN\", \"Yu Mincho\", \"MS PMincho\", serif',
  },

  modalCloseButton: {
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

  modalTitle: {
    textAlign: "center",
    color: "#6e4b41",
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    marginBottom: "12px",
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

  modalTime: {
    color: "#6a4337",
    fontSize: "clamp(16px, 4.2vw, 21px)",
    fontWeight: 600,
    lineHeight: 1.3,
    marginTop: "2px",
  },

  modalInfoBlock: {
    textAlign: "center",
    marginBottom: "10px",
  },

  modalLabel: {
    color: "#9a7f76",
    fontSize: "0.76rem",
    lineHeight: 1.5,
    marginBottom: "2px",
  },

  modalValue: {
    color: "#6f4b41",
    fontSize: "0.98rem",
    fontWeight: 700,
    lineHeight: 1.6,
  },

  modalOptionValue: {
    color: "#8c6c61",
    fontSize: "0.82rem",
    lineHeight: 1.7,
    textAlign: "center",
  },

  modalCancelButton: {
    width: "100%",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.82)",
    color: "#7d5b50",
    fontSize: "0.95rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
    padding: "12px 16px",
    cursor: "pointer",
    border: "1.5px solid rgba(145, 112, 101, 0.16)",
    boxShadow: "none",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    marginTop: "4px",
    marginBottom: "10px",
  },

  modalCloseBottom: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #dfa4b5 0%, #d291a4 100%)",
    color: "#fffdfb",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    padding: "12px 16px",
    cursor: "pointer",
    boxShadow: "0 7px 16px rgba(210, 140, 160, 0.13)",
    fontFamily: '\"Hiragino Kaku Gothic ProN\", \"Yu Gothic\", sans-serif',
    marginTop: "4px",
  },
};
