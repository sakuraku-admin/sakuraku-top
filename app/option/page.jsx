"use client";

import { useMemo, useState } from "react";

export default function OptionMenuPage() {
  const [mag, setMag] = useState(false);
  const [shape, setShape] = useState(null);
  const [head, setHead] = useState(false);

  const totalPrice = useMemo(() => {
    return (
      (mag ? 1000 : 0) +
      (shape === 1 ? 2000 : 0) +
      (shape === 2 ? 3500 : 0) +
      (shape === 3 ? 5000 : 0) +
      (head ? 3000 : 0)
    );
  }, [mag, shape, head]);

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: "url('/images/riroguin.png')", // ←ここに今回の画像
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    padding: "24px 12px 40px",
  };

  const phoneStyle = {
    width: "100%",
    maxWidth: "430px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(90, 58, 44, 0.15)",
    border: "1px solid rgba(255,255,255,0.4)",
    overflow: "hidden",
  };

  const scrollStyle = {
    padding: "24px 18px 32px",
  };

  const blockStyle = {
    background: "rgba(255,255,255,0.7)",
    borderRadius: "20px",
    padding: "16px",
    marginBottom: "16px",
    border: "1px solid rgba(140,106,83,0.2)",
    backdropFilter: "blur(6px)",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#5a3a2c",
    marginBottom: "8px",
  };

  const textStyle = {
    fontSize: "13px",
    lineHeight: 1.8,
    color: "rgba(90,58,44,0.8)",
  };

  const buttonStyle = (active) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "999px",
    border: active
      ? "2px solid #8c6a53"
      : "1px solid rgba(140,106,83,0.3)",
    background: active ? "rgba(255,248,241,0.9)" : "rgba(255,255,255,0.6)",
    marginTop: "10px",
    fontWeight: 700,
    color: "#5a3a2c",
    cursor: "pointer",
  });

  return (
    <div style={containerStyle}>
      <div style={phoneStyle}>
        <div style={scrollStyle}>
          {/* タイトル */}
          <h1 style={{ fontSize: "24px", color: "#5a3a2c" }}>
            オプション選択
          </h1>

          {/* マグクリーム */}
          <section style={blockStyle}>
            <div style={titleStyle}>・マグクリーム（塗布）</div>
            <div style={textStyle}>1部位 1000円</div>

            <button
              style={buttonStyle(mag)}
              onClick={() => setMag(!mag)}
            >
              追加する
            </button>
          </section>

          {/* 巡りシェイプ */}
          <section style={blockStyle}>
            <div style={titleStyle}>・巡りシェイプ（オイル）</div>

            <div style={textStyle}>
              冷え、むくみ、セルライトなどの気になる箇所を、
              温めたマグバームとオイルでしっかり流して柔らかくスッキリ整えます。
            </div>

            <button
              style={buttonStyle(shape === 1)}
              onClick={() => setShape(shape === 1 ? null : 1)}
            >
              1部位 2000円（ピンポイント）
            </button>

            <button
              style={buttonStyle(shape === 2)}
              onClick={() => setShape(shape === 2 ? null : 2)}
            >
              2部位 3500円（お腹＋がおすすめ）
            </button>

            <button
              style={buttonStyle(shape === 3)}
              onClick={() => setShape(shape === 3 ? null : 3)}
            >
              3部位 5000円（しっかり流す）
            </button>
          </section>

          {/* 頭部 */}
          <section style={blockStyle}>
            <div style={titleStyle}>・頭部解放（頭蓋筋膜リリース）</div>
            <div style={textStyle}>30分 3000円</div>

            <button
              style={buttonStyle(head)}
              onClick={() => setHead(!head)}
            >
              追加する
            </button>
          </section>

          {/* 合計 */}
          <section style={blockStyle}>
            <div style={{ fontSize: "16px", marginBottom: "8px" }}>
              合計
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700 }}>
              {totalPrice}円
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
