"use client";

export default function ThanksPage() {
  const menuName = "整体コース";
  const menuTime = "60分";
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

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
            background: "#dcc5b0",
            borderRadius: "20px",
            padding: "16px 12px",
            color: "#4f3428",
            fontSize: "28px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            marginBottom: "22px",
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
            position: "relative",
            background: "#e9e3de",
            borderRadius: "22px",
            padding: "20px 16px 24px",
            boxSizing: "border-box",
            overflow: "hidden",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              border: "2px solid #dba18f",
              borderRadius: "24px",
              background: "#f4f0ec",
              padding: "20px 18px",
              boxShadow: "0 2px 8px rgba(178, 132, 117, 0.10)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                color: "#5b3b2f",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                marginBottom: "10px",
              }}
            >
              {menuName}　{menuTime}
            </div>

            <div
              style={{
                display: "inline-block",
                color: "#6a4337",
                background: "rgba(238, 204, 214, 0.62)",
                padding: "8px 16px 10px",
                borderRadius: "999px",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1.7,
                letterSpacing: "0.03em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.62), 0 4px 12px rgba(225, 176, 192, 0.14)",
              }}
            >
              ご予約日時：{reserveDate}　{reserveTime}
            </div>
          </div>

          <div
            style={{
              color: "#8b7268",
              fontSize: "13px",
              lineHeight: 1.95,
              letterSpacing: "0.01em",
              fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
              textAlign: "left",
              position: "relative",
              zIndex: 2,
            }}
          >
            ご変更・ご連絡はLINEより承っております。<br />
            当日のご変更・キャンセル等もLINEにてうけたまわります。
          </div>

          <img
            src="/images/tea-confirm.png"
            alt=""
            style={{
              position: "absolute",
              right: "20px",
              bottom: "14px",
              width: "112px",
              opacity: 0.28,
              filter:
                "brightness(1.1) contrast(0.96) saturate(0.95) drop-shadow(0 1px 2px rgba(255,255,255,0.6))",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
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
