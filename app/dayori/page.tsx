import type { CSSProperties } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "さく楽便り｜プライベート整体サロン さく楽",
  description:
    "プライベート整体サロンさく楽の、キャンペーンや最新のお知らせです。",
};

/*
 * 現在ページに掲載する画像
 *
 * 上に書いた画像から順番に表示されます。
 * 1枚だけ掲載するときは、1行だけ残せばOKです。
 */
const DAYORI_IMAGES = [
  "dayori-0701.png",
  "dayori-0702.png",
];

export default function DayoriPage() {
  return (
    <main style={styles.main}>
      <div style={styles.page}>
        <header style={styles.header}>
          <p style={styles.smallTitle}>Private Salon Sakuraku</p>

          <h1 style={styles.title}>さく楽便り</h1>

          <div style={styles.titleDivider} aria-hidden="true">
            <span style={styles.titleLine} />
            <span style={styles.titleLeaf}>𖥧</span>
            <span style={styles.titleLine} />
          </div>

          <p style={styles.introduction}>
            さく楽からの、季節のお知らせや
            <br />
            キャンペーンのご案内です。
          </p>
        </header>

        <section style={styles.noticeList} aria-label="さく楽からのお知らせ">
          {DAYORI_IMAGES.map((fileName, index) => (
            <div key={fileName}>
              <article style={styles.notice}>
                <img
                  src={`/dayori/${fileName}`}
                  alt={`さく楽便りのお知らせ ${index + 1}`}
                  style={styles.image}
                />
              </article>

              {index < DAYORI_IMAGES.length - 1 && (
                <div style={styles.divider} aria-hidden="true">
                  <span style={styles.dividerLine} />
                  <span style={styles.leaf}>𖥧</span>
                  <span style={styles.dividerLine} />
                </div>
              )}
            </div>
          ))}
        </section>

        <footer style={styles.footer}>
          <span style={styles.footerLeaf} aria-hidden="true">
            𖥧
          </span>
          <p style={styles.footerText}>
            プライベート整体サロン さく楽
          </p>
        </footer>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: "100dvh",
    padding: "20px 12px 48px",
    background:
      "linear-gradient(180deg, #fffaf6 0%, #f8eee8 55%, #f2e4dc 100%)",
  },

  page: {
    width: "100%",
    maxWidth: "820px",
    margin: "0 auto",
  },

  header: {
    padding: "18px 12px 30px",
    textAlign: "center",
  },

  smallTitle: {
    margin: "0 0 6px",
    color: "#a99184",
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },

  title: {
    margin: "0",
    color: "#68564d",
    fontSize: "clamp(28px, 7vw, 42px)",
    fontWeight: 500,
    letterSpacing: "0.12em",
  },

  titleDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    width: "min(280px, 78%)",
    margin: "16px auto",
  },

  titleLine: {
    display: "block",
    flex: 1,
    height: "1px",
    backgroundColor: "#d9bfb7",
  },

  titleLeaf: {
    color: "#889b7b",
    fontSize: "18px",
    lineHeight: 1,
  },

  introduction: {
    margin: "0",
    color: "#806f66",
    fontSize: "14px",
    lineHeight: 1.9,
    letterSpacing: "0.04em",
  },

  noticeList: {
    width: "100%",
  },

  notice: {
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(213, 188, 178, 0.55)",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(100, 73, 61, 0.12)",
  },

  image: {
    display: "block",
    width: "100%",
    height: "auto",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "13px",
    width: "min(390px, 78%)",
    margin: "30px auto",
  },

  dividerLine: {
    display: "block",
    flex: 1,
    height: "1px",
    backgroundColor: "#dabfb7",
  },

  leaf: {
    color: "#8c9d7e",
    fontSize: "20px",
    lineHeight: 1,
    transform: "translateY(-1px)",
  },

  footer: {
    padding: "36px 12px 8px",
    textAlign: "center",
  },

  footerLeaf: {
    display: "block",
    marginBottom: "8px",
    color: "#95a488",
    fontSize: "17px",
  },

  footerText: {
    margin: "0",
    color: "#9b877c",
    fontSize: "12px",
    letterSpacing: "0.1em",
  },
};
