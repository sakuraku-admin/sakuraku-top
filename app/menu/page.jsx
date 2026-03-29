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
            src="/images/menu-bg.png"
            alt="コースメニュー背景"
            style={styles.backgroundImage}
          />

          <div style={styles.scrollArea}>
            <div style={styles.scrollInner}>
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
            <button onClick={closePopup} style={styles.closeButton}>
              ×
            </button>

            <div style={styles.popupHeader}>
              <div style={styles.popupHeaderLabel}>
                {selectedMenu.type === "seitai" ? "整体コース" : "深整コース"}
              </div>
            </div>

            <div style={styles.popupMainCard}>
              <div style={styles.popupTopRow}>
                <div style={styles.popupDuration}>
                  {selectedMenu.duration}
                </div>
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

            <button onClick={handleReserve} style={styles.reserveButton}>
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
    backgroundColor: "#f8efe8",
    padding: "24px",
  },

  canvas: {
    position: "relative",
    width: "100%",
    maxWidth: "900px",
    aspectRatio: "900 / 1600",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  scrollArea: {
    position: "absolute",
    left: "10%",
    top: "8%",
    width: "80%",
    height: "78%",
    overflowY: "auto",
  },

  scrollInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  sectionBanner: {
    width: "95%",
    marginBottom: "20px",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
    width: "100%",
    alignItems: "center",
  },

  menuButton: {
    width: "70%",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    background: "#f8eae4",
    cursor: "pointer",
  },

  menuButtonText: {
    fontSize: "20px",
  },

  deepMenuName: {
    fontSize: "18px",
  },

  deepDuration: {
    marginLeft: "6px",
  },

  star: {
    marginLeft: "6px",
    color: "red",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },

  closeButton: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },

  popupHeaderLabel: {
    fontSize: "20px",
    textAlign: "center",
  },

  popupTopRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  popupDuration: {
    fontSize: "24px",
  },

  popupPrice: {
    color: "red",
  },

  reserveButton: {
    width: "100%",
    marginTop: "20px",
  },
};
