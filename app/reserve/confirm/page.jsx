"use client";

export default function ReserveConfirmPage() {
  const reservationData = {
    customerName: "〇〇　〇〇",
    menuName: "整体コース　60分",
    options: ["巡りシェイプ 1部位", "頭部解放"],
    durationText: "90分",
    dateText: "2026/4/17(金)",
    timeText: "11:00〜12:30",
  };

  return (
    <main style={styles.page}>
      <div style={styles.overlay}>
        <section style={styles.card}>
          <button style={styles.closeButton} aria-label="閉じる">
            ×
          </button>

          <div style={styles.titleBox}>
            <h1 style={styles.title}>ご予約内容の確認</h1>
          </div>

          <div style={styles.nameBox}>
            <span style={styles.nameText}>{reservationData.customerName} 様</span>
          </div>

          <div style={styles.contentBox}>
            <div style={styles.menuBox}>
              <div style={styles.menuMain}>{reservationData.menuName}</div>

              {reservationData.options.length > 0 && (
                <div style={styles.optionWrap}>
                  <span style={styles.optionLabel}>オプション：</span>
                  <div style={styles.optionList}>
                    {reservationData.options.map((option, index) => (
                      <span key={index} style={styles.optionItem}>
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={styles.infoBlock}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>所要時間：</span>
                <span style={styles.infoValue}>{reservationData.durationText}</span>
              </div>

              <div style={styles.infoRowColumn}>
                <span style={styles.infoLabel}>ご予約日：</span>
                <span style={styles.dateValue}>{reservationData.dateText}</span>
                <span style={styles.timeValue}>{reservationData.timeText}</span>
              </div>
            </div>

            <img
              src="/images/tea-confirm.png"
              alt="お茶のイラスト"
              style={styles.teaImage}
            />
          </div>

          <div style={styles.noticeArea}>
            <p style={styles.noticeText}>
              ※ご予約当日のご変更、キャンセル等は
              <br />
              LINEにて承ります。
            </p>
            <p style={styles.noticeText}>
              ※当店は完全入れ替え制となりますので、
              <br />
              ご予約時間ちょうどを目安にお越しくださいませ。
            </p>
          </div>

          <button style={styles.submitButton}>この内容で予約する</button>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f7f0e9 0%, #f4ebe3 45%, #efe3d8 100%)",
    padding: "32px 16px 48px",
    boxSizing: "border-box",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
  },

  overlay: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  card: {
    position: "relative",
    width: "100%",
    maxWidth: "640px",
    background: "rgba(255, 255, 255, 0.74)",
    borderRadius: "28px",
    padding: "28px 18px 22px",
    boxShadow:
      "0 10px 30px rgba(109, 76, 60, 0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(187, 154, 138, 0.18)",
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "12px",
    border: "none",
    background: "transparent",
    color: "#8a6a5d",
    fontSize: "28px",
    lineHeight: 1,
    cursor: "pointer",
    padding: 0,
  },

  titleBox: {
    background: "#ead0b8",
    borderRadius: "16px",
    padding: "14px 16px",
    textAlign: "center",
    marginBottom: "16px",
  },

  title: {
    margin: 0,
    color: "#3f2a22",
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    lineHeight: 1.3,
  },

  nameBox: {
    background: "rgba(236, 218, 208, 0.68)",
    borderRadius: "16px",
    padding: "14px 18px",
    marginBottom: "16px",
  },

  nameText: {
    color: "#5b3a2d",
    fontSize: "1.65rem",
    lineHeight: 1.5,
  },

  contentBox: {
    position: "relative",
    background: "rgba(244, 232, 225, 0.76)",
    borderRadius: "18px",
    padding: "20px 18px 28px",
    minHeight: "520px",
    boxSizing: "border-box",
  },

  menuBox: {
    background: "rgba(255, 250, 247, 0.88)",
    border: "6px solid #cb9584",
    borderRadius: "24px",
    padding: "22px 18px",
    marginBottom: "26px",
    boxShadow: "0 4px 12px rgba(153, 104, 87, 0.08)",
  },

  menuMain: {
    color: "#4b3228",
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 1.5,
    marginBottom: "10px",
  },

  optionWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },

  optionLabel: {
    color: "#4b3228",
    fontSize: "1.35rem",
    lineHeight: 1.5,
  },

  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    paddingLeft: "4px",
  },

  optionItem: {
    color: "#4b3228",
    fontSize: "1.28rem",
    lineHeight: 1.6,
  },

  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    paddingRight: "150px",
  },

  infoRow: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "8px",
  },

  infoRowColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  infoLabel: {
    color: "#4b3228",
    fontSize: "1.4rem",
    fontWeight: 700,
    lineHeight: 1.5,
  },

  infoValue: {
    color: "#4b3228",
    fontSize: "1.5rem",
    lineHeight: 1.6,
  },

  dateValue: {
    color: "#4b3228",
    fontSize: "1.8rem",
    lineHeight: 1.5,
  },

  timeValue: {
    color: "#4b3228",
    fontSize: "1.8rem",
    lineHeight: 1.5,
    paddingLeft: "1.6em",
  },

  teaImage: {
    position: "absolute",
    right: "12px",
    bottom: "14px",
    width: "128px",
    height: "128px",
    objectFit: "contain",
    opacity: 0.95,
    pointerEvents: "none",
    userSelect: "none",
  },

  noticeArea: {
    padding: "16px 10px 6px",
  },

  noticeText: {
    margin: "0 0 10px",
    color: "#6b5044",
    fontSize: "1rem",
    lineHeight: 1.7,
    textAlign: "left",
  },

  submitButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    padding: "18px 20px",
    background: "linear-gradient(180deg, #eea9b6 0%, #e391a3 100%)",
    color: "#fffdfb",
    fontSize: "1.35rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(222, 148, 165, 0.28)",
    marginTop: "8px",
  },
};
