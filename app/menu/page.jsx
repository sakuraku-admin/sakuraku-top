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
    ],
    descriptionLines: [],
    teaText: "ウェルカム／アフターティー付き",
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

  return (
    <div style={styles.page}>
      <div style={styles.canvas}>
        
        {/* 見出し */}
        <div style={styles.title}>コースメニュー</div>

        {/* 囲み枠 */}
        <div style={styles.frame} />

        <div style={styles.scrollArea}>
          <div style={styles.scrollInner}>

            <img src="/images/banner-syokai.png" style={styles.sectionBanner} />

            <img src="/images/banner-seitai.png" style={styles.sectionBanner} />

            {seitaiMenus.map((item) => (
              <button key={item.id} style={styles.menuButton}>
                <span style={styles.menuButtonText}>{item.name}</span>
              </button>
            ))}

            <img src="/images/banner-shinsei.png" style={styles.sectionBanner} />

            {shinseiMenus.map((item) => (
              <button key={item.id} style={styles.menuButton}>
                {item.name}（{item.duration}）
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    backgroundImage: 'url("/images/mokume.png")',
    backgroundSize: "cover",
  },

  canvas: {
    position: "relative",
    width: "100%",
    maxWidth: "560px",
    aspectRatio: "900 / 1600",
  },

  title: {
    position: "absolute",
    top: "3%",
    width: "100%",
    textAlign: "center",
    fontSize: "28px",
    color: "#2f2018",
    fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
    letterSpacing: "0.1em",
  },

  frame: {
    position: "absolute",
    top: "8%",
    left: "12%",
    width: "76%",
    height: "84%",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.15)",
    pointerEvents: "none",
  },

  scrollArea: {
    position: "absolute",
    top: "10%",
    left: "15%",
    width: "70%",
    height: "80%",
    overflowY: "auto",
  },

  scrollInner: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  sectionBanner: {
    width: "100%",
  },

  menuButton: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.3)",
    border: "none",
  },

  menuButtonText: {
    fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
    fontSize: "22px",
  },
};
