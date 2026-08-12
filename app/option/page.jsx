"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const USER_STORAGE_KEY = "sakurakuUser";

function OptionMenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSpa, setSelectedSpa] = useState(false);
  const [selectedMag, setSelectedMag] = useState(false);
  const [selectedToksen, setSelectedToksen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedHead, setSelectedHead] = useState(false);
  const [selectedkenkou, setSelectedkenkou] = useState(false);

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
      (selectedSpa ? 500 : 0) +
      (selectedMag ? 1000 : 0) +
      (selectedToksen ? 1000 : 0) +
      (selectedShape === "shape-30" ? 4000 : 0) +
      (selectedShape === "shape-60" ? 6500 : 0) +
      (selectedHead ? 3000 : 0) +
      (selectedkenkou ? 3000 : 0)
    );
  }, [selectedSpa, selectedMag, selectedToksen, selectedShape, selectedHead, selectedkenkou]);

  const totalMinutes = useMemo(() => {
    return (
      (selectedShape === "shape-30" ? 30 : 0) +
      (selectedShape === "shape-60" ? 60 : 0) +
      (selectedHead ? 30 : 0) +
      (selectedkenkou ? 30 : 0)
    );
  }, [selectedShape, selectedHead, selectedkenkou]);

  const handleBack = () => {
    router.back();
  };

    const handleSpaSelect = () => {
    setSelectedSpa((prev) => !prev);
  };

  const handleMagSelect = () => {
    setSelectedMag((prev) => !prev);
  };

  const handleToksenSelect = () => {
  setSelectedToksen((prev) => !prev);
};
  
  const handleShapeSelect = (id) => {
    setSelectedShape((prev) => (prev === id ? null : id));
  };

  const handleHeadSelect = () => {
    setSelectedHead((prev) => !prev);
  };
  
  const handlekenkouSelect = () => {
    setSelectedkenkou((prev) => !prev);
  };


  const handleNext = () => {
    const courseId = searchParams.get("courseId") || "";
    const courseName = searchParams.get("courseName") || "整体コース";
    const duration = searchParams.get("duration") || "60";
    const price = searchParams.get("price") || "";
    const type = searchParams.get("type") || "seitai";

    const selectedOptions = [];
    if (selectedSpa) selectedOptions.push("炭酸ヘッドスパ");   
    if (selectedMag) selectedOptions.push("マグクリーム（塗布）");
    if (selectedToksen) selectedOptions.push("トークセン");
    if (selectedShape === "shape-30") {
      selectedOptions.push("マグバーム＆ホットストーン（30分）");
    }
    if (selectedShape === "shape-60") {
      selectedOptions.push("マグバーム＆ホットストーン（60分）");
    }
    if (selectedHead) selectedOptions.push("頭部解放");
    if (selectedkenkou) selectedOptions.push("肩甲骨はがし");

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
      <div style={styles.contentWrap}>
        <button type="button" onClick={handleBack} style={styles.backButton}>
          ⇦戻る
        </button>

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
            <h2 style={styles.sectionTitle}>・炭酸ヘッドスパ
              <span 
                style={{
                  ...styles.subTitle,
              color: "#e68a7a",
                }}
                >
                　＼期間限定／
              </span>
              
            </h2>
            <div style={styles.priceLine}>　　500円</div>
            <p style={styles.description}>
              パチパチの炭酸泡で夏の暑さを撃退！
              <br />
              ヘアカラーやブリーチ後の髪・頭皮ケアにも◎
            </p>

            <button
              type="button"
              onClick={handleSpaSelect}
              style={optionButtonStyle(selectedSpa)}
            >
              {selectedSpa ? "選択中" : "選択する"}
            </button>
          </section>

          <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・マグクリーム
              <span style={styles.subTitle}>（塗布）</span>
            </h2>
            <div style={styles.priceLine}>1部位　1000円</div>
            <p style={styles.description}>
              お辛い箇所の筋肉をゆるめ、コリの緩和と疲労回復に◎
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
            <h2 style={styles.sectionTitle}>・トークセン
               <span style={styles.subTitle}> (整体施術に追加)</span>
               </h2>
            <div style={styles.priceLine}>　　1000円</div>
            <p style={styles.description}>
              慢性的なお身体のコリ、緊張型のお身体に◎
            </p>

            <button
              type="button"
              onClick={handleToksenSelect}
              style={optionButtonStyle(selectedToksen)}
            >
              {selectedToksen ? "選択中" : "選択する"}
            </button>
          </section>

          <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・マグバーム＆ホットストーン</h2>
            <p style={styles.description}>
              冷え、むくみ、セルライトなどの気になる箇所を温め、マグバームオイルでしっかり流すシェイプケア
            </p>

            <div style={styles.choiceCard}>
              <div style={styles.choiceTopRow}>
                <div style={styles.choiceName}>30分　4000円</div>
              </div>
              <p style={styles.choiceDescription}>
                気になる部位を集中的に
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
                <div style={styles.choiceName}>60分　6500円</div>
              </div>
              <p style={styles.choiceDescription}>
                ☆ 色んな部位をしっかり流したい方におすすめ◎
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
            <h2 style={styles.sectionTitle}>・頭部解放</h2>
            <div style={styles.priceLine}>30分　3000円</div>
            <p style={styles.description}>
              噛みしめ、眼精疲労、頭痛、お顔周りのコリやむくみ、フェイスラインが気になる方に。
              <br />
              お顔と頭蓋を筋膜リリース＆骨格調整して整えます。
            </p>

            <button
              type="button"
              onClick={handleHeadSelect}
              style={optionButtonStyle(selectedHead)}
            >
              {selectedHead ? "選択中" : "選択する"}
            </button>
          </section>

           <section style={styles.block}>
            <h2 style={styles.sectionTitle}>・肩甲骨はがし</h2>
            <div style={styles.priceLine}>30分　3000円</div>
            <p style={styles.description}>
              横向き施術で胸筋～肩甲骨周囲をしっかり緩めて
              <br />
              上半身の姿勢・バランスを整えます。
              <br />
              慢性的な巻き肩、四十肩、反り腰などに◎
            </p>

            <button
              type="button"
              onClick={handlekenkouSelect}
              style={optionButtonStyle(selectedkenkou)}
            >
              {selectedkenkou ? "選択中" : "選択する"}
            </button>
          </section>
          
          <section style={styles.summaryBox}>
            <h3 style={styles.summaryTitle}>選択中のオプション</h3>

            <div style={styles.summaryList}>
              {selectedSpa || selectedMag || selectedToksen || selectedShape || selectedHead || selectedkenkou ? (
                <>
                  {selectedSpa && <div>・炭酸ヘッドスパ（＼期間限定／）</div>}
                  {selectedMag && <div>・マグクリーム（塗布）</div>}
                  {selectedToksen && <div>・トークセン </div>}
                  {selectedShape === "shape-30" && (
                    <div>・マグバーム＆ホットストーン（30分）</div>
                  )}
                  {selectedShape === "shape-60" && (
                    <div>・マグバーム＆ホットストーン（60分）</div>
                  )}
                  {selectedHead && (
                    <div>・頭部解放</div>
                  )}
                  {selectedkenkou && (
                    <div>・肩甲骨はがし</div>
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
    padding: "0 20px 52px",
    boxSizing: "border-box",
  },

  contentWrap: {
    width: "100%",
    maxWidth: "400px",
    position: "relative",
    paddingTop: "34px",
    boxSizing: "border-box",
  },

  backButton: {
    position: "absolute",
    top: "8px",
    left: "0",
    zIndex: 5,
    border: "none",
    background: "transparent",
    color: "rgba(90, 58, 44, 0.86)",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    padding: "0",
    cursor: "pointer",
    letterSpacing: "0.04em",
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
  display: "flex",
  flexDirection: "column",
},

scrollArea: {
  width: "100%",
  flex: 1,
  overflowY: "auto",
  padding: "24px 16px 32px",
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
  
subTitle: {
  fontSize: "0.8em",
  fontWeight: 400,
  color: "#8b7b73",
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
