"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const AVAILABILITY_STORAGE_KEY = "sakurakuAvailability";
const USER_STORAGE_KEY = "sakurakuUser";
const CURRENT_RESERVATION_STORAGE_KEY = "sakurakuCurrentReservation";
const RESERVATIONS_STORAGE_KEY = "sakurakuReservations";

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

function ReserveConfirmContent() {
  const searchParams = useSearchParams();

  const [customerName, setCustomerName] = useState("");
  const [userData, setUserData] = useState(null);

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

  const menuName = searchParams.get("courseName") || "整体コース";
  const menuTime = `${searchParams.get("duration") || "60"}分`;

  const selectedOptionsParam = searchParams.get("selectedOptions") || "";
  const options = selectedOptionsParam
    ? selectedOptionsParam.split("、").filter(Boolean)
    : [];

  const totalTime = `${
    searchParams.get("totalMinutes") || searchParams.get("duration") || "60"
  }分`;

  const reserveDate = formatJapaneseDate(searchParams.get("date"));

  const startTime = searchParams.get("time") || "";
  const totalMinutes =
    Number.parseInt(
      searchParams.get("totalMinutes") || searchParams.get("duration") || "60",
      10
    ) || 60;

  const endTime = startTime
    ? minutesToTimeString(timeStringToMinutes(startTime) + totalMinutes)
    : "";

  const reserveTime =
    startTime && endTime ? `${startTime}〜${endTime}` : "未選択";

  const handleReserve = () => {
    const rawDate = searchParams.get("date") || "";

    const reservationData = {
      id: `${rawDate}-${startTime}-${Date.now()}`,
      customerName,
      customer: userData,
      menuName,
      menuTime,
      options,
      totalTime,
      reserveDate,
      reserveTime,
      date: rawDate,
      startTime,
      endTime,
      totalMinutes,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      CURRENT_RESERVATION_STORAGE_KEY,
      JSON.stringify(reservationData)
    );

    const reservations = readJsonArrayFromStorage(RESERVATIONS_STORAGE_KEY);
    localStorage.setItem(
      RESERVATIONS_STORAGE_KEY,
      JSON.stringify([...reservations, reservationData])
    );

    try {
      const savedAvailability = localStorage.getItem(AVAILABILITY_STORAGE_KEY);

      if (savedAvailability) {
        const parsedAvailability = JSON.parse(savedAvailability);

        if (
          parsedAvailability &&
          typeof parsedAvailability === "object" &&
          rawDate &&
          startTime
        ) {
          const currentDay = Array.isArray(parsedAvailability[rawDate])
            ? parsedAvailability[rawDate]
            : [];

          const nextAvailability = {
            ...parsedAvailability,
            [rawDate]: currentDay.filter((slot) => slot !== startTime),
          };

          localStorage.setItem(
            AVAILABILITY_STORAGE_KEY,
            JSON.stringify(nextAvailability)
          );
        }
      }
    } catch (error) {
      console.error("予約枠データの更新に失敗しました", error);
    }

    window.location.href = "/reserve/thanks";
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.titleText}>ご予約内容の確認</div>

        <div style={styles.nameText}>{customerName} 様</div>

        <section style={styles.mainCard}>
          <div style={styles.courseRow}>
            <div style={styles.courseName}>
              {menuName}　{menuTime}
            </div>
            <div style={styles.totalTime}>所要時間：{totalTime}</div>
          </div>

          <div style={styles.divider} />

          <div style={styles.optionSection}>
            <div style={styles.optionLabel}>オプション</div>
            <div style={styles.optionList}>
              {options.length > 0 ? (
                options.map((option) => (
                  <span key={option} style={styles.optionItem}>
                    {option}
                  </span>
                ))
              ) : (
                <span style={styles.optionItem}>なし</span>
              )}
            </div>
          </div>

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
          style={styles.reserveButton}
          onClick={handleReserve}
        >
          この内容で予約する
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

  attentionArea: {
    padding: "2px 4px 0",
    color: "#90796f",
    fontSize: "0.74rem",
    lineHeight: 1.8,
    letterSpacing: "0.01em",
  },
};
