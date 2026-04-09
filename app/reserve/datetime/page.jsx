"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sakuraku-calendar-v1";
const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
const SLOT_MINUTES = 30;

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
        if (index < 1 || index > slots.length - 2) {
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

function countRequiredSlots(durationText) {
  if (!durationText) return 2;
  const normalized = durationText.replace(/\s/g, "");

  const hourMatch = normalized.match(/(\d+)時間/);
  const minMatch = normalized.match(/(\d+)分/);

  let totalMinutes = 0;
  if (hourMatch) totalMinutes += Number(hourMatch[1]) * 60;
  if (minMatch) totalMinutes += Number(minMatch[1]);

  if (totalMinutes <= 0) return 2;
  return Math.ceil(totalMinutes / SLOT_MINUTES);
}

function canStartAt(calendar, dateKey, time, requiredSlots) {
  const slots = generateTimeSlots();
  const startIndex = slots.indexOf(time);
  if (startIndex === -1) return false;

  for (let i = 0; i < requiredSlots; i++) {
    const targetTime = slots[startIndex + i];
    if (!targetTime) return false;
    if (calendar?.[dateKey]?.[targetTime] !== "available") return false;
  }

  return true;
}

export default function ReserveDateTimePage() {
  const menuName = "深整コース 120分";
  const durationText = "2時間";
  const requiredSlots = countRequiredSlots(durationText);

  const [calendar, setCalendar] = useState({});
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loaded = readCalendar();
    setCalendar(loaded);

    const onFocus = () => {
      setCalendar(readCalendar());
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const handlePrevWeek = () => {
    setWeekStart((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => addDays(prev, 7));
  };

  const handleSelect = (dateKey, time) => {
    if (!canStartAt(calendar, dateKey, time, requiredSlots)) return;
    setSelected({ dateKey, time });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerCard}>
          <h1 style={styles.title}>ご希望の日時をお選びください</h1>
          <p style={styles.subText}>◎予約可能、✕予約不可</p>

          <div style={styles.infoWrap}>
            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>選択メニュー</span>
              <span style={styles.infoValue}>{menuName}</span>
            </div>
            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>所要時間</span>
              <span style={styles.infoValue}>{durationText}</span>
            </div>
          </div>

          {selected && (
            <div style={styles.selectedBox}>
              選択中：
              <strong style={{ marginLeft: 6 }}>
                {selected.dateKey} {selected.time}
              </strong>
            </div>
          )}
        </div>

        <div style={styles.weekBar}>
          <button onClick={handlePrevWeek} style={styles.weekButton}>
            ← 前の1週間
          </button>
          <div style={styles.weekCenter}>
            {weekDates[0].getMonth() + 1}月{weekDates[0].getDate()}日〜
            {weekDates[6].getMonth() + 1}月{weekDates[6].getDate()}日
          </div>
          <button onClick={handleNextWeek} style={styles.weekButton}>
            次の1週間 →
          </button>
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
                            color: isSun ? "#d96c84" : isSat ? "#6a74d8" : "#5a3a2c",
                          }}
                        >
                          {jp.month}/{jp.day}
                        </div>
                        <div
                          style={{
                            ...styles.dateBottom,
                            color: isSun ? "#d96c84" : isSat ? "#6a74d8" : "#5a3a2c",
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
                      const ok = canStartAt(calendar, dateKey, time, requiredSlots);
                      const isSelected =
                        selected?.dateKey === dateKey && selected?.time === time;

                      return (
                        <td key={`${dateKey}-${time}`} style={styles.slotCell}>
                          <button
                            onClick={() => handleSelect(dateKey, time)}
                            disabled={!ok}
                            style={{
                              ...styles.slotButton,
                              ...(ok ? styles.slotAvailable : styles.slotUnavailable),
                              ...(isSelected ? styles.slotSelected : {}),
                            }}
                          >
                            {ok ? "◎" : "✕"}
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
            ※ 表示される空き状況は仮データです。<br />
            ※ 選択したメニューの所要時間ぶん、連続して空いている枠のみ「◎」になります。
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f7f1eb 0%, #f4ece4 45%, #efe5dc 100%)",
    padding: "24px 12px 56px",
  },
  container: {
    width: "100%",
    maxWidth: "980px",
    margin: "0 auto",
  },
  headerCard: {
    background: "rgba(255,255,255,0.72)",
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
  infoWrap: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "18px",
  },
  infoBox: {
    background: "rgba(255, 248, 244, 0.95)",
    border: "1px solid rgba(170, 130, 109, 0.18)",
    borderRadius: "18px",
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  infoLabel: {
    fontSize: "0.8rem",
    color: "#9c7f72",
  },
  infoValue: {
    fontSize: "1rem",
    color: "#5a3a2c",
    fontWeight: 700,
  },
  selectedBox: {
    marginTop: "16px",
    padding: "12px 14px",
    borderRadius: "16px",
    background: "rgba(255, 243, 245, 0.95)",
    color: "#7a4552",
    fontSize: "0.95rem",
    textAlign: "center",
    border: "1px solid rgba(214, 120, 144, 0.18)",
  },
  weekBar: {
    marginTop: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    background: "rgba(255,255,255,0.68)",
    borderRadius: "20px",
    padding: "12px",
    border: "1px solid rgba(140, 104, 84, 0.12)",
  },
  weekButton: {
    border: "none",
    borderRadius: "999px",
    padding: "10px 14px",
    background: "#8b6b5c",
    color: "#fffaf6",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.92rem",
  },
  weekCenter: {
    color: "#5a3a2c",
    fontWeight: 700,
    fontSize: "0.98rem",
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
    cursor: "not-allowed",
  },
  slotSelected: {
    boxShadow: "0 0 0 3px rgba(219, 111, 135, 0.18)",
    transform: "scale(1.04)",
    background: "rgba(255, 233, 238, 1)",
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
