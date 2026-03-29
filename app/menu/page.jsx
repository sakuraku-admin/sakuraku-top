"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    id: "seitai-60",
    type: "seitai",
    name: "60分",
    duration: "60分",
    price: "5000円",
    shortDescription: "定期的なお身体のケアに",
    description:
      "整体、ストレッチ、筋膜リリース、自律神経ケア等を含む手技メインのコースです",
    teaIncluded: true,
  },
  {
    id: "seitai-90",
    type: "seitai",
    name: "90分",
    duration: "90分",
    price: "6500円",
    shortDescription: "しっかり整えたい方に",
    description:
      "全身のバランスを見ながら、つらい部位を中心に丁寧に整えていく人気のコースです",
    teaIncluded: true,
  },
  {
    id: "seitai-120",
    type: "seitai",
    name: "120分",
    duration: "120分",
    price: "8000円",
    shortDescription: "より深く、ゆったり整えたい方に",
    description:
      "気になる箇所をより細かく見ながら、全身をじっくり整えていく余裕のあるコースです",
    teaIncluded: true,
  },
  {
    id: "shinsei-kaifuku",
    type: "shinsei",
    name: "回復",
    duration: "90分",
    price: "9000円",
    shortDescription: "お疲れが強い時の集中ケアに",
    description:
      "深部のこわばりへアプローチし、巡りと回復を促す深整コースです",
    teaIncluded: true,
  },
  {
    id: "shinsei-onjun",
    type: "shinsei",
    name: "温巡",
    duration: "120分",
    price: "12000円",
    shortDescription: "全身をしっかり温め、巡らせたい方に",
    description:
      "温めと巡りを組み合わせながら、全身を深くゆるめて整えるおすすめの深整コースです",
    recommend: true,
    teaIncluded: true,
  },
  {
    id: "shinsei-kaihou",
    type: "shinsei",
    name: "解放",
    duration: "180分",
    price: "18000円",
    shortDescription: "深い解放感を求める方へ",
    description:
      "ゆったり長めのお時間の中で、全身を丁寧にほどきながら深く整えていく特別コースです",
    teaIncluded: true,
  },
];

export default function MenuPage() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(null);

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
          <img
            src="/menu-bg.png"
            alt="コースメニュー背景"
            style={styles.backgroundImage}
          />

          <div style={styles.scrollArea}>
            <div style={styles.scrollInner}>
              <img
                src="/banner-seitai.png"
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

              <img
                src="/banner-shinsei.png"
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

                    {item.recommend && <span style={styles.star}>☆</span>}
                  </button>
                ))}
              </div>
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
                {selectedMenu.type === "seitai" ? "整体コース" : "深整コース"}
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

            <div style={styles.popupDescription}>
              {selectedMenu.description}
            </div>

            {selectedMenu.teaIncluded && (
              <div style={styles.popupTea}>アフターティー付き</div>
            )}

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
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f8efe8",
    padding: "24px 12px 40px",
    boxSizing: "border-box",
  },

  canvas: {
    position: "relative",
    width: "100%",
    maxWidth: "900px",
    aspectRatio: "900 / 1600",
    overflow: "hidden",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    userSelect: "none",
    pointerEvents: "none",
  },

  scrollArea: {
    position: "absolute",
    left: "9.6%",
    top: "7.3%",
    width: "84.8%",
    height: "79.8%",
    overflowY: "auto",
    overflowX: "hidden",
    background: "transparent",
    scrollbarWidth: "thin",
    msOverflowStyle: "auto",
    padding: "8px 0",
    boxSizing: "border-box",
  },

  scrollInner: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 0 28px",
    boxSizing: "border-box",
  },

  sectionBanner: {
    width: "97%",
    height: "auto",
    display: "block",
    margin: "0 auto 18px",
    userSelect: "none",
    pointerEvents: "none",
  },

  buttonGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    marginBottom: "26px",
  },

  menuButton: {
    width: "74%",
    minHeight: "62px",
    borderRadius: "14px",
    border: "1.5px solid rgba(95, 58, 42, 0.35)",
    background: "rgba(255, 240, 236, 0.78)",
    boxShadow: "0 1px 0 rgba(255,255,255,0.4) inset",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    cursor: "pointer",
    color: "#433128",
    padding: "14px 16px",
    boxSizing: "border-box",
    backdropFilter: "blur(1px)",
    WebkitBackdropFilter: "blur(1px)",
  },

  menuButtonText: {
    fontSize: "clamp(18px, 3vw, 28px)",
    lineHeight: 1,
    letterSpacing: "0.18em",
    color: "#3f3029",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  deepMenuName: {
    fontSize: "clamp(17px, 2.8vw, 26px)",
    lineHeight: 1,
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.06em",
    textShadow: "0 0 2px rgba(255,255,255,0.65)",
  },

  deepKaifuku: {
    color: "#bfded9",
    WebkitTextStroke: "0.4px rgba(119, 111, 103, 0.55)",
  },

  deepOnjun: {
    color: "#eeb1a5",
    WebkitTextStroke: "0.4px rgba(128, 96, 91, 0.55)",
  },

  deepKaihou: {
    color: "#c9f0f5",
    WebkitTextStroke: "0.4px rgba(114, 98, 90, 0.55)",
  },

  deepDuration: {
    fontSize: "clamp(17px, 2.6vw, 24px)",
    color: "#433128",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.06em",
  },

  star: {
    fontSize: "clamp(18px, 2.8vw, 24px)",
    color: "#e98983",
    lineHeight: 1,
    marginLeft: "2px",
    transform: "translateY(-1px)",
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
    background: "rgba(255, 250, 246, 0.90)",
    boxShadow:
      "0 0 18px rgba(255,255,255,0.9), 0 0 36px rgba(255,244,238,0.85), 0 12px 30px rgba(110, 71, 53, 0.18)",
    border: "1px solid rgba(255,255,255,0.72)",
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
    background: "rgba(241, 187, 146, 0.85)",
    color: "#2f2018",
    textAlign: "center",
    fontSize: "clamp(22px, 4vw, 34px)",
    padding: "12px 10px",
    lineHeight: 1.2,
    fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.08em",
    boxSizing: "border-box",
  },

  popupMainCard: {
    background: "rgba(244, 211, 201, 0.70)",
    borderRadius: "12px",
    padding: "18px 14px 16px",
    marginBottom: "16px",
    boxSizing: "border-box",
  },

  popupTopRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    gap: "22px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  popupDuration: {
    fontSize: "clamp(30px, 6vw, 48px)",
    color: "#362722",
    lineHeight: 1.1,
    fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.10em",
  },

  popupPrice: {
    fontSize: "clamp(28px, 5.8vw, 44px)",
    color: "#a84e4a",
    lineHeight: 1.1,
    fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
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

  popupDescription: {
    textAlign: "center",
    color: "#5a4940",
    fontSize: "clamp(16px, 2.6vw, 22px)",
    lineHeight: 1.7,
    marginBottom: "12px",
    padding: "0 8px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
  },

  popupTea: {
    textAlign: "center",
    color: "#dd7e4a",
    fontSize: "clamp(18px, 3vw, 26px)",
    lineHeight: 1.5,
    marginBottom: "18px",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    letterSpacing: "0.08em",
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
