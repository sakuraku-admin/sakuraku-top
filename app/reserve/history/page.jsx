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
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f9f3ef", // ←明るい生成りピンク
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "30px 12px",
        boxSizing: "border-box",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
        color: "#5a3f33",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          border: "2px solid #bfa094", // ←柔らかブラウン
          borderRadius: "6px",
          padding: "18px 16px 16px",
          background: "rgba(255,255,255,0.35)", // ←少し明るく
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
            color: "#6a4a3d",
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
            color: "#9c7c6c", // ←ほんのり優しく
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
          }}
        >
          {historyList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fffaf7", // ←ほんのり温かい白
                border: "1.5px solid #d8c2b8",
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
                  textAlign: "center",
                  fontSize: "13px",
                  borderRight: "1px solid #ead8d0",
                }}
              >
                {item.date}
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRight: "1px solid #ead8d0",
                }}
              >
                {item.course}
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#a68474",
                  whiteSpace: "pre-line",
                }}
              >
                {item.option}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
