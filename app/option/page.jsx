"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const USER_STORAGE_KEY = "sakurakuUser";

function OptionMenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMag, setSelectedMag] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedHead, setSelectedHead] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (!savedUser) {
        router.push("/register");
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (!parsedUser?.isLoggedIn) {
        router.push("/register");
      }
    } catch (error) {
      console.error("お客様情報の読み込みに失敗しました", error);
      router.push("/register");
    }
  }, [router]);

  const totalPrice = useMemo(() => {
    return (
      (selectedMag ? 1000 : 0) +
      (selectedShape === "shape-30" ? 3000 : 0) +
      (selectedShape === "shape-60" ? 5000 : 0) +
      (selectedHead ? 3000 : 0)
    );
  }, [selectedMag, selectedShape, selectedHead]);

  const totalMinutes = useMemo(() => {
    return (
      (selectedShape === "shape-30" ? 30 : 0) +
      (selectedShape === "shape-60" ? 60 : 0) +
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

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    const courseId = searchParams.get("courseId") || "";
    const courseName = searchParams.get("courseName") || "整体コース";
    const duration = searchParams.get("duration") || "60";
    const price = searchParams.get("price") || "";
    const type = searchParams.get("type") || "seitai";

    const selectedOptions = [];
    if (selectedMag) selectedOptions.push("マグクリーム（塗布）");
    if (selectedShape === "shape-30") {
      selectedOptions.push("巡りシェイプケア（30分）");
    }
    if (selectedShape === "shape-60") {
      selectedOptions.push("巡りシェイプケア（60分）");
    }
    if (selectedHead) selectedOptions.push("頭部解放（頭蓋筋膜リリース）");

    const params = new URLSearchParams({
      courseId,
      courseName,
      duration,
      price,
      type,
      optionMinutes: String(totalMinutes),
      optionPrice: String(totalPrice),
      selectedOptions: selectedOptions.join("、"),
    });

    router.push(`/reserve/datetime?${params.toString()}`);
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
          <button type="button" onClick={handleBack} style={styles.backButton}>
            ⇦戻る
          </button>

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
            <h2 style={styles.sectionTitle}>・オプションなし</h2>
            <p style={styles.description}>
              整体コースのみご予約の方はこちら↓
            </p>

            <button
              type="button"
              onClick={handleNext}
              style={styles.skipButton}
            >
              このまま次へ進む
            </button>
          </section>

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
              マグバームとホットオイルでしっかり流して柔らかく整えます。
            </p>

            <div style={styles.choiceCard}>
              <div style={styles.choiceTopRow}>
                <div style={styles.choiceName}>30分　3000円</div>
                <div style={styles.choiceTime}>約30分</div>
              </div>
              <p style={styles.choiceDescription}>
                気になる箇所を集中的に。
              </p>
              <button
                type="button"
                onClick={() => handleShapeSelect("shape-30")}
                style={optionButtonStyle(selectedShape === "shape-30")}
              >
                {selectedShape === "shape-30" ? "選択中" : "選択する"}
              </button>
            </div>

            <div style={styles.choiceCardLast}>
              <div style={styles.choiceTopRow}>
                <div style={styles.choiceName}>60分　5000円</div>
                <div style={styles.choiceTime}>約60分</div>
              </div>
              <p style={styles.choiceDescription}>
                ☆ 全身しっかり流したい方におすすめ。
              </p>
              <button
                type="button"
                onClick={() => handleShapeSelect("shape-60")}
                style={optionButtonStyle(selectedShape === "shape-60")}
              >
                {selectedShape === "shape-60" ? "選択中" : "選択する"}
              </button>
            </div>
          </section>

          <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・頭部解放（頭蓋筋膜リリース）</h2>
            <div style={styles.priceLine}>30分　3000円</div>
            <p style={styles.description}>
              噛みしめ、眼精疲労、頭痛、お顔周りのコリ、むくみやフェイスラインが気になる方に。
              <br />
              マグバーム・クリームを使用し、お顔と頭部の筋膜、筋肉をしっかりほぐします。
              <br />
              （痛みの少ない手技で行います）
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
                  {selectedShape === "shape-30" && (
                    <div>・巡りシェイプケア（30分）</div>
                  )}
                  {selectedShape === "shape-60" && (
                    <div>・巡りシェイプケア（60分）</div>
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

            <button
              type="button"
              onClick={handleNext}
              style={styles.nextButton}
            >
              この内容で次へ
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function OptionMenuPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <OptionMenuContent />
    </Suspense>
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
    padding: "36px 20px 52px",
    boxSizing: "border-box",
  },

  phone: {
    width: "100%",
    maxWidth: "400px",
    minHeight: "calc(100vh - 72px)",
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
    padding: "24px 16px 32px",
    boxSizing: "border-box",
    scrollbarWidth: "thin",
  },

  backButton: {
    border: "none",
    background: "transparent",
    color: "rgba(90, 58, 44, 0.82)",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    padding: "0",
    margin: "0 0 14px 0",
    cursor: "pointer",
    letterSpacing: "0.04em",
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

  skipButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    padding: "14px 16px",
    marginTop: "4px",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#fffaf7",
    background:
      "linear-gradient(180deg, rgba(190, 141, 121, 0.96) 0%, rgba(163, 116, 97, 0.96) 100%)",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(140, 106, 83, 0.18)",
  },
};
