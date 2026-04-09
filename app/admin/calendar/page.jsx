"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sakuraku-calendar-v1";
const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatJapaneseDate(date) {
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: week[date.getDay()],
  };
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function generateTimeSlots() {
  const slots = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  slots.push(`${String(CLOSE_HOUR).padStart(2, "0")}:00`);
  return slots;
}

function generateInitialCalendar() {
  const calendar = {};
  const today = new Date();

  for (let i = 0; i < 60; i++) {
    const date = addDays(today, i);
    const dateKey = formatDateKey(date);
    calendar[dateKey] = {};

    const day = date.getDay();
    const isClosedLike = day === 0;
    const slots = generateTimeSlots();

    slots.forEach((time, index) => {
      let status = "available";

      if (isClosedLike) {
        status = "unavailable";
      } else {
        if (index < 2 || index > slots.length - 3) {
          status = Math.random() > 0.5 ? "unavailable" : "available";
        } else {
          status = Math.random() > 0.18 ? "available" : "unavailable";
        }
      }

      calendar[dateKey][time] = status;
    });
  }

  return calendar;
}

function readCalendar() {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  const initial = generateInitialCalendar();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveCalendar(calendar) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calendar));
}

export default function AdminCalendarPage() {
  const [calendar, setCalendar] = useState({});
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));

  useEffect(() => {
    setCalendar(readCalendar());
  }, []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const toggleSlot = (dateKey, time) => {
    const next = JSON.parse(JSON.stringify(calendar));

    if (!next[dateKey]) next[dateKey] = {};
    next[dateKey][time] =
      next[dateKey][time] === "available" ? "unavailable" : "available";

    setCalendar(next);
    saveCalendar(next);
  };

  const setWholeDay = (dateKey, value) => {
    const next = JSON.parse(JSON.stringify(calendar));
    if (!next[dateKey]) next[dateKey] = {};

    timeSlots.forEach((time) => {
      next[dateKey][time] = value;
    });

    setCalendar(next);
    saveCalendar(next);
  };

  const resetMockData = () => {
    const fresh = generateInitialCalendar();
    setCalendar(fresh);
    saveCalendar(fresh);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerCard}>
          <h1 style={styles.title}>予約枠 管理ページ</h1>
          <p style={styles.subText}>
            ◎/✕ をタップすると、その場で予約枠を開閉できます
          </p>

          <div style={styles.topButtons}>
            <button
              onClick={() => setWeekStart((prev) => addDays(prev, -7))}
              style={styles.actionButton}
            >
              ← 前の1週間
            </button>

            <div style={styles.weekLabel}>
              {weekDates[0].getMonth() + 1}月{weekDates[0].getDate()}日〜
              {weekDates[6].getMonth() + 1}月{weekDates[6].getDate()}日
            </div>

            <button
              onClick={() => setWeekStart((prev) => addDays(prev, 7))}
              style={styles.actionButton}
            >
              次の1週間 →
            </button>
          </div>

          <div style={styles.resetWrap}>
            <button onClick={resetMockData} style={styles.resetButton}>
              仮データを初期状態に戻す
            </button>
          </div>
        </div>

        <div style={styles.dayActionWrap}>
          {weekDates.map((date) => {
            const dateKey = formatDateKey(date);
            const jp = formatJapaneseDate(date);

            return (
              <div key={dateKey} style={styles.dayActionCard}>
                <div style={styles.dayActionTitle}>
                  {jp.month}/{jp.day}（{jp.week}）
                </div>
                <div style={styles.dayActionButtons}>
                  <button
                    onClick={() => setWholeDay(dateKey, "available")}
                    style={styles.smallOpenButton}
                  >
                    1日◎
                  </button>
                  <button
                    onClick={() => setWholeDay(dateKey, "unavailable")}
                    style={styles.smallCloseButton}
                  >
                    1日✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={styles.tableScroll}>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
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
                              ? "#d96c84"
                              : isSat
                              ? "#6a74d8"
                              : "#5a3a2c",
                          }}
                        >
                          {jp.month}/{jp.day}
                        </div>
                        <div
                          style={{
                            ...styles.dateBottom,
                            color: isSun
                              ? "#d96c84"
                              : isSat
                              ? "#6a74d8"
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
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td style={styles.timeCell}>{time}</td>
                    {weekDates.map((date) => {
                      const dateKey = formatDateKey(date);
                      const isAvailable =
                        calendar?.[dateKey]?.[time] === "available";

                      return (
                        <td key={`${dateKey}-${time}`} style={styles.slotCell}>
                          <button
                            onClick={() => toggleSlot(dateKey, time)}
                            style={{
                              ...styles.slotButton,
                              ...(isAvailable
                                ? styles.slotAvailable
                                : styles.slotUnavailable),
                            }}
                          >
                            {isAvailable ? "◎" : "✕"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.noteCard}>
          <p style={styles.noteText}>
            ※ 今は仮データ＋localStorage連動です。<br />
            ※ 後で🔥Firebaseにつなげれば、実際の予約データと連動できます。
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f6efe8 0%, #f1e7de 45%, #eaded4 100%)",
    padding: "24px 12px 56px",
  },
  container: {
    width: "100%",
    maxWidth: "980px",
    margin: "0 auto",
  },
  headerCard: {
    background: "rgba(255,255,255,0.76)",
    border: "1px solid rgba(140, 104, 84, 0.18)",
    borderRadius: "24px",
    padding: "22px 16px 18px",
    boxShadow: "0 8px 24px rgba(90, 58, 44, 0.08)",
    backdropFilter: "blur(10px)",
  },
  title: {
    margin: 0,
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#5a3a2c",
    textAlign: "center",
    letterSpacing: "0.04em",
  },
  subText: {
    margin: "10px 0 0",
    textAlign: "center",
    color: "#7b6257",
    fontSize: "0.96rem",
  },
  topButtons: {
    marginTop: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
  },
  actionButton: {
    border: "none",
    borderRadius: "999px",
    padding: "10px 14px",
    background: "#8b6b5c",
    color: "#fffaf6",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.92rem",
  },
  weekLabel: {
    color: "#5a3a2c",
    fontWeight: 700,
    fontSize: "0.98rem",
  },
  resetWrap: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "center",
  },
  resetButton: {
    border: "none",
    borderRadius: "999px",
    padding: "11px 16px",
    background: "#d9a397",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  dayActionWrap: {
    marginTop: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
  },
  dayActionCard: {
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(140, 104, 84, 0.12)",
    borderRadius: "18px",
    padding: "10px",
  },
  dayActionTitle: {
    fontSize: "0.9rem",
    color: "#5a3a2c",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "8px",
  },
  dayActionButtons: {
    display: "flex",
    gap: "8px",
  },
  smallOpenButton: {
    flex: 1,
    border: "none",
    borderRadius: "999px",
    padding: "8px 0",
    background: "rgba(219, 111, 135, 0.92)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  smallCloseButton: {
    flex: 1,
    border: "none",
    borderRadius: "999px",
    padding: "8px 0",
    background: "#b8aea8",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  tableScroll: {
    marginTop: "16px",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    background: "rgba(255,255,255,0.52)",
    borderRadius: "24px",
    padding: "10px",
    border: "1px solid rgba(140, 104, 84, 0.1)",
  },
  tableWrap: {
    minWidth: "760px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    overflow: "hidden",
    borderRadius: "18px",
    background: "#fffdfa",
  },
  timeHead: {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "#f4ece5",
    color: "#5a3a2c",
    fontWeight: 700,
    minWidth: "92px",
    borderBottom: "1px solid #e6d8cf",
    padding: "12px 8px",
    textAlign: "center",
  },
  dateHead: {
    background: "#fdf7f2",
    borderBottom: "1px solid #e6d8cf",
    padding: "10px 6px",
    minWidth: "92px",
    textAlign: "center",
  },
  dateTop: {
    fontSize: "0.96rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  dateBottom: {
    marginTop: "4px",
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  timeCell: {
    position: "sticky",
    left: 0,
    zIndex: 2,
    background: "#faf5f0",
    color: "#5a3a2c",
    fontWeight: 700,
    textAlign: "center",
    borderBottom: "1px solid #eee2d9",
    padding: "12px 6px",
    minWidth: "92px",
  },
  slotCell: {
    borderBottom: "1px solid #eee2d9",
    borderLeft: "1px solid #f2e8e1",
    textAlign: "center",
    padding: "8px 4px",
    background: "#fffdfa",
  },
  slotButton: {
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    fontSize: "1.15rem",
    fontWeight: 700,
    border: "2px solid transparent",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  slotAvailable: {
    color: "#db6f87",
    borderColor: "rgba(219, 111, 135, 0.26)",
    background: "rgba(255, 245, 247, 0.9)",
  },
  slotUnavailable: {
    color: "#b9ada6",
    borderColor: "rgba(185, 173, 166, 0.18)",
    background: "rgba(245, 240, 237, 0.95)",
  },
  noteCard: {
    marginTop: "16px",
    background: "rgba(255,255,255,0.72)",
    borderRadius: "18px",
    padding: "14px 16px",
    border: "1px solid rgba(140, 104, 84, 0.1)",
  },
  noteText: {
    margin: 0,
    color: "#7b6257",
    lineHeight: 1.7,
    fontSize: "0.9rem",
  },
};
