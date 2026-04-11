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
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f1ec", // ←明るい生成りピンク
        display: "flex",
        justifyContent: "center",
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
          border: "1.5px solid #c8a89a", // ←柔らかブラウン
          borderRadius: "10px",
          padding: "18px 16px 16px",
          background: "rgba(255,255,255,0.55)", // ←ふんわり白
          boxSizing: "border-box",
          backdropFilter: "blur(6px)",
        }}
      >
        <h1
          style={{
            margin: "0 0 18px 0",
            textAlign: "center",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: "#6a4a3d",
          }}
        >
          ご予約履歴
        </h1>

        {/* ヘッダー */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "92px 1fr 84px",
            padding: "0 8px",
            marginBottom: "10px",
            fontSize: "12px",
            color: "#a67c6b",
          }}
        >
          <div style={{ textAlign: "center" }}>日付</div>
          <div style={{ textAlign: "center" }}>コース</div>
          <div style={{ textAlign: "center" }}>オプション</div>
        </div>

        {/* リスト */}
        <div
          style={{
            maxHeight: "430px",
            overflowY: "auto",
          }}
        >
          {historyList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fffaf7", // ←柔らか白
                border: "1px solid #ead5cc",
                borderRadius: "10px",
                minHeight: "48px",
                display: "grid",
                gridTemplateColumns: "92px 1fr 84px",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {/* 日付 */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  borderRight: "1px solid #f0e0d8",
                }}
              >
                {item.date}
              </div>

              {/* コース */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRight: "1px solid #f0e0d8",
                }}
              >
                {item.course}
              </div>

              {/* オプション */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "11px",
                  color: "#a07c6c",
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
