"use client";

import { useMemo, useRef, useState } from "react";

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

function getTimeLabelParts(time) {
  const [hour, minute] = time.split(":");

  if (minute === "00") {
    return {
      hour,
      minute: "00",
      isHalf: false,
    };
  }

  return {
    hour: "",
    minute: "30",
    isHalf: true,
  };
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

  const scrollDatesRef = useRef(null);

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

  const currentRangeLabel = formatRangeLabel(weekDates[0], weekDates[6]);
  const selectedLabel = formatSelectedDateShort(
    selected?.dateKey,
    selected?.time
  );

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>ご希望の日時をお選びください</h1>

        <section style={styles.infoCard}>
          <div style={styles.infoMiniBox}>
            <span style={styles.infoLabel}>選択メニュー</span>
            <span style={styles.infoValue}>{MENU_NAME}</span>
          </div>

          <div style={styles.infoMiniBox}>
            <span style={styles.infoLabel}>所要時間</span>
            <span style={styles.infoValue}>{TREATMENT_MINUTES}分</span>
          </div>
        </section>

        <section style={styles.calendarInfoCard}>
          <div style={styles.rangeText}>{currentRangeLabel}</div>

          <div style={styles.weekButtonRow}>
            <button onClick={handlePrevWeek} style={styles.weekButton}>
              ← 前の週
            </button>

            <button onClick={handleNextWeek} style={styles.weekButton}>
              次の週 →
            </button>
          </div>

          <div style={styles.selectedBox}>
            選択中：<strong style={styles.selectedStrong}>{selectedLabel}</strong>
          </div>
        </section>

        <section style={styles.calendarCard}>
          <div style={styles.calendarShell}>
            <div style={styles.timeColumn}>
              <table style={styles.fixedTable}>
                <thead>
                  <tr>
                    <th style={styles.timeHead}>時間</th>
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => {
                    const label = getTimeLabelParts(time);

                    return (
                      <tr key={`time-${time}`}>
                        <td
                          style={{
                            ...styles.timeCell,
                            ...(label.isHalf
                              ? styles.timeCellHalf
                              : styles.timeCellHour),
                          }}
                        >
                          {label.isHalf ? (
                            <div style={styles.halfTimeWrap}>
                              <span style={styles.halfTimeHourSpacer}>00</span>
                              <span style={styles.halfTimeColon}>:</span>
                              <span style={styles.halfTimeMinute}>30</span>
                            </div>
                          ) : (
                            time
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={styles.dateScroll} ref={scrollDatesRef}>
              <table style={styles.dateTable}>
                <thead>
                  <tr>
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
                    <tr key={`row-${time}`}>
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
                          selected?.dateKey === dateKey &&
                          selected?.time === time;

                        const blockedEndTime = getBlockedEndTime(
                          time,
                          TREATMENT_MINUTES,
                          BUFFER_MINUTES
                        );

                        return (
                          <td
                            key={`${dateKey}-${time}`}
                            style={{
                              ...styles.slotCell,
                              ...(isReservable
                                ? styles.slotCellAvailable
                                : styles.slotCellUnavailable),
                            }}
                          >
                            {isReservable ? (
                              <button
                                onClick={() => handleSelect(dateKey, time)}
                                style={{
                                  ...styles.slotButton,
                                  ...styles.slotAvailable,
                                  ...(isSelected ? styles.slotSelected : {}),
                                }}
                                title={`施術終了 ${minutesToTimeString(
                                  timeStringToMinutes(time) +
                                    TREATMENT_MINUTES
                                )} / 枠確保 ${blockedEndTime}まで`}
                              >
                                ◎
                              </button>
                            ) : (
                              <div style={styles.slotUnavailableMark}>✕</div>
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
    backgroundImage: "url('/images/mokume.png')",
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
    minHeight: "unset",
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

  rangeText: {
    textAlign: "center",
    color: "#5a3a2c",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.4,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  weekButtonRow: {
    marginTop: "10px",
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

  selectedBox: {
    marginTop: "10px",
    padding: "10px 12px",
    borderRadius: "14px",
    background: "rgba(255, 228, 235, 0.82)",
    color: "#92515f",
    fontSize: "0.88rem",
    textAlign: "center",
    border: "1px solid rgba(226, 142, 164, 0.30)",
    lineHeight: 1.5,
  },

  selectedStrong: {
    color: "#b44f69",
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

  calendarShell: {
    display: "flex",
    alignItems: "stretch",
    gap: 0,
    overflow: "hidden",
    borderRadius: "18px",
    background: "#fffdfa",
    border: "1px solid #ece1d8",
  },

  timeColumn: {
    flex: "0 0 54px",
    width: "54px",
    background: "#faf5f0",
    borderRight: "1px solid #ece1d8",
    position: "relative",
    zIndex: 2,
  },

  fixedTable: {
    width: "54px",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    background: "#faf5f0",
  },

  dateScroll: {
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
    flex: 1,
  },

  dateTable: {
    borderCollapse: "collapse",
    tableLayout: "fixed",
    minWidth: "420px",
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
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  dateHead: {
    width: "60px",
    minWidth: "60px",
    height: "68px",
    background: "#fdf7f2",
    borderBottom: "1px solid #e6d8cf",
    borderLeft: "1px solid #f0e6de",
    padding: "6px 2px",
    textAlign: "center",
    boxSizing: "border-box",
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
    fontSize: "0.78rem",
    color: "#8f786d",
  },

  halfTimeWrap: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto auto",
    alignItems: "center",
    justifyContent: "center",
    fontVariantNumeric: "tabular-nums",
  },

  halfTimeHourSpacer: {
    visibility: "hidden",
  },

  halfTimeColon: {
    color: "transparent",
  },

  halfTimeMinute: {
    color: "#8f786d",
  },

  slotCell: {
    width: "60px",
    minWidth: "60px",
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

  slotButton: {
    width: "32px",
    height: "32px",
    borderRadius: "999px",
    fontSize: "0.92rem",
    fontWeight: 700,
    border: "2px solid transparent",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    padding: 0,
  },

  slotAvailable: {
    color: "#dc6f87",
    borderColor: "rgba(220, 111, 135, 0.28)",
    background: "rgba(255, 244, 247, 0.96)",
  },

  slotSelected: {
    color: "#fffafc",
    borderColor: "#d96f8b",
    background:
      "linear-gradient(180deg, rgba(232, 133, 159, 1) 0%, rgba(218, 103, 136, 1) 100%)",
    boxShadow:
      "0 0 0 4px rgba(231, 142, 168, 0.26), 0 6px 12px rgba(214, 107, 139, 0.28)",
    transform: "scale(1.06)",
  },

  slotUnavailableMark: {
    color: "#9d918a",
    fontSize: "0.92rem",
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
};
