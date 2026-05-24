"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const USER_STORAGE_KEY = "sakurakuUser";

const deepOptions = [
  "当日お任せカスタマイズ",
  "マグバーム / オイル",
  "よもぎ蒸しパッド",
  "頭部解放",
  "フェイシャル",
  "肩甲骨はがし",
  "腰痛撃退",
  "チネイザン（腹部マッサージ）",
  "台湾式足ツボ",
];

function DeepOptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const handleBack = () => {
    router.back();
  };

  const handleOptionToggle = (optionName) => {
    setSelectedOptions((prev) =>
      prev.includes(optionName)
        ? prev.filter((item) => item !== optionName)
        : [...prev, optionName]
    );
  };

  const handleNext = () => {
    const courseId = searchParams.get("courseId") || "";
    const courseName = searchParams.get("courseName") || "深整コース";
    const duration = searchParams.get("duration") || "";
    const price = searchParams.get("price") || "";
    const type = searchParams.get("type") || "deep";

    const params = new URLSearchParams({
      courseId,
      courseName,
      duration,
      price,
      type,
      optionMinutes: "0",
      optionPrice: "0",
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
    padding: "13px 14px",
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
    textAlign: "left",
    lineHeight: 1.6,
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
              <p style={styles.headerSub}>DEEP CUSTOMIZE</p>
              <h1 style={styles.headerTitle}>深整カスタマイズ</h1>
              <p style={styles.headerText}>
                深整コースは、下記内容を
                <br />
                コース料金内で自由に組み合わせできます。
              </p>
            </div>

            <section style={styles.noticeBox}>
              <p style={styles.noticeMain}>
                気になるものをいくつでもお選びください。
              </p>
              <p style={styles.noticeText}>
                迷う方は「当日お任せカスタマイズ」をお選びください。
                <br />
                当日の状態を見ながら、時間内で最適に組み立てます。
              </p>
              <div style={styles.includedBadge}>
                料金はコースに含まれております
              </div>
            </section>

            <section style={styles.block}>
              <h2 style={styles.sectionTitle}>・カスタマイズ内容</h2>
              <p style={styles.description}>
                複数選択できます。気になるものはすべてお選びください。
              </p>

              <div style={styles.optionList}>
                {deepOptions.map((optionName) => {
                  const selected = selectedOptions.includes(optionName);

                  return (
                    <button
                      key={optionName}
                      type="button"
                      onClick={() => handleOptionToggle(optionName)}
                      style={optionButtonStyle(selected)}
                    >
                      {selected ? "✓ " : "□ "}
                      {optionName}
                    </button>
                  );
                })}
              </div>
            </section>

            <section style={styles.summaryBox}>
              <h3 style={styles.summaryTitle}>選択中の内容</h3>

              <div style={styles.summaryList}>
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((optionName) => (
                    <div key={optionName}>・{optionName}</div>
                  ))
                ) : (
                  <div>現在カスタマイズ内容は選択されていません。</div>
                )}
              </div>

              <div style={styles.summaryNote}>
                ※選択内容は、ご予約確認画面に表示されます。
                <br />
                ※当日の状態により、内容を調整する場合がございます。
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

export default function DeepOptionPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <DeepOptionContent />
    </Suspense>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: "url('/images/deep-option.png')",
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
  },

  scrollArea: {
    width: "100%",
    height: "100%",
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

  noticeBox: {
    background: "rgba(255, 245, 247, 0.62)",
    border: "1px solid rgba(155, 120, 94, 0.16)",
    borderRadius: "22px",
    padding: "16px",
    marginBottom: "14px",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  noticeMain: {
    margin: "0 0 8px 0",
    fontSize: "15px",
    fontWeight: 700,
    color: "#5a3a2c",
    lineHeight: 1.7,
  },

  noticeText: {
    margin: "0 0 12px 0",
    fontSize: "13px",
    lineHeight: 1.85,
    color: "rgba(90, 58, 44, 0.82)",
  },

  includedBadge: {
    width: "100%",
    borderRadius: "999px",
    padding: "9px 12px",
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg, rgba(190, 141, 121, 0.96) 0%, rgba(163, 116, 97, 0.96) 100%)",
    color: "#fffaf7",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(140, 106, 83, 0.14)",
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

  description: {
    fontSize: "13px",
    lineHeight: 1.85,
    color: "rgba(90, 58, 44, 0.82)",
    margin: "0 0 12px 0",
  },

  optionList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
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

  summaryNote: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(140, 106, 83, 0.14)",
    fontSize: "12px",
    lineHeight: 1.75,
    color: "rgba(90, 58, 44, 0.68)",
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
