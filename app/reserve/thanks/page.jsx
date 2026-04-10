"use client";

export default function ThanksPage() {
  const customerName = "〇〇　〇〇";
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
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#f7f4f0",
          borderRadius: "28px",
          padding: "40px 20px 50px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(135, 102, 90, 0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* タイトル */}
        <div
          style={{
            fontSize: "30px",
            color: "#5b3b2f",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            letterSpacing: "0.08em",
            marginBottom: "24px",
          }}
        >
          ご予約ありがとうございます
        </div>

        {/* サブ */}
        <div
          style={{
            fontSize: "16px",
            color: "#7a5a5a",
            marginBottom: "28px",
          }}
        >
          ご予約を承りました🌸
        </div>

        {/* 内容 */}
        <div
          style={{
            background: "rgba(243, 225, 230, 0.5)",
            borderRadius: "18px",
            padding: "18px 16px",
            marginBottom: "28px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#6a4337",
              marginBottom: "10px",
            }}
          >
            {menuName}　{menuTime}
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#6a4337",
            }}
          >
            {reserveDate}　{reserveTime}
          </div>
        </div>

        {/* LINE案内 */}
        <div
          style={{
            fontSize: "14px",
            color: "#8f766a",
            lineHeight: 1.8,
            marginBottom: "24px",
          }}
        >
          ご変更・ご連絡はLINEより承っております🌿
        </div>

        {/* 戻るボタン */}
        <button
          style={{
            border: "none",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
            color: "#fff",
            fontSize: "18px",
            padding: "14px 28px",
            cursor: "pointer",
          }}
        >
          トップへ戻る
        </button>

        {/* お茶画像 */}
        <img
          src="/images/tea-confirm.png"
          alt=""
          style={{
            position: "absolute",
            right: "20px",
            bottom: "20px",
            width: "110px",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />
      </div>
    </main>
  );
}
