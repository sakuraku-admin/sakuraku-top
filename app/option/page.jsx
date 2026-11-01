"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const USER_STORAGE_KEY = "sakurakuUser";
const OPTION_GROUPS = [
  {
    title: "✿ 季節・期間限定",
    items: [
      { id: "warm", name: "🍒 よもぎ温活＆チェリーストーン" },
    ],
  },
  {
    title: "✿ お悩み・集中ケア",
    items: [
      { id: "neck", name: "首肩集中" },
      { id: "head", name: "頭部解放 🍀" },
      { id: "shoulder", name: "肩甲骨はがし" },
      { id: "lowerback", name: "腰痛撃退 ⚡" },
      { id: "belly", name: "お腹ケア" },
      { id: "feet", name: "足裏ふわり 🌸" },
    ],
  },
  {
    title: "✿ 特別ケア・施術技法",
    items: [
      { id: "toksen", name: "トークセン" },
    ],
  },
];
const OPTION_DETAILS = {
  warm: {
    description:
      "よもぎ蒸し温座パッドでお腹まわりを、チェリーストーンピローで気になる箇所をじんわり温めます。2つの温もりに包まれながら、ゆったり整体をお楽しみください。",
    choices: [
      { id: "within", label: "施術時間内で追加", price: 500, minutes: 0 },
    ],
  },
  neck: {
    description:
      "首から肩にかけて、マグクリームを使用したオイルトリートメントでじっくり筋肉をゆるめます。首肩のこりや張り、疲れが気になる方におすすめです。",
    choices: [
      { id: "within", label: "施術時間内で追加", price: 1000, minutes: 0 },
    ],
  },
   head: {
    description:
      "噛みしめ、めまい、耳鳴り、頭痛、お顔の歪みなどが気になる方に。お顔から頭部にかけて、筋膜リリースと調整を行い、こわばりをやさしくゆるめます。",
    choices: [
      { id: "within", label: "施術時間内で追加", price: 1000, minutes: 0 },
      { id: "extra", label: "30分延長して追加", price: 3000, minutes: 30 },
    ],
  },
  shoulder: {
    description:
      "横向きの姿勢で肩甲骨まわりや胸まわりの筋肉をじっくりゆるめ、巻き肩や姿勢の改善へと導きます。",
    choices: [
      { id: "within", label: "施術時間内で追加", price: 1000, minutes: 0 },
      { id: "extra", label: "30分延長して追加", price: 3000, minutes: 30 },
    ],
  },
    lowerback: {
    description:
      "腰のつらさに関わる筋肉の緊張やバランスを確認し、腰まわりの負担軽減を目指してしっかり重点ケア！\n\n※骨格調整・ストレッチ・筋膜リリース等を、お身体の状態に合わせて組み合わせます。",
    choices: [
      { id: "within", label: "施術時間内で追加", price: 1000, minutes: 0 },
      { id: "extra", label: "30分延長して追加", price: 3000, minutes: 30 },
    ],
  },
    belly: {
    description:
      "お腹の冷えや張り、胃腸まわりの不調が気になる方に。お悩みに合わせて、2種類のケアからお選びいただけます。",
    choices: [
      {
        id: "stone",
        label: "温石＆マグケア（30分延長）",
        price: 4000,
        minutes: 30,
        description:
          "お腹の冷えや緊張による張り、腹部・腰まわりのボディラインが気になる方に。温石でじんわり温めながら、マグバームを使用したオイルケアで丁寧にゆるめます。",
      },
      {
        id: "bowel",
        label: "腸もみ（30分延長）",
        price: 3000,
        minutes: 30,
        description:
          "便秘・下痢、食欲不振、膨満感などが気になる方に。整体の手技を用いて、お腹まわりの硬さや緊張を丁寧にゆるめます。",
      },
    ],
  },
    feet: {
    description:
      "足裏の疲れや硬さ、足首まわりのこわばりが気になる方に。ご希望に合わせて2種類のケアからお選びいただけます。",
    choices: [
      {
        id: "within",
        label: "施術時間内で追加",
        price: 1000,
        minutes: 0,
        description:
          "トークセンや叩打法を用いて、足首から足裏にかけて丁寧にゆるめ、バランスを整えます。",
      },
      {
        id: "extra",
        label: "30分延長して追加",
        price: 3500,
        minutes: 30,
        description:
          "トークセン・叩打法・骨格調整・筋膜リリースに加え、マグバームで足裏の腱膜や筋肉をじっくりゆるめます。ふんわり軽やかな足取りを目指すスペシャルケアです。",
      },
    ],
  },
    toksen: {
    description:
      "木槌の心地よい振動を利用して、慢性的なコリや筋肉のこわばりを丁寧にゆるめます。ご希望の施術範囲に合わせてお選びください。",
    choices: [
      {
        id: "point",
        label: "ちょい足しトークセン（1部位）",
        price: 500,
        minutes: 0,
        description:
          "気になる部位をピンポイントで集中ケア！木槌の心地よい振動を利用して、慢性的なコリや筋肉のこわばりを丁寧にゆるめます。",
      },
      {
        id: "wide",
        label: "広範囲トークセン（複数部位〜全身）",
        price: 1000,
        minutes: 0,
        description:
          "お身体の状態を確認しながら、気になる複数の部位をトークセンでじっくりケア。広範囲の筋肉のこわばりや慢性的なコリにアプローチします。",
      },
    ],
  },
    longOil: {
    description:
      "整体120分に、オイルトリートメント60分を追加するロングコース限定オプションです。整体とオイルケアをたっぷりお楽しみいただけます。",
    choices: [
      {
        id: "extra",
        label: "オイルトリートメント60分追加",
        price: 6500,
        minutes: 60,
      },
    ],
  },
};

function OptionMenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLongCourse = Number(searchParams.get("duration")) === 120;

  const [selectedSpa, setSelectedSpa] = useState(false);
  const [selectedMag, setSelectedMag] = useState(false);
  const [selectedToksen, setSelectedToksen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedHead, setSelectedHead] = useState(false);
  const [selectedkenkou, setSelectedkenkou] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
const [draftChoice, setDraftChoice] = useState(null);

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
    if (selectedSpa) selectedOptions.push("よもぎ蒸しパッド＆チェリーストーンピロー");   
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
 　　　　　 気になるメニューをタップして詳細を見る
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
            <h2 style={styles.sectionTitle}>・よもぎ蒸しパッド＆チェリーストーンピロー
              <span 
                style={{
                  ...styles.subTitle,
              color: "#e68a7a",
                }}
                >
                　＼期間限定／
              </span>
              
            </h2>
            <div style={styles.priceLine}>　500円</div>
            <p style={styles.description}>
              よもぎ蒸し温座パッドでお腹を、
              <br />
              チェリーストーンピローで気になる箇所を、
              <br />
              じんわりダブルで温めながら施術を受けられます。
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
            <div style={styles.priceLine}>　1000円</div>
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
                  {selectedSpa && <div>・よもぎ蒸しパッド＆チェリーストーンピロー（＼期間限定／）</div>}
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
          
{/* 新オプションメニュー・仮設表示 */}
<section style={{ marginTop: "24px", padding: "16px", background: "#fbe9e2", borderRadius: "20px" }}>
  <h2 style={{ color: "#5a3a2c", fontSize: "20px", marginBottom: "16px" }}>
    新オプションメニュー（仮）
  </h2>

{OPTION_GROUPS.map((group) => (
    <div key={group.title} style={{ marginBottom: "20px" }}>
      <h3 style={{ color: "#b16f79", fontSize: "15px", marginBottom: "10px" }}>
        {group.title}
      </h3>

      {group.items.map((item) => (
  <div
  key={item.id}
  onClick={() => {
    setOpenOption(item.id);
    setDraftChoice(selectedOptions[item.id] || null);
  }}
  style={{
    cursor: "pointer",
            background: "#fffaf7",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "8px",
            color: "#5a3a2c",
            fontSize: "15px",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{item.name}</span>
          <span style={{ color: "#b08372" }}>›</span>
        </div>
      ))}
    </div>
  ))}
</section>
          {openOption && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px",
    }}
  >
    <div
      style={{
        background: "#fffdf8",
        borderRadius: "20px",
        padding: "24px",
        width: "100%",
        maxWidth: "440px",
        maxHeight: "85vh",
        overflowY: "auto",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpenOption(null)}
        style={{
          display: "block",
          marginLeft: "auto",
          border: "none",
          background: "transparent",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <h3 style={{ color: "#5a3a2c", marginBottom: "12px" }}>
        {OPTION_GROUPS.flatMap((group) => group.items).find(
          (item) => item.id === openOption
        )?.name}
      </h3>
    </div>
  </div>
)}

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
