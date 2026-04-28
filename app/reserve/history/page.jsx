"use client";

import { useEffect, useState } from "react";

const USER_STORAGE_KEY = "sakurakuUser";
const RESERVATIONS_STORAGE_KEY = "sakurakuReservations";

export default function ReserveHistoryPage() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (!savedUser) {
        window.location.href = "/register";
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (!parsedUser?.isLoggedIn) {
        window.location.href = "/register";
        return;
      }

      const savedReservations = localStorage.getItem(RESERVATIONS_STORAGE_KEY);

      if (!savedReservations) {
        setHistoryList([]);
        return;
      }

      const parsedReservations = JSON.parse(savedReservations);

      if (Array.isArray(parsedReservations)) {
        const userReservations = parsedReservations.filter((item) => {
          const reservationName =
            item?.customerName || item?.customer?.name || "";

          if (item?.customerId && parsedUser?.userId) {
            return item.customerId === parsedUser.userId;
          }

          return reservationName === parsedUser.name;
        });

        const formattedHistory = userReservations
          .map((item) => ({
            id: item.id || `${item.date}-${item.startTime}`,
            date: item.reserveDate || "",
            course: `${item.menuName || ""}${item.menuTime ? `（${item.menuTime}）` : ""}`,
            option: Array.isArray(item.options)
              ? item.options.join("\n")
              : "",
            createdAt: item.createdAt || "",
          }))
          .sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

        setHistoryList(formattedHistory);
      }
    } catch (error) {
      console.error("履歴データの読み込みに失敗しました", error);
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#f8eeec",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "14px",
        boxSizing: "border-box",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "calc(100dvh - 28px)",
          maxHeight: "747px",
          border: "1.5px solid #8a6f63",
          borderRadius: "12px",
          background: "#fbf4f1",
          boxSizing: "border-box",
          padding: "18px 14px 14px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            margin: "0 0 18px 0",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#7a5e52",
            flexShrink: 0,
          }}
        >
          ご予約履歴
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "96px 1.2fr 84px",
            alignItems: "center",
            padding: "0 6px",
            marginBottom: "10px",
            fontSize: "12px",
            color: "#b08776",
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: "center" }}>日付</div>
          <div style={{ textAlign: "center" }}>コース</div>
          <div style={{ textAlign: "center" }}>オプション</div>
        </div>

        <div
          className="history-scroll"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingRight: "4px",
            boxSizing: "border-box",
            scrollbarWidth: "thin",
            scrollbarColor: "#b59a8d #f6ece8",
          }}
        >
          <style>{`
            .history-scroll::-webkit-scrollbar {
              width: 8px;
            }
            .history-scroll::-webkit-scrollbar-track {
              background: #f6ece8;
              border-radius: 999px;
            }
            .history-scroll::-webkit-scrollbar-thumb {
              background: #b59a8d;
              border-radius: 999px;
              border: 1px solid #f6ece8;
            }
          `}</style>

          {historyList.length > 0 ? (
            historyList.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fffdfa",
                  border: "1px solid #d7c1b7",
                  borderRadius: "10px",
                  minHeight: "54px",
                  display: "grid",
                  gridTemplateColumns: "96px 1.2fr 84px",
                  alignItems: "center",
                  marginBottom: "8px",
                  padding: "0 8px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "13px",
                    lineHeight: 1.3,
                    color: "#7a5e52",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.date}
                </div>

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "0 14px",
                    fontSize: "15px",
                    lineHeight: 1.35,
                    fontWeight: 500,
                    color: "#6f5448",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1px",
                      height: "22px",
                      background: "#ead9d1",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1px",
                      height: "22px",
                      background: "#ead9d1",
                    }}
                  />
                  {item.course}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "10px",
                    lineHeight: 1.4,
                    color: "#b08a79",
                    whiteSpace: "pre-line",
                    wordBreak: "break-word",
                  }}
                >
                  {item.option}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                background: "#fffdfa",
                border: "1px solid #d7c1b7",
                borderRadius: "10px",
                minHeight: "54px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#8f766a",
                fontSize: "13px",
                lineHeight: 1.6,
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              まだご予約履歴はありません。
            </div>
          )}
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
            color: "#fff",
            fontSize: "1.18rem",
            padding: "16px",
            cursor: "pointer",
            letterSpacing: "0.03em",
            marginTop: "10px",
            flexShrink: 0,
          }}
        >
          トップへ戻る
        </button>
      </div>
    </main>
  );
}
