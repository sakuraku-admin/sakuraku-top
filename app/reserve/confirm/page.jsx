"use client";

export default function ReserveConfirmPage() {
  const customerName = "〇〇　〇〇";
  const menuName = "整体コース";
  const menuTime = "60分";
  const options = ["巡りシェイプ1部位", "頭部解放"];
  const totalTime = "90分";
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  const isShinseiCourse = menuName.includes("深整");

  const timeNote = isShinseiCourse
    ? "※施術時間とは別に、お茶やお着替え等のお時間をご用意しております"
    : "※施術時間にはお着替え等のお時間も含まれております";

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
            <div style={styles.label}>オプション</div>
            <div style={styles.optionList}>
              {options.length > 0 ? (
                options.map((option) => (
                  <div key={option} style={styles.optionItem}>
                    {option}
                  </div>
                ))
              ) : (
                <div style={styles.optionItem}>なし</div>
              )}
            </div>
          </div>

          <div style={styles.dateSection}>
            <div style={styles.dateLabel}>ご予約日時</div>
            <div style={styles.dateValue}>
              {reserveDate}　{reserveTime}
            </div>
          </div>

          <div style={styles.noteInline}>{timeNote}</div>

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
    padding: "20px 16px 30px",
    boxSizing: "border-box",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  titleBar: {
    background:
      "linear-gradient(180deg, rgba(206, 221, 213, 0.96) 0%, rgba(194, 213, 205, 0.96) 100%)",
    borderRadius: "20px",
    textAlign: "center",
    padding: "13px 12px 14px",
    color: "#4f4036",
    fontSize: "1.38rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    boxShadow: "0 6px 18px rgba(118, 145, 136, 0.14)",
    border: "1px solid rgba(255,255,255,0.42)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  nameBar: {
    background: "rgba(247, 235, 239, 0.78)",
    borderRadius: "14px",
    padding: "9px 14px",
    color: "#7a5a5a",
    fontSize: "0.98rem",
    letterSpacing: "0.06em",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.72), 0 4px 12px rgba(231, 191, 203, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  mainCard: {
    position: "relative",
    background: "rgba(248, 244, 240, 0.88)",
    borderRadius: "24px",
    padding: "16px 16px 72px",
    boxSizing: "border-box",
    boxShadow: "0 10px 24px rgba(135, 102, 90, 0.08)",
    border: "1px solid rgba(255,255,255,0.40)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    overflow: "hidden",
  },

  courseRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  courseName: {
    color: "#5b3b2f",
    fontSize: "1.55rem",
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "0.05em",
    textAlign: "center",
  },

  totalTime: {
    color: "#7c6256",
    fontSize: "0.98rem",
    lineHeight: 1.5,
    textAlign: "center",
  },

  divider: {
    height: "1px",
    background: "rgba(211, 182, 168, 0.72)",
    margin: "12px 0 12px",
  },

  optionSection: {
    display: "grid",
    gridTemplateColumns: "70px 1fr",
    columnGap: "8px",
    alignItems: "start",
  },

  label: {
    color: "#9a7567",
    fontSize: "0.88rem",
    lineHeight: 1.75,
    letterSpacing: "0.03em",
  },

  optionList: {
    color: "#735244",
    fontSize: "0.96rem",
    lineHeight: 1.75,
    letterSpacing: "0.02em",
  },

  optionItem: {
    whiteSpace: "pre-wrap",
  },

  dateSection: {
    marginTop: "14px",
    background: "rgba(239, 205, 216, 0.74)",
    borderRadius: "18px",
    padding: "11px 18px 12px",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.62), 0 4px 12px rgba(225, 176, 192, 0.10)",
    width: "calc(100% - 96px)",
    minWidth: "0",
  },

  dateLabel: {
    color: "#8c6570",
    fontSize: "0.86rem",
    marginBottom: "4px",
    letterSpacing: "0.03em",
  },

  dateValue: {
    color: "#6a4337",
    fontSize: "1.02rem",
    fontWeight: 700,
    lineHeight: 1.55,
    letterSpacing: "0.01em",
    whiteSpace: "normal",
    wordBreak: "keep-all",
  },

  noteInline: {
    marginTop: "8px",
    color: "#8b7268",
    fontSize: "0.76rem",
    lineHeight: 1.75,
    letterSpacing: "0.01em",
    paddingRight: "98px",
  },

  teaImage: {
    position: "absolute",
    right: "14px",
    bottom: "16px",
    width: "96px",
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
    boxShadow: "0 8px 18px rgba(228, 138, 122, 0.20)",
  },

  attentionArea: {
    padding: "0 4px",
    color: "#8f766a",
    fontSize: "0.76rem",
    lineHeight: 1.8,
    letterSpacing: "0.01em",
  },
};
