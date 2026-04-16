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
          <div style={styles.datePillWrap}>
            <div style={styles.dateLabel}>ご予約日時</div>
            <div style={styles.dateValue}>
              {reserveDate}　{reserveTime}
            </div>
          </div>

          <div style={styles.subInfo}>
            <div>
              {menuName}（{menuTime}）
            </div>

            {hasOptions && (
              <div style={styles.optionBlock}>
                {options.map((option) => (
                  <div key={option}>{option}</div>
                ))}
              </div>
            )}
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
    background: "rgba(248, 245, 240, 0.94)",
    borderRadius: "28px",
    padding: "14px 16px 18px",
    boxShadow: "0 8px 24px rgba(135, 102, 90, 0.06)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  titleBar: {
    background: "linear-gradient(180deg, #cfe6df 0%, #c4ddd7 100%)",
    borderRadius: "20px",
    padding: "14px 14px",
    color: "#3e4c47",
    fontSize: "1.32rem",
    lineHeight: 1.5,
    marginBottom: "14px",
    letterSpacing: "0.04em",
    textAlign: "center",
  },

  message: {
    color: "#7a5a5a",
    fontSize: "0.97rem",
    lineHeight: 1.9,
    marginBottom: "14px",
    padding: "0 6px",
    textAlign: "center",
  },

  infoCard: {
    position: "relative",
    background: "#f2e7df",
    borderRadius: "22px",
    padding: "16px 14px 18px",
    marginBottom: "14px",
    boxSizing: "border-box",
    overflow: "hidden",
    textAlign: "center",
  },

  datePillWrap: {
    width: "100%",
    maxWidth: "286px",
    margin: "0 auto 12px",
    background: "#ffffff",
    borderRadius: "999px",
    padding: "10px 16px 11px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    textAlign: "center",
  },

  dateLabel: {
    color: "#8a6671",
    fontSize: "0.88rem",
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    marginBottom: "4px",
    textAlign: "center",
  },

  dateValue: {
    color: "#6a4337",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.7,
    wordBreak: "keep-all",
    textAlign: "center",
  },

  subInfo: {
    color: "#9a857d",
    fontSize: "0.77rem",
    lineHeight: 1.7,
    textAlign: "center",
    padding: "0 12px",
  },

  optionBlock: {
    marginTop: "4px",
    textAlign: "center",
  },

  note: {
    color: "#8b7268",
    fontSize: "0.77rem",
    lineHeight: 1.8,
    marginTop: "10px",
    padding: "0 12px 0",
    textAlign: "center",
  },

  teaImage: {
    position: "absolute",
    right: "12px",
    bottom: "10px",
    width: "84px",
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
