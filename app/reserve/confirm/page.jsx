"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

const AVAILABILITY_STORAGE_KEY = "sakurakuAvailability";
const USER_STORAGE_KEY = "sakurakuUser";
const CURRENT_RESERVATION_STORAGE_KEY = "sakurakuCurrentReservation";
const RESERVATIONS_STORAGE_KEY = "sakurakuReservations";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
const BUFFER_MINUTES = 60;

function formatJapaneseDate(dateKey) {
  if (!dateKey) return "未選択";

  const date = new Date(dateKey);
  if (Number.isNaN(date.getTime())) return dateKey;

  const weeks = ["日", "月", "火", "水", "木", "金", "土"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = weeks[date.getDay()];

  return `${year}/${month}/${day}(${week})`;
}

function timeStringToMinutes(time) {
  if (!time) return 0;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTimeString(totalMinutes) {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function generateTimeSlots() {
  const slots = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildInitialAvailability() {
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

function cleanCourseName(name) {
  return String(name || "")
    .replace(/[　 ]*\d+分/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isDeepCourseName(name) {
  return String(name || "").includes("深整");
}

function priceTextFromParam(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.includes("円")) return raw;

  const numberText = raw.replace(/[^0-9]/g, "");
  if (!numberText) return raw;

  return `${Number(numberText).toLocaleString()}円`;
}

function priceNumberFromParam(value) {
  const numberText = String(value || "").replace(/[^0-9]/g, "");
  return numberText ? Number(numberText) : 0;
}

function getTotalPriceText(coursePriceRaw, optionPriceRaw) {
  const total =
    priceNumberFromParam(coursePriceRaw) + priceNumberFromParam(optionPriceRaw);

  return total > 0 ? `${total.toLocaleString()}円` : "";
}

function getDisplayOptionName(option) {
  return String(option || "")
    .replace(/[　 ]*\d+分/g, "")
    .replace(/[　 ]*\d{1,3}(,\d{3})*円/g, "")
    .trim();
}

function getDisplayOptions(options) {
  return options.map(getDisplayOptionName).filter(Boolean);
}

function getFirestoreSafeValue(value) {
  return value === undefined ? "" : value;
}

function getBlockedEndMinutes(startTime, treatmentMinutes) {
  const startMinutes = timeStringToMinutes(startTime);
  const closeMinutes = CLOSE_HOUR * 60;
  const blockedEndMinutes = startMinutes + treatmentMinutes + BUFFER_MINUTES;

  return Math.min(blockedEndMinutes, closeMinutes);
}

function getBlockedSlots(startTime, treatmentMinutes) {
  const startMinutes = timeStringToMinutes(startTime);
  const blockedEndMinutes = getBlockedEndMinutes(startTime, treatmentMinutes);

  return generateTimeSlots().filter((slot) => {
    const slotMinutes = timeStringToMinutes(slot);
    return slotMinutes >= startMinutes && slotMinutes < blockedEndMinutes;
  });
}

function ReserveConfirmContent() {
  const searchParams = useSearchParams();

  const [customerName, setCustomerName] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);

      // 👇 未ログインなら弾く
      if (!savedUser) {
        window.location.href = "/register";
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (!parsedUser?.isLoggedIn) {
        window.location.href = "/register";
        return;
      }

      setUserData(parsedUser);

      if (parsedUser?.name) {
        setCustomerName(parsedUser.name);
      }
    } catch (error) {
      console.error("お客様情報の読み込みに失敗しました", error);
      window.location.href = "/register";
    }
  }, []);

  const rawMenuName = searchParams.get("courseName") || "整体コース";
  const menuName = cleanCourseName(rawMenuName) || "整体コース";
  const isDeepCourse = isDeepCourseName(menuName);

  const courseMinutes =
    Number.parseInt(searchParams.get("duration") || "60", 10) || 60;
  const menuTime = `${courseMinutes}分`;

  const optionMinutes =
    Number.parseInt(searchParams.get("optionMinutes") || "0", 10) || 0;
  const optionTime = optionMinutes > 0 ? `${optionMinutes}分` : "";

  const selectedOptionsParam = searchParams.get("selectedOptions") || "";
  const options = selectedOptionsParam
    ? selectedOptionsParam.split("、").filter(Boolean)
    : [];

  const hasOptions = options.length > 0;
  const displayOptions = getDisplayOptions(options);

  const coursePriceRaw = searchParams.get("price") || "";
  const optionPriceRaw = searchParams.get("optionPrice") || "";
  const coursePrice = priceTextFromParam(coursePriceRaw);
  const optionPrice = priceTextFromParam(optionPriceRaw);
  const totalPrice = getTotalPriceText(coursePriceRaw, optionPriceRaw);

  const totalMinutes =
    Number.parseInt(
      searchParams.get("totalMinutes") || String(courseMinutes + optionMinutes),
      10
    ) || courseMinutes + optionMinutes;

  const totalTime = `${totalMinutes}分`;

  const reserveDate = formatJapaneseDate(searchParams.get("date"));

  const startTime = searchParams.get("time") || "";

  const endTime = startTime
    ? minutesToTimeString(timeStringToMinutes(startTime) + totalMinutes)
    : "";

  const reserveTime =
    startTime && endTime ? `${startTime}〜${endTime}` : "未選択";

  const buildDatetimeReturnUrl = () => {
    const params = new URLSearchParams();
    const keys = [
      "courseId",
      "duration",
      "optionMinutes",
      "selectedOptions",
      "optionPrice",
      "price",
      "type",
    ];

    params.set("courseName", menuName);

    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params.set(key, value);
    });

    return `/reserve/datetime?${params.toString()}`;
  };

  const handleReserve = async () => {
    if (isSubmitting) return;

    const rawDate = searchParams.get("date") || "";

    if (!rawDate || !startTime) {
      alert("ご予約日時が正しく選択されていません。もう一度日時をお選びください。");
      window.location.href = buildDatetimeReturnUrl();
      return;
    }

    setIsSubmitting(true);

    try {
      const reservations = readJsonArrayFromStorage(RESERVATIONS_STORAGE_KEY);

      const savedAvailability = localStorage.getItem(AVAILABILITY_STORAGE_KEY);

      const parsedAvailability = savedAvailability
        ? JSON.parse(savedAvailability)
        : buildInitialAvailability();

      if (!parsedAvailability || typeof parsedAvailability !== "object") {
        alert("予約枠データの確認に失敗しました。もう一度日時をお選びください。");
        window.location.href = buildDatetimeReturnUrl();
        return;
      }

      const localCurrentDay = Array.isArray(parsedAvailability[rawDate])
        ? parsedAvailability[rawDate]
        : generateTimeSlots();

      const blockedSlots = getBlockedSlots(startTime, totalMinutes);

      const reservationRef = doc(collection(db, "reservations"));
      const availabilityRef = doc(db, "availability", rawDate);

      const reservationDataForStorage = {
        id: reservationRef.id,
        customerName,
        customerId: userData?.userId || null,
        customer: userData,
        menuName,
        menuTime,
        courseMinutes,
        coursePrice: getFirestoreSafeValue(coursePrice),
        price: getFirestoreSafeValue(coursePrice),
        options,
        optionMinutes,
        optionTime,
        optionPrice: getFirestoreSafeValue(optionPrice),
        totalTime,
        totalPrice: getFirestoreSafeValue(totalPrice),
        reserveDate,
        reserveTime,
        date: rawDate,
        startTime,
        endTime,
        totalMinutes,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      const nextDay = await runTransaction(db, async (transaction) => {
        const availabilitySnap = await transaction.get(availabilityRef);

        const firestoreDay =
          availabilitySnap.exists() &&
          Array.isArray(availabilitySnap.data()?.slots)
            ? availabilitySnap.data().slots
            : localCurrentDay;

        const isEveryBlockedSlotAvailable = blockedSlots.every((slot) =>
          firestoreDay.includes(slot)
        );

        if (!isEveryBlockedSlotAvailable) {
          throw new Error("SLOT_ALREADY_BOOKED");
        }

        const updatedSlots = firestoreDay.filter(
          (slot) => !blockedSlots.includes(slot)
        );

        transaction.set(availabilityRef, {
          date: rawDate,
          slots: updatedSlots,
          updatedAt: serverTimestamp(),
        });

        transaction.set(reservationRef, {
          ...reservationDataForStorage,
          createdAt: serverTimestamp(),
          createdAtLocal: reservationDataForStorage.createdAt,
        });

        return updatedSlots;
      });

      localStorage.setItem(
        CURRENT_RESERVATION_STORAGE_KEY,
        JSON.stringify(reservationDataForStorage)
      );

      localStorage.setItem(
        RESERVATIONS_STORAGE_KEY,
        JSON.stringify([...reservations, reservationDataForStorage])
      );

      const nextAvailability = {
        ...parsedAvailability,
        [rawDate]: nextDay,
      };

      localStorage.setItem(
        AVAILABILITY_STORAGE_KEY,
        JSON.stringify(nextAvailability)
      );

      window.location.href = "/reserve/thanks";
    } catch (error) {
      console.error("予約確定処理に失敗しました", error);

      if (error?.message === "SLOT_ALREADY_BOOKED") {
        alert(
          "申し訳ありません。この時間はすでに埋まりました。日時を選び直してください。"
        );
        window.location.href = buildDatetimeReturnUrl();
        return;
      }

      alert("予約確定処理に失敗しました。もう一度お試しください。");
      setIsSubmitting(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.titleText}>ご予約内容の確認</div>

        <div style={styles.nameText}>{customerName} 様</div>

        <section style={styles.mainCard}>
          <div style={styles.courseRow}>
            <div style={styles.courseName}>{menuName}</div>
            <div style={styles.totalTime}>所要時間：{menuTime}</div>
            {coursePrice && (
              <div style={styles.priceText}>金額：{coursePrice}</div>
            )}
          </div>

          {!isDeepCourse && (
            <>
              <div style={styles.divider} />

              <div style={styles.optionSection}>
                <div style={styles.optionLabel}>オプション</div>
                <div style={styles.optionList}>
                  {hasOptions ? (
                    displayOptions.map((option) => (
                      <span key={option} style={styles.optionItem}>
                        {option}
                      </span>
                    ))
                  ) : (
                    <span style={styles.optionItem}>なし</span>
                  )}
                </div>

                {hasOptions && optionMinutes > 0 && (
                  <div style={styles.optionTime}>所要時間：{optionTime}</div>
                )}

                {hasOptions && optionPrice && (
                  <div style={styles.optionPrice}>金額：{optionPrice}</div>
                )}
              </div>

              {hasOptions && (
                <>
                  <div style={styles.dividerBelowOption} />
                  <div style={styles.totalSummary}>
                    <div>合計所要時間：{totalTime}</div>
                    {totalPrice && <div>合計金額：{totalPrice}</div>}
                  </div>
                </>
              )}
            </>
          )}

          <div style={styles.dividerBelowOption} />

          <div style={styles.dateSection}>
            <div style={styles.dateLabel}>ご予約日時</div>
            <div style={styles.dateValue}>
              {reserveDate}　{reserveTime}
            </div>
          </div>
        </section>

        <button
          type="button"
          style={{
            ...styles.reserveButton,
            ...(isSubmitting ? styles.reserveButtonDisabled : {}),
          }}
          onClick={handleReserve}
          disabled={isSubmitting}
        >
          {isSubmitting ? "予約中..." : "この内容で予約する"}
        </button>

        <div style={styles.attentionArea}>
          <div>※ご予約当日のご変更・キャンセル等はLINEにて承ります。</div>
          <div>
            ※当サロンは完全入れ替え制になりますので、なるべくご予約時間ちょうどを目安にお越しいただけますと幸いです。
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ReserveConfirmPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <ReserveConfirmContent />
    </Suspense>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokume.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    padding: "22px 16px 34px",
    boxSizing: "border-box",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  titleText: {
    textAlign: "center",
    color: "#6f5046",
    fontSize: "1.42rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    lineHeight: 1.5,
    marginTop: "2px",
    marginBottom: "2px",
  },

  nameText: {
    color: "#6e5750",
    fontSize: "0.96rem",
    fontWeight: 400,
    letterSpacing: "0.08em",
    lineHeight: 1.5,
    paddingLeft: "14px",
    marginTop: "0",
    marginBottom: "2px",
    textAlign: "left",
  },

  mainCard: {
    position: "relative",
    background: "rgba(247, 242, 237, 0.9)",
    borderRadius: "26px",
    padding: "20px 18px 30px",
    boxSizing: "border-box",
    boxShadow: "0 10px 24px rgba(135, 102, 90, 0.08)",
    border: "1px solid rgba(255,255,255,0.42)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    overflow: "hidden",
  },

  courseRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },

  courseName: {
    color: "#5c3d31",
    fontSize: "1.62rem",
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "0.05em",
    textAlign: "center",
  },

  totalTime: {
    color: "#81685b",
    fontSize: "0.98rem",
    lineHeight: 1.5,
    textAlign: "center",
  },

  priceText: {
    color: "#6f5046",
    fontSize: "0.98rem",
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: "center",
    letterSpacing: "0.03em",
  },

  divider: {
    height: "1px",
    background: "rgba(211, 182, 168, 0.72)",
    margin: "14px 0 10px",
  },

  optionSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "4px 2px 2px",
    textAlign: "center",
  },

  optionLabel: {
    color: "#7b584b",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
  },

  optionList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "12px",
    rowGap: "4px",
    maxWidth: "100%",
    color: "#735244",
    fontSize: "0.82rem",
    lineHeight: 1.65,
    letterSpacing: "0.01em",
  },

  optionItem: {
    whiteSpace: "nowrap",
  },

  optionTime: {
    color: "#81685b",
    fontSize: "0.9rem",
    lineHeight: 1.5,
    textAlign: "center",
    marginTop: "2px",
  },

  optionPrice: {
    color: "#6f5046",
    fontSize: "0.9rem",
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: "center",
    marginTop: "2px",
  },

  totalSummary: {
    color: "#6f5046",
    fontSize: "0.96rem",
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: "center",
    letterSpacing: "0.03em",
    margin: "-4px 0 10px",
  },

  dividerBelowOption: {
    height: "1px",
    background: "rgba(211, 182, 168, 0.72)",
    margin: "10px 0 18px",
  },

  dateSection: {
    width: "82%",
    margin: "0 auto",
    background: "rgba(239, 205, 216, 0.76)",
    borderRadius: "20px",
    padding: "12px 16px 13px",
    textAlign: "center",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.62), 0 4px 12px rgba(225, 176, 192, 0.08)",
  },

  dateLabel: {
    color: "#8a6671",
    fontSize: "0.9rem",
    marginBottom: "6px",
    letterSpacing: "0.04em",
  },

  dateValue: {
    color: "#674033",
    fontSize: "1.06rem",
    fontWeight: 700,
    lineHeight: 1.55,
    letterSpacing: "0.01em",
    whiteSpace: "normal",
    wordBreak: "keep-all",
  },

  reserveButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #ee9b8a 0%, #e68676 100%)",
    color: "#fffdfb",
    fontSize: "1.18rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    padding: "16px 16px",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(228, 138, 122, 0.18)",
  },

  reserveButtonDisabled: {
    opacity: 0.68,
    cursor: "not-allowed",
  },

  attentionArea: {
    padding: "2px 4px 0",
    color: "#90796f",
    fontSize: "0.74rem",
    lineHeight: 1.8,
    letterSpacing: "0.01em",
  },
};
