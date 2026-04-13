"use client";

import { useMemo, useState } from "react";

export default function OptionMenuPage() {
  const [selectedMag, setSelectedMag] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedHead, setSelectedHead] = useState(false);

  const totalPrice = useMemo(() => {
    return (
      (selectedMag ? 1000 : 0) +
      (selectedShape === "shape-1" ? 2000 : 0) +
      (selectedShape === "shape-2" ? 3500 : 0) +
      (selectedShape === "shape-3" ? 5000 : 0) +
      (selectedHead ? 3000 : 0)
    );
  }, [selectedMag, selectedShape, selectedHead]);

  const totalMinutes = useMemo(() => {
    return (
      (selectedShape === "shape-1" ? 20 : 0) +
      (selectedShape === "shape-2" ? 40 : 0) +
      (selectedShape === "shape-3" ? 60 : 0) +
      (selectedHead ? 30 : 0)
    );
  }, [selectedShape, selectedHead]);

  const handleMagSelect = () => {
    setSelectedMag((prev) => !prev);
  };

  const handleShapeSelect = (id) => {
    setSelectedShape((prev) => (prev === id ? null : id));
  };

  const handleHeadSelect = () => {
    setSelectedHead((prev) => !prev);
  };

  const optionButtonStyle = (selected) => ({
    width: "100%",
    borderRadius: "18px",
    border: selected
      ? "1.8px solid rgba(221, 121, 111, 0.95)"
      : "1.2px solid rgba(144, 106, 88, 0.22)",
    background: selected
      ? "linear-gradient(180deg, rgba(245, 151, 138, 0.96) 0%, rgba(234, 124, 111, 0.95) 100%)"
      : "rgba(255, 255, 255, 0.34)",
    color: selected ? "#fffaf7" : "#6a4738",
    padding: "12px 14px",
    boxSizing: "border-box",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    boxShadow: selected
      ? "0 8px 18px rgba(219, 125, 114, 0.24)"
      : "0 4px 10px rgba(90, 58, 44, 0.06)",
    transition: "all 0.2s ease",
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.04em",
  });

  return (
    <main style={styles.page}>
      <div style={styles.phone}>
        <div style={styles.scrollArea}>
          <div style={styles.headerArea}>
            <p style={styles.headerSub}>OPTION MENU</p>
            <h1 style={styles.headerTitle}>オプション選択</h1>
            <p style={styles.headerText}>
              気になる箇所やお悩みに合わせて、
              <br />
              ご希望のオプションをお選びいただけます。
            </p>
          </div>

          <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・マグクリーム（塗布）</h2>
            <div style={styles.priceLine}>1部位　1000円</div>
            <p style={styles.description}>
              お辛い箇所に塗布し、筋肉をゆるめコリ、ハリの緩和と疲労回復を促します。
            </p>

            <button
              type="button"
              onClick={handleMagSelect}
              style={optionButtonStyle(selectedMag)}
            >
              {selectedMag ? "選択中" : "選択する"}
            </button>
          </section>

          <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・巡りシェイプケア</h2>
            <p style={styles.description}>
              冷え、むくみ、セルライトなどの気になる箇所を、
              温めたマグバームとオイルでしっかり流して柔らかくスッキリ整えます。
            </p>

            <div style={styles.choiceCard}>
              <div style={styles.choiceTopRow}>
                <div style={styles.choiceName}>1部位　2000円</div>
                <div style={styles.choiceTime}>約20分</div>
              </div>
              <p style={styles.choiceDescription}>
                気になる箇所をピンポイントで！
              </p>
              <button
                type="button"
                onClick={() => handleShapeSelect("shape-1")}
                style={optionButtonStyle(selectedShape === "shape-1")}
              >
                {selectedShape === "shape-1" ? "選択中" : "選択する"}
              </button>
            </div>

            <div style={styles.choiceCard}>
              <div style={styles.choiceTopRow}>
                <div style={styles.choiceName}>2部位　3500円</div>
                <div style={styles.choiceTime}>約40分</div>
              </div>
              <p style={styles.choiceDescription}>
                お腹+気になる部位、がオススメです。
              </p>
              <button
                type="button"
                onClick={() => handleShapeSelect("shape-2")}
                style={optionButtonStyle(selectedShape === "shape-2")}
              >
                {selectedShape === "shape-2" ? "選択中" : "選択する"}
              </button>
            </div>

            <div style={styles.choiceCardLast}>
              <div style={styles.choiceTopRow}>
                <div style={styles.choiceName}>3部位　5000円</div>
                <div style={styles.choiceTime}>約60分</div>
              </div>
              <p style={styles.choiceDescription}>
                60分しっかり流したい方へ。
              </p>
              <button
                type="button"
                onClick={() => handleShapeSelect("shape-3")}
                style={optionButtonStyle(selectedShape === "shape-3")}
              >
                {selectedShape === "shape-3" ? "選択中" : "選択する"}
              </button>
            </div>
          </section>

          <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・頭部解放（頭蓋筋膜リリース）</h2>
            <div style={styles.priceLine}>30分　3000円</div>
            <p style={styles.description}>
              噛みしめ、眼精疲労、頭痛、お顔周りのコリ、むくみやフェイスラインが気になる方に。
              <br />
              マグバーム・マッサージクリームを使用し、お顔と頭蓋の骨、筋膜、筋肉にしっかりアプローチしながら頭部ケアを行います。
              <br />
              （痛みの少ない手技でゆるめます）
            </p>

            <button
              type="button"
              onClick={handleHeadSelect}
              style={optionButtonStyle(selectedHead)}
            >
              {selectedHead ? "選択中" : "選択する"}
            </button>
          </section>

          <section style={styles.summaryBox}>
            <h3 style={styles.summaryTitle}>選択中のオプション</h3>

            <div style={styles.summaryList}>
              {selectedMag || selectedShape || selectedHead ? (
                <>
                  {selectedMag && <div>・マグクリーム（塗布）</div>}
                  {selectedShape === "shape-1" && (
                    <div>・巡りシェイプケア（1部位）</div>
                  )}
                  {selectedShape === "shape-2" && (
                    <div>・巡りシェイプケア（2部位）</div>
                  )}
                  {selectedShape === "shape-3" && (
                    <div>・巡りシェイプケア（3部位）</div>
                  )}
                  {selectedHead && (
                    <div>・頭部解放（頭蓋筋膜リリース）</div>
                  )}
                </>
              ) : (
                <div>現在オプションは選択されていません。</div>
              )}
            </div>

            <div style={styles.summaryBottom}>
              <div>
                <div style={styles.summaryLabel}>合計金額</div>
                <div style={styles.summaryPrice}>
                  {totalPrice.toLocaleString()}円
                </div>
              </div>

              <div style={styles.summaryRight}>
                <div style={styles.summaryLabel}>合計目安時間</div>
                <div style={styles.summaryMinutes}>約{totalMinutes}分</div>
              </div>
            </div>

            <button type="button" style={styles.nextButton}>
              この内容で次へ
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: "url('/images/option.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 12px 40px",
    boxSizing: "border-box",
  },

  phone: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "calc(100vh - 48px)",
    background: "rgba(255, 248, 246, 0.52)",
    borderRadius: "28px",
    border: "1px solid rgba(255, 255, 255, 0.34)",
    boxShadow: "0 10px 30px rgba(90, 58, 44, 0.14)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    overflow: "hidden",
  },

  scrollArea: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    padding: "26px 18px 34px",
    boxSizing: "border-box",
    scrollbarWidth: "thin",
  },

  headerArea: {
    marginBottom: "20px",
  },

  headerSub: {
    fontSize: "12px",
    color: "#9b7b78",
    letterSpacing: "0.18em",
    margin: 0,
    fontWeight: 600,
  },

  headerTitle: {
    fontSize: "28px",
    color: "#5a3a2c",
    margin: "8px 0 8px",
    lineHeight: 1.3,
    fontWeight: 700,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  headerText: {
    fontSize: "13px",
    lineHeight: 1.8,
    color: "rgba(90, 58, 44, 0.84)",
    margin: 0,
  },

  block: {
    background: "rgba(255, 255, 255, 0.44)",
    border: "1px solid rgba(155, 120, 94, 0.14)",
    borderRadius: "20px",
    padding: "16px",
    marginBottom: "14px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#5a3a2c",
    letterSpacing: "0.04em",
    margin: "0 0 8px 0",
    lineHeight: 1.5,
  },

  priceLine: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#7b5a47",
    marginBottom: "8px",
    lineHeight: 1.5,
  },

  description: {
    fontSize: "13px",
    lineHeight: 1.85,
    color: "rgba(90, 58, 44, 0.82)",
    margin: "0 0 12px 0",
  },

  choiceCard: {
    background: "rgba(255, 255, 255, 0.26)",
    border: "1px solid rgba(144, 106, 88, 0.10)",
    borderRadius: "16px",
    padding: "12px",
    marginTop: "12px",
    boxSizing: "border-box",
  },

  choiceCardLast: {
    background: "rgba(255, 255, 255, 0.26)",
    border: "1px solid rgba(144, 106, 88, 0.10)",
    borderRadius: "16px",
    padding: "12px",
    marginTop: "12px",
    boxSizing: "border-box",
  },

  choiceTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "6px",
  },

  choiceName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#5a3a2c",
    lineHeight: 1.4,
  },

  choiceTime: {
    fontSize: "12px",
    fontWeight: 700,
    color: "rgba(123, 90, 71, 0.86)",
    whiteSpace: "nowrap",
  },

  choiceDescription: {
    margin: "0 0 10px 0",
    fontSize: "12px",
    lineHeight: 1.75,
    color: "rgba(90, 58, 44, 0.78)",
  },

  summaryBox: {
    marginTop: "18px",
    background: "rgba(255, 245, 247, 0.58)",
    border: "1px solid rgba(140, 106, 83, 0.16)",
    borderRadius: "22px",
    padding: "16px",
    boxSizing: "border-box",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  summaryTitle: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: "#5a3a2c",
  },

  summaryList: {
    fontSize: "13px",
    lineHeight: 1.9,
    color: "rgba(90, 58, 44, 0.84)",
  },

  summaryBottom: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(140, 106, 83, 0.14)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  summaryLabel: {
    fontSize: "12px",
    color: "rgba(90, 58, 44, 0.66)",
    marginBottom: "2px",
  },

  summaryPrice: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#5a3a2c",
  },

  summaryRight: {
    textAlign: "right",
  },

  summaryMinutes: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#5a3a2c",
  },

  nextButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    padding: "14px 16px",
    marginTop: "14px",
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#fffaf7",
    background:
      "linear-gradient(180deg, rgba(242, 144, 130, 0.98) 0%, rgba(230, 117, 104, 0.98) 100%)",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(224, 123, 111, 0.24)",
  },
};
