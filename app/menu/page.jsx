"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    id: "seitai-60",
    type: "seitai",
    categoryLabel: "整体コース",
    name: "60分",
    duration: "60分",
    price: "5000円",
    shortDescription: "定期的なお身体のケアに",
    descriptionLines: [
      "お辛い箇所を中心にほぐし整え、",
      "日々のお疲れをやさしく解消していくコース",
    ],
    teaText: "アフターティー付き",
  },
  {
    id: "seitai-90",
    type: "seitai",
    categoryLabel: "整体コース",
    name: "90分",
    duration: "90分",
    price: "7000円",
    shortDescription: "ゆったり整えたい方に",
    descriptionLines: [
      "60分では足りない慢性的なお疲れや不調に対して、",
      "全身のバランスを見ながら丁寧に整えていく人気コース",
    ],
    teaText: "アフターティー付き",
  },
  {
    id: "seitai-120",
    type: "seitai",
    categoryLabel: "整体コース",
    name: "120分",
    duration: "120分",
    price: "9000円",
    shortDescription: "より深く、しっかり整えたい方に",
    descriptionLines: [
      "整体・ストレッチ・筋膜リリース・自律神経ケアなど、お顔・頭を含めた全身を深く整えていく充実のコース",
    ],
    teaText: "アフターティー付き",
  },
  {
    id: "shinsei-kaifuku",
    type: "shinsei",
    categoryLabel: "深整コース［回復］",
    name: "回復",
    duration: "90分",
    price: "9000円",
    shortDescription: "お疲れ・お辛い箇所の集中ケアに",
    featureRows: [
      [
        { text: "整体", color: "#8fb8c4" },
        { text: "オイル", color: "#f1b15d" },
        { text: "マグバーム", color: "#f08aa2" },
        { text: "ホットストーン", color: "#d9877d" },
        { text: "よもぎ蒸しパッド", color: "#78c488" },
      ],
    ],
    customAdjustLines: [
      "お身体の状態に合わせて、最適な組み合わせで施術を行います。",
      "ご希望に応じて施術内容を柔軟に調整いたします。",
    ],
    descriptionLines: [
      "慢性的なお疲れや痛みにアプローチし、",
      "お身体の回復をしっかりと促していく特別コース",
      "お久しぶりの方にも◎",
    ],
    teaText: "ウェルカム／アフターティー付き",
  },
  {
    id: "shinsei-onjun",
    type: "shinsei",
    categoryLabel: "深整コース［温巡］",
    name: "温巡",
    duration: "120分",
    price: "12000円",
    shortDescription: "しっかり温め、巡らせる深部ケアに",
    featureRows: [
      [
        { text: "整体", color: "#8fb8c4" },
        { text: "オイル", color: "#f1b15d" },
        { text: "マグバーム", color: "#f08aa2" },
        { text: "ホットストーン", color: "#d9877d" },
        { text: "よもぎ蒸しパッド", color: "#78c488" },
      ],
    ],
    customAdjustLines: [
      "お身体の状態に合わせて、最適な組み合わせで施術を行います。",
      "ご希望に応じて施術内容を柔軟に調整いたします。",
    ],
    descriptionLines: [
      "お身体の状態に合わせて全身を温め・巡らせ・深部からゆるめて整える",
      "深整コースをしっかり味わいたい方におすすめのコース",
    ],
    teaText: "ウェルカム／アフターティー付き",
    recommend: true,
  },
  {
    id: "shinsei-kaihou",
    type: "shinsei",
    categoryLabel: "深整コース［解放］",
    name: "解放",
    duration: "180分",
    price: "19800円",
    shortDescription: "全身フルケア、特別なひとときを",
    featureRows: [
      [
        { text: "整体", color: "#8fb8c4" },
        { text: "オイル", color: "#f1b15d" },
        { text: "マグバーム", color: "#f08aa2" },
        { text: "ホットストーン", color: "#d9877d" },
        { text: "よもぎ蒸しパッド", color: "#78c488" },
      ],
      [
        { text: "アイマスク", color: "#9ab7ee" },
        { text: "発汗シート", color: "#e7a36f" },
        { text: "ホットタオル", color: "#b99ae7" },
        { text: "美容マスク", color: "#81c9c9" },
      ],
    ],
    customAdjustLines: [
      "お身体の状態に合わせて、最適な組み合わせで施術を行います。",
      "ご希望に応じて施術内容を柔軟に調整いたします。",
    ],
    descriptionLines: [
      "全身のお辛い箇所やむくみ、疲労をオールハンドで",
      "丁寧にアプローチし、お顔・頭を含めた全身を",
      "リセットできる贅沢フルケアコース",
      "自分へのご褒美や特別なケアに◎",
    ],
    teaText: "ウェルカム／アフターティー付き",
  },
];

export default function MenuPage() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showFirstCoursePopup, setShowFirstCoursePopup] = useState(false);

  const seitaiMenus = useMemo(
    () => menuItems.filter((item) => item.type === "seitai"),
    []
  );

  const shinseiMenus = useMemo(
    () => menuItems.filter((item) => item.type === "shinsei"),
    []
  );

  const closePopup = () => setSelectedMenu(null);

  const handleReserve = () => {
    if (!selectedMenu) return;

    const params = new URLSearchParams({
      courseId: selectedMenu.id,
      courseName: selectedMenu.name,
      duration: selectedMenu.duration,
      price: selectedMenu.price,
      type: selectedMenu.type,
    });

    if (selectedMenu.type === "seitai") {
      router.push(`/options?${params.toString()}`);
      return;
    }

    router.push(`/calendar?${params.toString()}`);
  };

  return (
    <>
      <div style={styles.page}>
        <div style={styles.canvas}>
          <div style={styles.title}>コースメニュー</div>
          <div style={styles.frame} />

          <div style={styles.scrollArea}>
            <div style={styles.scrollInner}>
              <button
                type="button"
                onClick={() => setShowFirstCoursePopup(true)}
                style={styles.firstCourseBannerButton}
                aria-label="初回限定コースの詳細を見る"
              >
                <img
                  src="/images/banner-syokai.png"
                  alt="初回限定コース"
                  style={styles.firstCourseBanner}
                />
              </button>

              <div style={styles.sectionGapSmall} />

              <img
                src="/images/banner-seitai.png"
                alt="整体コース"
                style={styles.sectionBanner}
              />

              <div style={styles.buttonGroup}>
                {seitaiMenus.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMenu(item)}
                    style={styles.menuButton}
                  >
                    <span style={styles.menuButtonText}>{item.name}</span>
                  </button>
                ))}
              </div>

              <div style={styles.sectionGap} />

              <img
                src="/images/banner-shinsei.png"
                alt="深整コース"
                style={styles.sectionBanner}
              />

              <div style={styles.buttonGroup}>
                {shinseiMenus.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMenu(item)}
                    style={styles.menuButton}
                  >
                    <div style={styles.buttonInner}>
                      <span
                        style={{
                          ...styles.deepMenuName,
                          ...(item.name === "回復" ? styles.deepKaifuku : {}),
                          ...(item.name === "温巡" ? styles.deepOnjun : {}),
                          ...(item.name === "解放" ? styles.deepKaihou : {}),
                        }}
                      >
                        {item.name}
                      </span>

                      <span style={styles.deepDuration}>（{item.duration}）</span>
                    </div>

                    {item.recommend && <span style={styles.star}>★</span>}
                  </button>
                ))}
              </div>

              <div style={styles.bottomSpacer} />
            </div>
          </div>
        </div>
      </div>

      {selectedMenu && (
        <div style={styles.overlay} onClick={closePopup}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closePopup}
              style={styles.closeButton}
              aria-label="閉じる"
            >
              ×
            </button>

            <div style={styles.popupHeader}>
              <div style={styles.popupHeaderLabel}>
                {selectedMenu.categoryLabel}
              </div>
            </div>

            <div style={styles.popupMainCard}>
              <div style={styles.popupTopRow}>
                <div style={styles.popupDuration}>{selectedMenu.duration}</div>
                <div style={styles.popupPrice}>{selectedMenu.price}</div>
              </div>

              <div style={styles.popupShortDescription}>
                {selectedMenu.shortDescription}
              </div>
            </div>

            {selectedMenu.featureRows && (
              <div style={styles.popupFeatureBlock}>
                {selectedMenu.featureRows.map((row, rowIndex) => (
                  <div key={rowIndex} style={styles.popupFeatureRow}>
                    <span style={styles.popupFeatureBracket}>【</span>

                    {row.map((feature, featureIndex) => (
                      <span key={featureIndex} style={styles.popupFeatureItem}>
                        <span
                          style={{
                            ...styles.popupFeatureLabel,
                            color: feature.color,
                          }}
                        >
                          {feature.text}
                        </span>
                        {featureIndex !== row.length - 1 && (
                          <span style={styles.popupFeatureSpacer}>　</span>
                        )}
                      </span>
                    ))}

                    <span style={styles.popupFeatureBracket}>】</span>
                  </div>
                ))}

                {selectedMenu.customAdjustLines && (
                  <div style={styles.popupCustomAdjustNote}>
                    {selectedMenu.customAdjustLines.map((line, index) => (
                      <div key={index} style={styles.popupCustomAdjustLine}>
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={styles.popupDescriptionWrap}>
              <div style={styles.popupDescriptionGradientTop} />
              <div style={styles.popupDescriptionPanel}>
                <div style={styles.popupDescription}>
                  {selectedMenu.descriptionLines.map((line, index) => (
                    <div key={index} style={styles.popupDescriptionLine}>
                      {line}
                    </div>
                  ))}
                </div>

                <div style={styles.popupTea}>{selectedMenu.teaText}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReserve}
              style={styles.reserveButton}
            >
              このメニューで予約する
            </button>
          </div>
        </div>
      )}

      {showFirstCoursePopup && (
        <div
          style={styles.overlay}
          onClick={() => setShowFirstCoursePopup(false)}
        >
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowFirstCoursePopup(false)}
              style={styles.closeButton}
              aria-label="閉じる"
            >
              ×
            </button>

            <div style={styles.popupHeader}>
              <div style={styles.popupHeaderLabel}>初回限定コース</div>
            </div>

            <div style={styles.popupMainCard}>
              <div style={styles.popupTopRow}>
                <div style={styles.popupDuration}>100分</div>
                <div style={styles.popupPrice}>5000円</div>
              </div>

              <div style={styles.popupShortDescription}>
                初回の方はこちらをお選び下さい。
              </div>
            </div>

            <div style={styles.popupDescription}>
              <div style={styles.popupDescriptionLine}>
                ※カウンセリング等のお時間を含みます。
              </div>
            </div>

            <div style={styles.popupTea}>
              ウェルカム／アフターティー付
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundImage: 'url("/images/mokume.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "24px 12px 40px",
    boxSizing: "border-box",
  },

  canvas: {
    position: "relative",
    width: "100%",
    maxWidth: "560px",
    aspectRatio: "900 / 1600",
    overflow: "hidden",
  },

  title: {
    position: "absolute",
    top: "0.9%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    textAlign: "center",
    fontSize: "clamp(28px, 4.6vw, 42px)",
    lineHeight: 1.2,
    letterSpacing: "0.12em",
    color: "#2f2018",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    zIndex: 2,
    pointerEvents: "none",
  },

  frame: {
    position: "absolute",
    left: "13.7%",
    top: "5.8%",
    width: "72.8%",
    height: "86.2%",
    borderRadius: "22px",
    border: "1px solid rgba(255, 255, 255, 0.52)",
    background: "rgba(255, 255, 255, 0.08)",
    boxSizing: "border-box",
    pointerEvents: "none",
    zIndex: 1,
  },

  scrollArea: {
    position: "absolute",
    left: "15.8%",
    top: "8.4%",
    width: "71.5%",
    height: "82.5%",
    overflowY: "auto",
    overflowX: "hidden",
    background: "transparent",
    boxSizing: "border-box",
    paddingRight: "4px",
    scrollbarWidth: "thin",
    zIndex: 2,
  },

  scrollInner: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 0 26px",
    boxSizing: "border-box",
  },

  firstCourseBannerButton: {
    width: "97%",
    display: "block",
    margin: "0 auto",
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  firstCourseBanner: {
    width: "100%",
    display: "block",
    userSelect: "none",
  },

  sectionBanner: {
    width: "97%",
    display: "block",
    margin: "0 auto 16px",
    userSelect: "none",
    pointerEvents: "none",
  },

  buttonGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
    marginBottom: "0",
  },

  sectionGapSmall: {
    height: "18px",
  },

  sectionGap: {
    height: "34px",
  },

  bottomSpacer: {
    height: "18px",
  },

  menuButton: {
    position: "relative",
    width: "92%",
    minHeight: "66px",
    borderRadius: "16px",
    border: "1px solid rgba(120, 82, 69, 0.26)",
    background: "rgba(255, 222, 222, 0.30)",
    boxShadow:
      "0 5px 12px rgba(90, 58, 44, 0.12), inset 0 1px 0 rgba(255,255,255,0.42)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "14px 12px",
    boxSizing: "border-box",
    backdropFilter: "blur(0.5px)",
    WebkitBackdropFilter: "blur(0.5px)",
  },

  menuButtonText: {
    fontSize: "clamp(24px, 3.5vw, 34px)",
    lineHeight: 1.1,
    letterSpacing: "0.16em",
    color: "#46312a",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  buttonInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },

  deepMenuName: {
    fontSize: "clamp(23px, 3.3vw, 31px)",
    lineHeight: 1.1,
    color: "#ffffff",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.06em",
  },

  deepKaifuku: {
    color: "#ffffff",
    textShadow:
      "0 0 2px rgba(255,255,255,0.95), 0 0 6px rgba(125, 223, 209, 0.95), 0 0 12px rgba(99, 193, 182, 0.85)",
  },

  deepOnjun: {
    color: "#ffffff",
    textShadow:
      "0 0 2px rgba(255,255,255,0.95), 0 0 6px rgba(255, 139, 128, 0.95), 0 0 12px rgba(235, 106, 96, 0.88)",
  },

  deepKaihou: {
    color: "#ffffff",
    textShadow:
      "0 0 2px rgba(255,255,255,0.95), 0 0 6px rgba(140, 228, 255, 0.95), 0 0 12px rgba(107, 199, 241, 0.88)",
  },

  deepDuration: {
    fontSize: "clamp(20px, 2.9vw, 27px)",
    color: "#46312a",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.04em",
    marginLeft: "2px",
  },

  star: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "26px",
    color: "#f0958f",
    fontWeight: "bold",
    lineHeight: 1,
    textShadow:
      "0 0 4px rgba(255,255,255,0.75), 0 0 8px rgba(255, 170, 160, 0.55)",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(49, 35, 29, 0.28)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000,
    boxSizing: "border-box",
  },

  popup: {
    position: "relative",
    width: "min(92vw, 560px)",
    borderRadius: "16px",
    background: "rgba(255, 249, 245, 0.90)",
    boxShadow:
      "0 0 18px rgba(255,255,255,0.88), 0 0 36px rgba(255,244,238,0.82), 0 12px 30px rgba(110, 71, 53, 0.18)",
    border: "1px solid rgba(255,255,255,0.68)",
    padding: "18px 18px 20px",
    boxSizing: "border-box",
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "12px",
    border: "none",
    background: "transparent",
    fontSize: "28px",
    lineHeight: 1,
    color: "#8d6a59",
    cursor: "pointer",
    padding: 0,
  },

  popupHeader: {
    marginBottom: "14px",
  },

  popupHeaderLabel: {
    width: "100%",
    borderRadius: "10px",
    background: "rgba(241, 187, 146, 0.72)",
    color: "#2f2018",
    textAlign: "center",
    fontSize: "clamp(22px, 4vw, 34px)",
    padding: "12px 10px",
    lineHeight: 1.2,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.06em",
    boxSizing: "border-box",
  },

  popupMainCard: {
    background: "rgba(244, 211, 201, 0.62)",
    borderRadius: "12px",
    padding: "18px 14px 16px",
    marginBottom: "14px",
    boxSizing: "border-box",
  },

  popupTopRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    gap: "22px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },

  popupDuration: {
    fontSize: "clamp(30px, 6vw, 48px)",
    color: "#362722",
    lineHeight: 1.1,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.10em",
  },

  popupPrice: {
    fontSize: "clamp(28px, 5.8vw, 44px)",
    color: "#9e4d49",
    lineHeight: 1.1,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.04em",
  },

  popupShortDescription: {
    textAlign: "center",
    color: "#4b3b33",
    fontSize: "clamp(19px, 3.4vw, 28px)",
    lineHeight: 1.5,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  popupFeatureBlock: {
    marginBottom: "0px",
  },

  popupFeatureRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: "0px",
    marginBottom: "4px",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },

  popupFeatureItem: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    lineHeight: 1,
    fontFamily:
      '"Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
    letterSpacing: "0.01em",
    opacity: 0.96,
    flex: "0 0 auto",
  },

  popupFeatureBracket: {
    fontSize: "clamp(12px, 1.9vw, 15px)",
    color: "#3f312b",
    fontWeight: "700",
    flex: "0 0 auto",
  },

  popupFeatureLabel: {
    fontSize: "clamp(12px, 2.0vw, 15px)",
    fontWeight: "700",
  },

  popupFeatureSpacer: {
    fontSize: "clamp(10px, 1.7vw, 13px)",
    color: "transparent",
  },

  popupCustomAdjustNote: {
    marginTop: "14px",
    marginBottom: "0px",
    textAlign: "center",
    color: "rgba(138, 105, 88, 0.92)",
    fontSize: "clamp(10px, 1.65vw, 13px)",
    lineHeight: 1.8,
    fontFamily:
      '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif',
    padding: "0 10px",
  },

  popupCustomAdjustLine: {
    marginBottom: "1px",
  },

  popupDescriptionWrap: {
    marginTop: "10px",
    marginBottom: "12px",
  },

  popupDescriptionGradientTop: {
    height: "22px",
    background:
      "linear-gradient(180deg, rgba(244, 233, 227, 0) 0%, rgba(240, 225, 219, 0.78) 100%)",
    borderTopLeftRadius: "14px",
    borderTopRightRadius: "14px",
  },

  popupDescriptionPanel: {
    background: "rgba(240, 225, 219, 0.78)",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
    padding: "10px 10px 14px",
    boxSizing: "border-box",
  },

  popupDescription: {
    textAlign: "center",
    color: "#5a4940",
    fontSize: "clamp(15px, 2.35vw, 20px)",
    lineHeight: 1.88,
    marginBottom: "12px",
    padding: "0 6px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  popupDescriptionLine: {
    marginBottom: "3px",
  },

  popupTea: {
    textAlign: "center",
    color: "#dd7e4a",
    fontSize: "clamp(18px, 3vw, 26px)",
    lineHeight: 1.5,
    marginBottom: "0px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.06em",
  },

  reserveButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background:
      "linear-gradient(180deg, rgba(153, 102, 72, 0.95) 0%, rgba(122, 78, 55, 0.95) 100%)",
    color: "#fff8f2",
    fontSize: "clamp(18px, 3vw, 24px)",
    lineHeight: 1.3,
    padding: "14px 16px",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(97, 61, 43, 0.18)",
    fontFamily:
      '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif',
  },
};
