"use client";

import { useMemo, useState } from "react";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
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

function formatRangeLabel(startDate, endDate) {
  return `${startDate.getMonth() + 1}/${startDate.getDate()} ～ ${
    endDate.getMonth() + 1
  }/${endDate.getDate()}`;
}

function formatSelectedDateShort(dateKey, time) {
  if (!dateKey || !time) return "未選択";
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}/${Number(day)} ${time}～`;
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

function isToday(dateKey) {
  const todayKey = formatDateKey(new Date());
  return dateKey === todayKey;
}

export default function ReserveDateTimePage() {
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [selected, setSelected] = useState(null);

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const mockAvailability = useMemo(() => buildMockAvailability(), []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const handleSelect = (dateKey, time) => {
    const isReservable =
      !isToday(dateKey) &&
      isStartMarkedAvailable(dateKey, time, mockAvailability) &&
      canReserveAt(time, TREATMENT_MINUTES);

    if (!isReservable) return;

    setSelected({ dateKey, time });
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>ご希望の日時をお選びください</h1>

        <div style={styles.calendarWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.timeHead}></th>
                {weekDates.map((date) => {
                  const jp = formatJapaneseDate(date);
                  const isSat = date.getDay() === 6;
                  const isSun = date.getDay() === 0;

                  return (
                    <th key={formatDateKey(date)} style={styles.dateHead}>
                      <div
                        style={{
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
                          fontSize: "0.7rem",
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
                  <tr key={time}>
                    <td
                      style={{
                        ...styles.timeCell,
                        ...(isHalf ? styles.timeHalf : {}),
                      }}
                    >
                      {time}
                    </td>

                    {weekDates.map((date) => {
                      const dateKey = formatDateKey(date);

                      const isReservable =
                        !isToday(dateKey) &&
                        isStartMarkedAvailable(
                          dateKey,
                          time,
                          mockAvailability
                        ) &&
                        canReserveAt(time, TREATMENT_MINUTES);

                      const isSelected =
                        selected?.dateKey === dateKey &&
                        selected?.time === time;

                      return (
                        <td key={dateKey + time} style={styles.cell}>
                          {isReservable ? (
                            <button
                              onClick={() => handleSelect(dateKey, time)}
                              style={{
                                ...styles.button,
                                ...(isSelected
                                  ? styles.selected
                                  : styles.available),
                              }}
                            >
                              {isSelected ? "●" : "◎"}
                            </button>
                          ) : (
                            <span style={styles.unavailable}>✕</span>
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
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokume.png')",
    backgroundSize: "cover",
    padding: "20px",
  },

  container: {
    maxWidth: "400px",
    margin: "0 auto",
  },

  title: {
    textAlign: "center",
    marginBottom: "12px",
    color: "#5a3a2c",
  },

  calendarWrapper: {
    maxHeight: "65vh",
    overflowY: "auto",
    background: "#fffdfa",
    borderRadius: "16px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  thead: {
    position: "sticky",
    top: 0,
    background: "#fffdfa",
    zIndex: 10,
  },

  timeHead: {
    width: "42px",
  },

  dateHead: {
    fontSize: "0.8rem",
    padding: "6px 2px",
  },

  timeCell: {
    fontSize: "0.75rem",
    textAlign: "center",
    color: "#5a3a2c",
  },

  timeHalf: {
    color: "#9a8578",
  },

  cell: {
    textAlign: "center",
    height: "44px",
  },

  button: {
    border: "none",
    background: "none",
    fontSize: "1.2rem",
  },

  available: {
    color: "#e2a3b4",
  },

  selected: {
    color: "#df7e98",
  },

  unavailable: {
    color: "#aaa",
  },
};
