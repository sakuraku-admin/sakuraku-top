"use client";

export default function ReserveConfirmPage() {
  const customerName = "〇〇　〇〇";
  const menuName = "整体コース";
  const menuTime = "60分";
  const options = ["マグクリーム", "巡りシェイプケア30分", "頭部解放"];
  const totalTime = "90分";
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.titleBar}>ご予約内容の確認</div>

        <div style={styles.nameBar}>{customerName} 様</div>

        <section style={styles.mainCard}>
          <div style={styles.courseRow}>
            <div style={styles.courseName}>
              {menuName}　{menuTime}
            </div>
            <div style={styles.totalTime}>所要時間：{totalTime}</div>
          </div>

          <div style={styles.divider} />

          <div style={styles.optionSection}>
            <div style={styles.optionLabel}>オプション</div>
            <div style={styles.optionList}>
              {options.length > 0 ? (
                options.map((option) => (
                  <span key={option} style={styles.optionItem}>
                    {option}
                  </span>
                ))
              ) : (
                <span style={styles.optionItem}>なし</span>
              )}
            </div>
          </div>

          <div style={styles.dividerBelowOption} />

          <div style={styles.dateSection}>
            <div style={styles.dateLabel}>ご予約日時</div>
            <div style={styles.dateValue}>
              {reserveDate}　{reserveTime}
            </div>
          </div>

          <img
            src="/images/tea-confirm.png"
            alt=""
            style={styles.teaImage}
          />
        </section>

        <button type="button" style={styles.reserveButton}>
          この内容で予約する
        </button>

        <div style={styles.attentionArea}>
          <div>※ご予約当日のご変更・キャンセル等はLINEにてうけたまわります。</div>
          <div>
            ※当サロンは完全入れ替え制になりますので、なるべくご予約時間ちょうどを目安にお越しいただけますと幸いです。
          </div>
        </div>
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
    padding: "20px 16px 34px",
    boxSizing: "border-box",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  titleBar: {
    background:
      "linear-gradient(180deg, rgba(197, 229, 215, 0.96) 0%, rgba(183, 220, 204, 0.96) 100%)",
    borderRadius: "22px",
    textAlign: "center",
    padding: "14px 14px 15px",
    color: "#514136",
    fontSize: "1.38rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    boxShadow: "0 6px 16px rgba(122, 164, 145, 0.14)",
    border: "1px solid rgba(255,255,255,0.5)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  nameBar: {
    background: "rgba(255, 255, 255, 0.34)",
    borderRadius: "14px",
    padding: "8px 16px 9px",
    color: "#7a5f59",
    fontSize: "0.96rem",
    letterSpacing: "0.06em",
    border: "1px solid rgba(255,255,255,0.48)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.55), 0 3px 10px rgba(214, 190, 180, 0.05)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  mainCard: {
    position: "relative",
    background: "rgba(247, 242, 237, 0.9)",
    borderRadius: "26px",
    padding: "22px 18px 72px",
    boxSizing: "border-box",
    boxShadow: "0 10px 24px rgba(135, 102, 90, 0.08)",
    border: "1px solid rgba(255,255,255,0.42)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    overflow: "hidden",
  },

  courseRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },

  courseName: {
    color: "#5c3d31",
    fontSize: "1.62rem",
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "0.05em",
    textAlign: "center",
  },

  totalTime: {
    color: "#81685b",
    fontSize: "0.98rem",
    lineHeight: 1.5,
    textAlign: "center",
  },

  divider: {
    height: "1px",
    background: "rgba(211, 182, 168, 0.72)",
    margin: "14px 0 10px",
  },

  optionSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "4px 2px 2px",
    textAlign: "center",
  },

  optionLabel: {
    color: "#7b584b",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
  },

  optionList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "12px",
    rowGap: "4px",
    maxWidth: "100%",
    color: "#735244",
    fontSize: "0.82rem",
    lineHeight: 1.65,
    letterSpacing: "0.01em",
  },

  optionItem: {
    whiteSpace: "nowrap",
  },

  dividerBelowOption: {
    height: "1px",
    background: "rgba(211, 182, 168, 0.72)",
    margin: "10px 0 18px",
  },

  dateSection: {
    width: "82%",
    margin: "0 auto",
    background: "rgba(239, 205, 216, 0.76)",
    borderRadius: "20px",
    padding: "12px 16px 13px",
    textAlign: "center",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.62), 0 4px 12px rgba(225, 176, 192, 0.08)",
  },

  dateLabel: {
    color: "#8a6671",
    fontSize: "0.9rem",
    marginBottom: "6px",
    letterSpacing: "0.04em",
  },

  dateValue: {
    color: "#674033",
    fontSize: "1.06rem",
    fontWeight: 700,
    lineHeight: 1.55,
    letterSpacing: "0.01em",
    whiteSpace: "normal",
    wordBreak: "keep-all",
  },

  teaImage: {
    position: "absolute",
    right: "14px",
    bottom: "14px",
    width: "98px",
    opacity: 0.34,
    filter:
      "brightness(1.08) contrast(0.96) saturate(0.95) drop-shadow(0 1px 2px rgba(255,255,255,0.6))",
    pointerEvents: "none",
    userSelect: "none",
  },

  reserveButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #ee9b8a 0%, #e68676 100%)",
    color: "#fffdfb",
    fontSize: "1.18rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    padding: "16px 16px",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(228, 138, 122, 0.18)",
  },

  attentionArea: {
    padding: "2px 4px 0",
    color: "#90796f",
    fontSize: "0.74rem",
    lineHeight: 1.8,
    letterSpacing: "0.01em",
  },
};
