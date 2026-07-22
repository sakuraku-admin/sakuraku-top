export const metadata = {
  title: "さく楽便り｜プライベート整体サロン さく楽",
  description: "さく楽からのキャンペーンや最新のお知らせです。",
};

/*
  表示したい画像のファイル名をここに書きます。

  上に書いた画像から順番に表示されます。
  1枚だけなら、1つだけ書けばOKです。
*/
const DAYORI_IMAGES = [
  "dayori-0701.png",
  "dayori-0702.png",
];

export default function DayoriPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>さく楽便り</h1>

          <div style={styles.titleDivider}>
            <span style={styles.line} />
            <span style={styles.leaf}>🍃</span>
            <span style={styles.line} />
          </div>

          <p style={styles.introduction}>
            さく楽からの季節のお知らせや
            <br />
            キャンペーンのご案内です。
          </p>
        </header>

        {DAYORI_IMAGES.map((image, index) => (
          <div key={image}>
            <img
              src={`/images/${image}`}
              alt={`さく楽からのお知らせ ${index + 1}`}
              style={styles.image}
            />

            {index < DAYORI_IMAGES.length - 1 && (
              <div style={styles.divider}>
                <span style={styles.line} />
                <span style={styles.leaf}>🍃</span>
                <span style={styles.line} />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "24px 12px 48px",
    backgroundColor: "#fffaf7",
  },

  container: {
    width: "100%",
    maxWidth: "820px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "28px",
    textAlign: "center",
  },

  title: {
    margin: "0",
    color: "#68564d",
    fontSize: "32px",
    fontWeight: "500",
    letterSpacing: "0.12em",
  },

  titleDivider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "240px",
    maxWidth: "75%",
    margin: "16px auto",
  },

  introduction: {
    margin: "0",
    color: "#806f66",
    fontSize: "14px",
    lineHeight: "1.8",
  },

  image: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(100, 73, 61, 0.12)",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "360px",
    maxWidth: "75%",
    margin: "30px auto",
  },

  line: {
    flex: "1",
    height: "1px",
    backgroundColor: "#d9bfb7",
  },

  leaf: {
    color: "#8c9d7e",
    fontSize: "20px",
    lineHeight: "1",
  },
};
