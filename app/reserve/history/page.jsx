export default function ReserveHistoryPage() {
  const historyList = [
    {
      id: 1,
      date: "2026/1/15",
      course: "整体コース60分",
      option: "頭部解放\n巡りシェイプ2部位",
    },
    {
      id: 2,
      date: "2026/2/20",
      course: "整体コース90分",
      option: "巡りシェイプ1部位",
    },
    {
      id: 3,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 4,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 5,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 6,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 7,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 8,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 9,
      date: "",
      course: "",
      option: "",
    },
    {
      id: 10,
      date: "",
      course: "",
      option: "",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eee4de",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "30px 12px",
        boxSizing: "border-box",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
        color: "#5f4a3f",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          border: "2px solid #6e5a50",
          borderRadius: "6px",
          padding: "18px 16px 16px",
          background: "rgba(255,255,255,0.18)",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            margin: "0 0 18px 0",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#5f4a3f",
          }}
        >
          ご予約履歴
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "92px 1fr 84px",
            alignItems: "center",
            padding: "0 8px",
            marginBottom: "8px",
            fontSize: "12px",
            color: "#5f4a3f",
          }}
        >
          <div style={{ textAlign: "center" }}>日付</div>
          <div style={{ textAlign: "center" }}>コース</div>
          <div style={{ textAlign: "center" }}>オプション</div>
        </div>

        <div
          style={{
            height: "430px",
            overflowY: "auto",
            paddingRight: "4px",
            boxSizing: "border-box",
            scrollbarWidth: "thin",
            scrollbarColor: "#8b7a71 #f2ebe7",
          }}
        >
          <style>{`
            .history-scroll::-webkit-scrollbar {
              width: 10px;
            }
            .history-scroll::-webkit-scrollbar-track {
              background: #f2ebe7;
              border-radius: 999px;
            }
            .history-scroll::-webkit-scrollbar-thumb {
              background: #8b7a71;
              border-radius: 999px;
              border: 2px solid #f2ebe7;
            }
          `}</style>

          <div className="history-scroll">
            {historyList.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#f7f7f7",
                  border: "1.5px solid #9a8a80",
                  borderRadius: "6px",
                  minHeight: "46px",
                  display: "grid",
                  gridTemplateColumns: "92px 1fr 84px",
                  alignItems: "center",
                  marginBottom: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    color: "#5f4a3f",
                    borderRight: "1px solid #ddd4cf",
                    padding: "6px 4px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.date}
                </div>

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    color: "#5f4a3f",
                    borderRight: "1px solid #ddd4cf",
                    padding: "6px 8px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    lineHeight: 1.35,
                    fontWeight: 500,
                  }}
                >
                  {item.course}
                </div>

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#7a675c",
                    padding: "6px 6px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    lineHeight: 1.35,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.option}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
