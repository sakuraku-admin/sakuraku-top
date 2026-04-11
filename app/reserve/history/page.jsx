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
        width: "100%",
        height: "100vh",
        background: "#f6efe9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
        color: "#6b5246", // ←優しく調整
      }}
    >
      {/* 900×1600 */}
      <div
        style={{
          width: "900px",
          height: "1600px",
          border: "2px solid #8a6f63",
          borderRadius: "10px",
          padding: "30px 24px",
          background: "rgba(255,255,255,0.25)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "24px",
            letterSpacing: "0.08em",
          }}
        >
          ご予約履歴
        </h1>

        {/* ヘッダー */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 220px",
            marginBottom: "12px",
            fontSize: "16px",
            color: "#a07c6c",
            textAlign: "center",
          }}
        >
          <div>日付</div>
          <div>コース</div>
          <div>オプション</div>
        </div>

        {/* スクロール */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "6px",
          }}
        >
          {historyList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fffdfb",
                border: "1.5px solid #d8c2b8",
                borderRadius: "12px",
                height: "90px",
                display: "grid",
                gridTemplateColumns: "180px 1fr 220px",
                alignItems: "center",
                marginBottom: "14px",
                padding: "0 12px",
                boxSizing: "border-box",
              }}
            >
              {/* 日付 */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                {item.date}
              </div>

              {/* コース */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 500,
                  position: "relative",
                }}
              >
                {/* 短い仕切り線（左） */}
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    top: "50%",
                    width: "1px",
                    height: "24px",
                    background: "#e6d6cf",
                    transform: "translateY(-50%)",
                  }}
                />

                {item.course}

                {/* 短い仕切り線（右） */}
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "50%",
                    width: "1px",
                    height: "24px",
                    background: "#e6d6cf",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>

              {/* オプション */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "14px",
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
