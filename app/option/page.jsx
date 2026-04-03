"use client";

import { useMemo, useState } from "react";

const magCreamOptions = [
  {
    id: "mag-neck",
    name: "首",
    price: 1000,
    minutes: 10,
    description:
      "お辛い箇所に塗布し、筋肉をゆるめ、コリ・ハリの緩和と疲労回復を促します。",
  },
  {
    id: "mag-shoulder",
    name: "肩",
    price: 1000,
    minutes: 10,
    description:
      "お辛い箇所に塗布し、筋肉をゆるめ、コリ・ハリの緩和と疲労回復を促します。",
  },
  {
    id: "mag-abdomen",
    name: "お腹",
    price: 1000,
    minutes: 10,
    description:
      "お辛い箇所に塗布し、筋肉をゆるめ、コリ・ハリの緩和と疲労回復を促します。",
  },
  {
    id: "mag-waist",
    name: "腰",
    price: 1000,
    minutes: 10,
    description:
      "お辛い箇所に塗布し、筋肉をゆるめ、コリ・ハリの緩和と疲労回復を促します。",
  },
  {
    id: "mag-sole",
    name: "足裏",
    price: 1000,
    minutes: 10,
    description:
      "お辛い箇所に塗布し、筋肉をゆるめ、コリ・ハリの緩和と疲労回復を促します。",
  },
];

const shapeCareOptions = [
  {
    id: "shape-1",
    name: "1部位",
    price: 2000,
    minutes: 20,
    description:
      "冷え、むくみ、セルライトなどの気になる箇所を、温めたマグバームとオイルでしっかり流して柔らかくスッキリ整えます。",
  },
  {
    id: "shape-2",
    name: "2部位",
    price: 3500,
    minutes: 40,
    description:
      "気になる箇所をしっかり流したい方におすすめです。お腹＋他部位の組み合わせも人気です。",
  },
  {
    id: "shape-3",
    name: "3部位",
    price: 5000,
    minutes: 60,
    description:
      "脚・背中・お腹など、広い範囲をしっかり整えたい方におすすめです。",
  },
];

const headCareOption = {
  id: "head-release",
  name: "頭部解放（深部筋膜リリース）",
  price: 3000,
  minutes: 30,
  description:
    "噛みしめ、食いしばり、眼精疲労、頭痛、お顔の気になるむくみやフェイスライン、鼻づまり、眩暈、耳鳴りなどが気になる方におすすめです。マグバーム・マッサージクリームを使用し、お顔と頭蓋の骨、筋膜、筋肉にしっかりアプローチしながらも、「痛みの少ない頭部ケア」を行います。",
};

export default function OptionMenuPage() {
  const [selectedMag, setSelectedMag] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedHead, setSelectedHead] = useState(false);

  const selectedMagItem =
    magCreamOptions.find((item) => item.id === selectedMag) || null;
  const selectedShapeItem =
    shapeCareOptions.find((item) => item.id === selectedShape) || null;
  const selectedHeadItem = selectedHead ? headCareOption : null;

  const totalPrice = useMemo(() => {
    return (
      (selectedMagItem?.price || 0) +
      (selectedShapeItem?.price || 0) +
      (selectedHeadItem?.price || 0)
    );
  }, [selectedMagItem, selectedShapeItem, selectedHeadItem]);

  const totalMinutes = useMemo(() => {
    return (
      (selectedMagItem?.minutes || 0) +
      (selectedShapeItem?.minutes || 0) +
      (selectedHeadItem?.minutes || 0)
    );
  }, [selectedMagItem, selectedShapeItem, selectedHeadItem]);

  const handleMagSelect = (id) => {
    setSelectedMag((prev) => (prev === id ? null : id));
  };

  const handleShapeSelect = (id) => {
    setSelectedShape((prev) => (prev === id ? null : id));
  };

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f6f1ea 0%, #f9f4ee 35%, #f7efe6 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 12px 40px",
    boxSizing: "border-box",
  };

  const phoneStyle = {
    width: "100%",
    maxWidth: "430px",
    height: "calc(100vh - 48px)",
    background: "rgba(255, 252, 248, 0.92)",
    borderRadius: "28px",
    boxShadow: "0 10px 30px rgba(90, 58, 44, 0.12)",
    overflow: "hidden",
    border: "1px solid rgba(145, 112, 90, 0.12)",
  };

  const scrollStyle = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    padding: "26px 18px 34px",
    boxSizing: "border-box",
    scrollbarWidth: "thin",
  };

  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#5a3a2c",
    letterSpacing: "0.04em",
    margin: "0 0 6px 0",
  };

  const sectionSubStyle = {
    fontSize: "12px",
    lineHeight: 1.7,
    color: "rgba(90, 58, 44, 0.82)",
    margin: "0 0 16px 0",
  };

  const blockStyle = {
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(155, 120, 94, 0.18)",
    borderRadius: "20px",
    padding: "14px",
    marginBottom: "14px",
    boxSizing: "border-box",
  };

  const optionButtonStyle = (selected) => ({
    width: "100%",
    textAlign: "left",
    borderRadius: "18px",
    border: selected
      ? "2px solid rgba(140, 106, 83, 0.9)"
      : "1px solid rgba(140, 106, 83, 0.22)",
    background: selected
      ? "linear-gradient(180deg, rgba(245, 232, 221, 0.95) 0%, rgba(255, 248, 241, 0.98) 100%)"
      : "rgba(255, 250, 245, 0.92)",
    padding: "14px 14px 13px",
    marginBottom: "10px",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  });

  const summaryBoxStyle = {
    marginTop: "18px",
    background: "linear-gradient(180deg, #f4e8dc 0%, #f9f0e8 100%)",
    border: "1px solid rgba(140, 106, 83, 0.22)",
    borderRadius: "22px",
    padding: "16px",
    boxSizing: "border-box",
  };

  const reserveButtonStyle = {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    padding: "14px 16px",
    marginTop: "14px",
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#fffaf6",
    background: "linear-gradient(180deg, #8c6a53 0%, #765542 100%)",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(118, 85, 66, 0.22)",
  };

  return (
    <div style={containerStyle}>
      <div style={phoneStyle}>
        <div style={scrollStyle}>
          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                fontSize: "12px",
                color: "#7b8b6f",
                letterSpacing: "0.18em",
                margin: 0,
                fontWeight: 600,
              }}
            >
              OPTION MENU
            </p>
            <h1
              style={{
                fontSize: "28px",
                color: "#5a3a2c",
                margin: "8px 0 8px",
                lineHeight: 1.3,
                fontWeight: 700,
              }}
            >
              オプション選択
            </h1>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.8,
                color: "rgba(90, 58, 44, 0.84)",
                margin: 0,
              }}
            >
              気になる箇所やお悩みに合わせて、
              <br />
              ご希望のオプションをお選びいただけます。
            </p>
          </div>

          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>① マグクリーム（塗布）</h2>
            <p style={sectionSubStyle}>
              1000円
              <br />
              お辛い箇所に塗布し、筋肉をゆるめコリ、ハリの緩和と疲労回復を促します。
              <br />
              （首・肩・お腹・腰・足裏からお好きな箇所をお選びいただけます）
            </p>

            {magCreamOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMagSelect(item.id)}
                style={optionButtonStyle(selectedMag === item.id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#5a3a2c",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#7b5a47",
                      whiteSpace: "nowrap",
                    }}
                  >
                    +{item.price.toLocaleString()}円
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    lineHeight: 1.7,
                    color: "rgba(90, 58, 44, 0.78)",
                  }}
                >
                  塗布目安：約{item.minutes}分
                </p>
              </button>
            ))}
          </section>

          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>② 巡りシェイプケア</h2>
            <p style={sectionSubStyle}>
              （オイル／マグバーム使用）
              <br />
              冷え、むくみ、セルライトなどの気になる箇所を、
              温めたマグバームとオイルでしっかり流して柔らかくスッキリ整えます。
            </p>

            {shapeCareOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleShapeSelect(item.id)}
                style={optionButtonStyle(selectedShape === item.id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "6px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#5a3a2c",
                        marginBottom: "4px",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(90, 58, 44, 0.74)",
                      }}
                    >
                      約{item.minutes}分
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#7b5a47",
                      whiteSpace: "nowrap",
                      marginTop: "2px",
                    }}
                  >
                    +{item.price.toLocaleString()}円
                  </span>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    lineHeight: 1.75,
                    color: "rgba(90, 58, 44, 0.78)",
                  }}
                >
                  {item.description}
                </p>
              </button>
            ))}
          </section>

          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>③ 頭部解放（深部筋膜リリース）</h2>
            <p style={sectionSubStyle}>
              3000円（約30分）
              <br />
              噛みしめ、食いしばり、眼精疲労、頭痛、お顔の気になるむくみやフェイスライン、鼻づまり、眩暈、耳鳴りなどが気になる方におすすめです。
              <br />
              マグバーム・マッサージクリームを使用し、お顔と頭蓋の骨、筋膜、筋肉にしっかりアプローチしながらも、「痛みの少ない頭部ケア」を行います。
            </p>

            <button
              type="button"
              onClick={() => setSelectedHead((prev) => !prev)}
              style={optionButtonStyle(selectedHead)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "6px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#5a3a2c",
                      marginBottom: "4px",
                    }}
                  >
                    頭部解放ケアを追加する
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(90, 58, 44, 0.74)",
                    }}
                  >
                    約30分
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#7b5a47",
                    whiteSpace: "nowrap",
                    marginTop: "2px",
                  }}
                >
                  +3,000円
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  lineHeight: 1.75,
                  color: "rgba(90, 58, 44, 0.78)",
                }}
              >
                お顔まわりのむくみ感や、噛みしめによる緊張が気になる方にもおすすめです。
              </p>
            </button>
          </section>

          <section style={summaryBoxStyle}>
            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "18px",
                fontWeight: 700,
                color: "#5a3a2c",
              }}
            >
              選択中のオプション
            </h3>

            <div
              style={{
                fontSize: "13px",
                lineHeight: 1.9,
                color: "rgba(90, 58, 44, 0.84)",
              }}
            >
              {selectedMagItem || selectedShapeItem || selectedHeadItem ? (
                <>
                  {selectedMagItem && (
                    <div>・マグクリーム（{selectedMagItem.name}）</div>
                  )}
                  {selectedShapeItem && (
                    <div>・巡りシェイプケア（{selectedShapeItem.name}）</div>
                  )}
                  {selectedHeadItem && (
                    <div>・頭部解放（深部筋膜リリース）</div>
                  )}
                </>
              ) : (
                <div>現在オプションは選択されていません。</div>
              )}
            </div>

            <div
              style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(140, 106, 83, 0.16)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(90, 58, 44, 0.66)",
                    marginBottom: "2px",
                  }}
                >
                  合計追加料金
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#5a3a2c",
                  }}
                >
                  {totalPrice.toLocaleString()}円
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(90, 58, 44, 0.66)",
                    marginBottom: "2px",
                  }}
                >
                  オプション合計目安
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#5a3a2c",
                  }}
                >
                  約{totalMinutes}分
                </div>
              </div>
            </div>

            <button type="button" style={reserveButtonStyle}>
              この内容で次へ
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
