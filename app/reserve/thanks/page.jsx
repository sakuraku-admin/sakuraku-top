"use client";

export default function ThanksPage() {
  const menuName = "整体コース";
  const menuTime = "60分";
  const options = ["頭部解放", "巡りシェイプ1部位", "マグバーム"];
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  const hasOptions = options && options.length > 0;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.titleBar}>ご予約ありがとうございます</div>

        <div style={styles.message}>
          ご予約を承りました。
          <br />
          ご来店を心よりお待ちしております🌸
        </div>

        <section style={styles.infoCard}>
          <div style={styles.datePill}>
            ご予約日時：{reserveDate}　{reserveTime}
          </div>

          <div style={styles.subInfo}>
            {menuName}（{menuTime}）
            <br />
            {hasOptions && `オプション：${options.join("　")}`}
          </div>

          <div style={styles.note}>
            ご不明な点がありましたらお気軽にLINEからお問合せください
          </div>

          <img
            src="/images/tea-confirm.png"
            alt=""
            style={styles.teaImage}
          />
        </section>

        <button
          onClick={() => (window.location.href = "/")}
          style={styles.backButton}
        >
          トップへ戻る
        </button>
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
    display: "flex",
    justifyContent: "center",
    padding: "22px 16px 34px",
    boxSizing: "border-box",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(247, 244, 240, 0.92)",
    borderRadius: "28px",
    padding: "20px 16px 28px",
    boxShadow: "0 8px 24px rgba(135, 102, 90, 0.06)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  titleBar: {
    background: "linear-gradient(180deg, #cfe6df 0%, #c4ddd7 100%)",
    borderRadius: "20px",
    padding: "16px 14px",
    color: "#3e4c47",
    fontSize: "1.42rem",
    lineHeight: 1.5,
    marginBottom: "18px",
    letterSpacing: "0.04em",
  },

  message: {
    color: "#7a5a5a",
    fontSize: "1rem",
    lineHeight: 1.9,
    marginBottom: "18px",
    padding: "0 6px",
  },

  infoCard: {
    position: "relative",
    background: "#efd6dc",
    borderRadius: "22px",
    padding: "24px 14px 72px",
    marginBottom: "18px",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  datePill: {
    display: "inline-block",
    maxWidth: "100%",
    background: "#ffffff",
    borderRadius: "999px",
    padding: "12px 18px",
    fontSize: "1.02rem",
    fontWeight: 500,
    color: "#6a4337",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    marginBottom: "16px",
    lineHeight: 1.7,
    wordBreak: "keep-all",
  },

  subInfo: {
    color: "#9a857d",
    fontSize: "0.8rem",
    lineHeight: 1.85,
    textAlign: "center",
    padding: "0 6px",
  },

  note: {
    color: "#8b7268",
    fontSize: "0.8rem",
    lineHeight: 1.8,
    marginTop: "12px",
    padding: "0 8px",
  },

  teaImage: {
    position: "absolute",
    right: "12px",
    bottom: "10px",
    width: "96px",
    opacity: 0.34,
    filter:
      "brightness(1.08) contrast(0.96) saturate(0.95) drop-shadow(0 1px 2px rgba(255,255,255,0.6))",
    pointerEvents: "none",
    userSelect: "none",
  },

  backButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
    color: "#fff",
    fontSize: "1.18rem",
    padding: "16px",
    cursor: "pointer",
    letterSpacing: "0.03em",
  },
};
