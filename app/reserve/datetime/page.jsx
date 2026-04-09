"use client";

import { useMemo, useState } from "react";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
const SLOT_MINUTES = 30;
const BUFFER_MINUTES = 60;

const MENU_NAME = "深整コース 120分";
const TREATMENT_MINUTES = 120;

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

function formatSelectedDate(dateKey, time) {
  const [year, month, day] = dateKey.split("-");
  return `${year}年${Number(month)}月${Number(day)}日 ${time}`;
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

function getTimeLabel(time) {
  const [, minute] = time.split(":");
  if (minute === "00") return time;
  return "30";
}

function buildMockAvailability() {
  const today = new Date();
  const data = {};

  for (let i = 0; i < 42; i++) {
    const date = addDays(today, i);
    const dateKey = formatDateKey(date);
    const day = date.getDay();

    let availableStarts = [];

    if (day === 1) {
      availableStarts = ["11:00", "12:30", "14:00", "16:00", "18:00"];
    } else if (day === 2) {
      availableStarts = ["11:30", "13:00", "15:00", "17:00"];
    } else if (day === 3) {
      availableStarts = ["12:00", "14:00", "16:30", "18:00"];
    } else if (day === 4) {
      availableStarts = ["11:00", "13:30", "15:30", "17:30"];
    } else if (day === 5) {
      availableStarts = ["11:30", "14:00", "16:00", "18:00"];
    } else if (day === 6) {
      availableStarts = ["11:00", "12:00", "14:30", "16:30"];
    } else {
      availableStarts = ["12:00", "15:00"];
    }

    data[dateKey] = availableStarts;
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

export default function ReserveDateTimePage() {
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [selected, setSelected] = useState(null);

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const mockAvailability = useMemo(() => buildMockAvailability(), []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const handlePrevWeek = () => {
    setWeekStart((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => addDays(prev, 7));
  };

  const handleSelect = (dateKey, time) => {
    const isReservable =
      isStartMarkedAvailable(dateKey, time, mockAvailability) &&
      canReserveAt(time, TREATMENT_MINUTES);

    if (!isReservable) return;

    setSelected({ dateKey, time });
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <section style={styles.headerCard}>
          <h1 style={styles.title}>ご希望の日時をお選びください</h1>
          <p style={styles.subText}>◎予約可能、✕予約不可</p>

          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>選択メニュー</span>
              <span style={styles.infoValue}>{MENU_NAME}</span>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>所要時間</span>
              <span style={styles.infoValue}>{TREATMENT_MINUTES}分</span>
            </div>
          </div>

          <p style={styles.noticeText}>
            ※予約枠は施術内容に応じた準備時間を含めてご案内しています
          </p>

          {selected && (
            <div style={styles.selectedBox}>
              選択中：
              <strong style={styles.selectedStrong}>
                {formatSelectedDate(selected.dateKey, selected.time)}
              </strong>
            </div>
          )}
        </section>

        <section style={styles.weekBar}>
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
        </section>

        <section style={styles.tableScroll}>
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
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td
                      style={{
                        ...styles.timeCell,
                        ...(time.endsWith(":00")
                          ? styles.timeCellHour
                          : styles.timeCellHalf),
                      }}
                    >
                      {getTimeLabel(time)}
                    </td>

                    {weekDates.map((date) => {
                      const dateKey = formatDateKey(date);
                      const markedAvailable = isStartMarkedAvailable(
                        dateKey,
                        time,
                        mockAvailability
                      );
                      const withinBusinessHours = canReserveAt(
                        time,
                        TREATMENT_MINUTES
                      );
                      const isReservable =
                        markedAvailable && withinBusinessHours;
                      const isSelected =
                        selected?.dateKey === dateKey && selected?.time === time;

                      const blockedEndTime = getBlockedEndTime(
                        time,
                        TREATMENT_MINUTES,
                        BUFFER_MINUTES
                      );

                      return (
                        <td key={`${dateKey}-${time}`} style={styles.slotCell}>
                          <button
                            onClick={() => handleSelect(dateKey, time)}
                            disabled={!isReservable}
                            style={{
                              ...styles.slotButton,
                              ...(isReservable
                                ? styles.slotAvailable
                                : styles.slotUnavailable),
                              ...(isSelected ? styles.slotSelected : {}),
                            }}
                            title={
                              isReservable
                                ? `施術終了 ${minutesToTimeString(
                                    timeStringToMinutes(time) +
                                      TREATMENT_MINUTES
                                  )} / 枠確保 ${blockedEndTime}まで`
                                : "予約不可"
                            }
                          >
                            {isReservable ? "◎" : "✕"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={styles.noteCard}>
          <p style={styles.noteText}>
            ※施術時間が20:00までに収まる枠のみご予約いただけます。
            <br />
            ※準備時間は一律60分で設定し、20:00以降にかかる準備時間は切り捨てています。
          </p>
        </section>

        <div style={styles.bottomButtonWrap}>
          <button
            style={{
              ...styles.nextButton,
              ...(selected ? {} : styles.nextButtonDisabled),
            }}
            disabled={!selected}
          >
            この日時で進む
          </button>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f8f2ec 0%, #f4ebe3 45%, #efe4da 100%)",
    padding: "24px 12px 56px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "980px",
    margin: "0 auto",
  },
  headerCard: {
    background: "rgba(255,255,255,0.74)",
    border: "1px solid rgba(140, 104, 84, 0.16)",
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
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "18px",
  },
  infoBox: {
    background: "rgba(255, 248, 244, 0.95)",
    border: "1px solid rgba(170, 130, 109, 0.16)",
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
    lineHeight: 1.4,
  },
  noticeText: {
    margin: "14px 0 0",
    textAlign: "center",
    color: "#8a7066",
    fontSize: "0.85rem",
    lineHeight: 1.6,
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
  selectedStrong: {
    marginLeft: "6px",
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
    background: "rgba(255,255,255,0.54)",
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
    minWidth: "84px",
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
    minWidth: "84px",
    letterSpacing: "0.02em",
  },
  timeCellHour: {
    fontSize: "0.96rem",
  },
  timeCellHalf: {
    fontSize: "0.9rem",
    color: "#8f786d",
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
    color: "#dc6f87",
    borderColor: "rgba(220, 111, 135, 0.25)",
    background: "rgba(255, 244, 247, 0.95)",
  },
  slotUnavailable: {
    color: "#b8aea8",
    borderColor: "rgba(185, 173, 166, 0.16)",
    background: "rgba(245, 240, 237, 0.96)",
    cursor: "not-allowed",
  },
  slotSelected: {
    boxShadow: "0 0 0 3px rgba(220, 111, 135, 0.18)",
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
  bottomButtonWrap: {
    marginTop: "20px",
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
};
