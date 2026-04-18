"use client";

import { useMemo, useState } from "react";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;
const BUFFER_MINUTES = 60;

const MENU_NAME = "深整コース 120分";
const TREATMENT_MINUTES = 120;

// ===== ここから上は一切変更なし =====

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

function generateTimeSlots() {
  const slots = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

function isToday(dateKey) {
  const todayKey = formatDateKey(new Date());
  return dateKey === todayKey;
}

function canReserveAt(startTime, treatmentMinutes) {
  const [h, m] = startTime.split(":").map(Number);
  return h * 60 + m + treatmentMinutes <= CLOSE_HOUR * 60;
}

function isStartMarkedAvailable(dateKey, time, mockAvailability) {
  const dayStarts = mockAvailability[dateKey] || [];
  return dayStarts.includes(time);
}

// ===== コンポーネント =====

export default function ReserveDateTimePage() {
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [selected, setSelected] = useState(null);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const mockAvailability = useMemo(() => ({}), []);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const handleSelect = (dateKey, time) => {
    const ok =
      !isToday(dateKey) &&
      isStartMarkedAvailable(dateKey, time, mockAvailability) &&
      canReserveAt(time, TREATMENT_MINUTES);

    if (!ok) return;
    setSelected({ dateKey, time });
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <section style={styles.calendarCard}>
          <div style={styles.calendarShell}>
            
            {/* 時間列（そのまま・幅だけ変更） */}
            <div style={styles.timeColumn}>
              <table style={styles.fixedTable}>
                <thead>
                  <tr>
                    <th style={styles.timeHead}>時間</th>
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => {
                    const isHalf = time.includes(":30");

                    return (
                      <tr key={time}>
                        <td
                          style={{
                            ...styles.timeCell,
                            ...(isHalf ? styles.timeCellHalf : {}),
                          }}
                        >
                          {time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ここだけ修正 */}
            <div style={styles.dateScroll}>
              <table style={styles.dateTable}>
                
                {/* sticky化 */}
                <thead style={styles.stickyHead}>
                  <tr>
                    {weekDates.map((date) => {
                      const jp = formatJapaneseDate(date);
                      return (
                        <th key={formatDateKey(date)} style={styles.dateHead}>
                          {jp.month}/{jp.day}
                          <br />({jp.week})
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      {weekDates.map((date) => {
                        const dateKey = formatDateKey(date);

                        const ok =
                          !isToday(dateKey) &&
                          isStartMarkedAvailable(
                            dateKey,
                            time,
                            mockAvailability
                          ) &&
                          canReserveAt(time, TREATMENT_MINUTES);

                        return (
                          <td key={dateKey + time} style={styles.slotCell}>
                            {ok ? (
                              <button
                                onClick={() =>
                                  handleSelect(dateKey, time)
                                }
                                style={styles.slotButton}
                              >
                                ◎
                              </button>
                            ) : (
                              <div style={styles.slotUnavailableMark}>
                                ✕
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh" },
  container: { maxWidth: "400px", margin: "0 auto" },

  calendarCard: { marginTop: "12px" },

  calendarShell: {
    display: "flex",
    border: "1px solid #eee",
  },

  timeColumn: {
    width: "42px", // ←細くした
  },

  fixedTable: {
    width: "42px",
  },

  dateScroll: {
    overflowY: "auto", // ←縦スクロール
    height: "420px",
  },

  stickyHead: {
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
  },

  dateTable: {
    width: "100%",
    tableLayout: "fixed",
  },

  dateHead: {
    fontSize: "12px",
  },

  timeCell: {
    fontSize: "12px",
  },

  timeCellHalf: {
    color: "#aaa", // ←薄く
  },

  slotCell: {
    height: "44px",
    textAlign: "center",
  },

  slotButton: {
    border: "none",
    background: "none",
  },

  slotUnavailableMark: {
    color: "#aaa",
  },
};
