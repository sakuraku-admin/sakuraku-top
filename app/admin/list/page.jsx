"use client";

import { useEffect, useMemo, useState } from "react";

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

function formatJapaneseDate(date) {
  const weeks = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}（${
    weeks[date.getDay()]
  }）`;
}

function timeStringToMinutes(time) {
  if (!time) return 0;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function getCourseMinutes(course) {
  const match = course.match(/(\d+)分/);
  return match ? Number(match[1]) : 60;
}

const RESERVATIONS_STORAGE_KEY = "sakurakuReservations";

function formatReservationForAdmin(item) {
  const menuName = item?.menuName || "";
  const menuTime = item?.menuTime || "";
  const course = `${menuName}${menuTime ? ` ${menuTime}` : ""}`.trim();

  const options = Array.isArray(item?.options) && item.options.length > 0
    ? item.options.join(" / ")
    : "なし";

  return {
    id: item?.id || `${item?.date || ""}-${item?.startTime || ""}`,
    date: item?.date || "",
    time: item?.startTime || "",
    customerName: item?.customerName || item?.customer?.name || "お名前未登録",
    course: course || "コース未選択",
    options,
    totalMinutes: item?.totalMinutes || getCourseMinutes(course),
  };
}


export default function AdminListPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    try {
      const savedReservations = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      const parsedReservations = savedReservations
        ? JSON.parse(savedReservations)
        : [];

      if (Array.isArray(parsedReservations)) {
        setAllReservations(parsedReservations.map(formatReservationForAdmin));
      }
    } catch (error) {
      console.error("予約一覧データの読み込みに失敗しました", error);
      setAllReservations([]);
    }
  }, []);

  const dateKey = formatDateKey(selectedDate);

  const reservations = useMemo(() => {
    return allReservations
      .filter((item) => item.date === dateKey)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [allReservations, dateKey]);

  const timelineItems = useMemo(() => {
    const startBaseMinutes = 11 * 60;
    const endBaseMinutes = 20 * 60;
    const totalMinutes = endBaseMinutes - startBaseMinutes;

    return reservations.map((item) => {
      const startMinutes = timeStringToMinutes(item.time);
      const durationMinutes = item.totalMinutes || getCourseMinutes(item.course);
      const endMinutes = Math.min(startMinutes + durationMinutes, endBaseMinutes);

      const left = ((startMinutes - startBaseMinutes) / totalMinutes) * 100;
      const width = ((endMinutes - startMinutes) / totalMinutes) * 100;

      return {
        ...item,
        left: `${left}%`,
        width: `${width}%`,
      };
    });
  }, [reservations]);

  const timelineLabels = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => `${11 + i}`);
  }, []);

  const handlePrevDay = () => {
    setSelectedDate((prev) => addDays(prev, -1));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>予約一覧</h1>

        <div style={styles.switchWrap}>
          <button
            onClick={() => (window.location.href = "/admin")}
            style={styles.switchButton}
          >
            カレンダー管理
          </button>

          <button style={{ ...styles.switchButton, ...styles.switchButtonActive }}>
            予約一覧
          </button>
        </div>

        <section style={styles.dateCard}>
          <div style={styles.dayButtonRow}>
            <button onClick={handlePrevDay} style={styles.dayButton}>
              ← 前日
            </button>

            <button onClick={handleToday} style={styles.dayButtonCenter}>
              今日
            </button>

            <button onClick={handleNextDay} style={styles.dayButton}>
              翌日 →
            </button>
          </div>

          <div style={styles.dateText}>{formatJapaneseDate(selectedDate)}</div>
        </section>

        <section style={styles.timelineCard}>
          <div style={styles.timelineLabelRow}>
            {timelineLabels.map((label) => (
              <div key={label} style={styles.timelineHourLabel}>
                {label}
              </div>
            ))}
          </div>

          <div style={styles.timelineTrackWrap}>
            <div style={styles.timelineGrid}>
              {timelineLabels.map((label, index) => (
                <div key={`${label}-${index}`} style={styles.timelineGridCell} />
              ))}
            </div>

            <div style={styles.timelineTrack}>
              {timelineItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.timelineItem,
                    left: item.left,
                    width: item.width,
                  }}
                  title={`${item.time} ${item.customerName} 様`}
                />
              ))}
            </div>
          </div>
        </section>

        <section style={styles.listCard}>
          {reservations.length > 0 ? (
            <div style={styles.listInner}>
              {reservations.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <div style={styles.timeCol}>{item.time}</div>

                  <div style={styles.infoCol}>
                    <div style={styles.nameText}>{item.customerName} 様</div>
                    <div style={styles.courseText}>{item.course}</div>
                    <div style={styles.optionText}>{item.options}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyWrap}>
              <div style={styles.emptyText}>この日のご予約はありません</div>
            </div>
          )}
        </section>
      </div>
    </main>
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

  dateCard: {
    background: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "20px",
    padding: "12px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  dayButtonRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "10px",
    alignItems: "center",
  },

  dayButton: {
    border: "none",
    borderRadius: "999px",
    padding: "10px 8px",
    background:
      "linear-gradient(180deg, rgba(190, 141, 121, 0.96) 0%, rgba(163, 116, 97, 0.96) 100%)",
    color: "#fffaf7",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.82rem",
    whiteSpace: "nowrap",
    boxShadow: "0 8px 18px rgba(140, 106, 83, 0.18)",
  },

  dayButtonCenter: {
    border: "none",
    borderRadius: "999px",
    padding: "10px 16px",
    background: "rgba(255, 250, 247, 0.86)",
    color: "#5a6b60",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.82rem",
    whiteSpace: "nowrap",
    boxShadow: "0 6px 14px rgba(90, 110, 95, 0.10)",
  },

  dateText: {
    marginTop: "12px",
    textAlign: "center",
    color: "#5a3a2c",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.03em",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  timelineCard: {
    marginTop: "12px",
    background: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "22px",
    padding: "10px 10px 12px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  timelineLabelRow: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: 0,
    marginBottom: "-4px",
    padding: "0 2px",
  },

  timelineHourLabel: {
    textAlign: "center",
    color: "#4f4842",
    fontSize: "0.86rem",
    lineHeight: 1,
    fontWeight: 700,
    whiteSpace: "nowrap",
    transform: "translateY(6px)",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  timelineTrackWrap: {
    position: "relative",
    paddingTop: "18px",
  },

  timelineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    height: "16px",
    border: "1px solid #c8b8ad",
    borderRadius: "0",
    overflow: "hidden",
    background: "rgba(255,253,250,0.92)",
  },

  timelineGridCell: {
    borderRight: "1px solid #d7c8be",
  },

  timelineTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "18px",
    height: "16px",
  },

  timelineItem: {
    position: "absolute",
    top: 0,
    height: "16px",
    background: "rgba(159, 190, 174, 0.28)",
    border: "1px solid rgba(127, 160, 143, 0.4)",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  listCard: {
    marginTop: "12px",
    background: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "22px",
    padding: "10px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    minHeight: "420px",
  },

  listInner: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  itemCard: {
    display: "grid",
    gridTemplateColumns: "72px 1fr",
    gap: "10px",
    alignItems: "stretch",
    background: "rgba(255, 253, 250, 0.94)",
    border: "1px solid #e4dbd3",
    borderRadius: "18px",
    padding: "12px",
    boxSizing: "border-box",
  },

  timeCol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid #e8ddd5",
    color: "#6b5448",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.3,
    textAlign: "center",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  infoCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
    paddingLeft: "2px",
  },

  nameText: {
    color: "#5a3a2c",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.45,
  },

  courseText: {
    color: "#6b5e56",
    fontSize: "0.9rem",
    fontWeight: 600,
    lineHeight: 1.5,
  },

  optionText: {
    color: "#8b7c73",
    fontSize: "0.78rem",
    lineHeight: 1.6,
  },

  emptyWrap: {
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#7f756d",
    fontSize: "0.95rem",
    lineHeight: 1.8,
    textAlign: "center",
  },
};
