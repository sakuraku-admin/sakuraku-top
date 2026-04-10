"use client";

export default function ThanksPage() {
  const menuName = "整体コース";
  const menuTime = "60分";
  const options = ["頭部解放", "巡りシェイプ1部位", "マグバーム"];
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  const hasOptions = options && options.length > 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e9e4de",
        display: "flex",
        justifyContent: "center",
        padding: "16px 12px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#f7f4f0",
          borderRadius: "28px",
          padding: "28px 16px 36px",
          boxSizing: "border-box",
          boxShadow: "0 8px 24px rgba(135, 102, 90, 0.06)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(180deg, #cfe6df 0%, #c4ddd7 100%)",
            borderRadius: "20px",
            padding: "16px 12px",
            color: "#3e4c47",
            fontSize: "28px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            marginBottom: "22px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          ご予約ありがとうございます
        </div>

        <div
          style={{
            color: "#7a5a5a",
            fontSize: "16px",
            lineHeight: 1.9,
            letterSpacing: "0.02em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            marginBottom: "22px",
          }}
        >
          ご予約を承りました。<br />
          ご来店を心よりお待ちしております🌸
        </div>

        <section
          style={{
            background: "#e9e3de",
            borderRadius: "22px",
            padding: "20px 16px 20px",
            boxSizing: "border-box",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              border: "2px solid #dba18f",
              borderRadius: "24px",
              background: "#f4f0ec",
              padding: "24px 18px 22px",
              boxShadow: "0 2px 8px rgba(178, 132, 117, 0.10)",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                color: "#6a4337",
                background: "rgba(238, 204, 214, 0.62)",
                padding: "10px 18px 12px",
                borderRadius: "999px",
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: 1.7,
                letterSpacing: "0.03em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.62), 0 4px 12px rgba(225, 176, 192, 0.14)",
                margin: "0 auto",
              }}
            >
              ご予約日時：{reserveDate}　{reserveTime}
            </div>
          </div>

          <div
            style={{
              color: "#9a857d",
              fontSize: "13px",
              lineHeight: 1.9,
              letterSpacing: "0.01em",
              fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
              textAlign: "left",
              marginBottom: "14px",
            }}
          >
            <div>
              {menuName}（{menuTime}）
            </div>
            {hasOptions && (
              <div>
                オプション：{options.join("　")}
              </div>
            )}
          </div>

          <div
            style={{
              color: "#8b7268",
              fontSize: "14px",
              lineHeight: 1.9,
              letterSpacing: "0.01em",
              fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
              textAlign: "left",
            }}
          >
            ご不明な点がありましたらお気軽にLINEでお問合せください
          </div>
        </section>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
            color: "#fffdfb",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            padding: "18px 16px",
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(210, 140, 160, 0.18)",
          }}
        >
          トップへ戻る
        </button>
      </div>
    </main>
  );
}
