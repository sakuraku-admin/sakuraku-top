"use client";

import { useMemo, useState } from "react";

const magCreamOptions = [
  { id: "mag-neck", name: "首", price: 1000, minutes: 10 },
  { id: "mag-shoulder", name: "肩", price: 1000, minutes: 10 },
  { id: "mag-abdomen", name: "お腹", price: 1000, minutes: 10 },
  { id: "mag-waist", name: "腰", price: 1000, minutes: 10 },
  { id: "mag-sole", name: "足裏", price: 1000, minutes: 10 },
];

const shapeCareOptions = [
  { id: "shape-1", name: "1部位", price: 2000, minutes: 20 },
  { id: "shape-2", name: "2部位", price: 3500, minutes: 40 },
  { id: "shape-3", name: "3部位", price: 5000, minutes: 60 },
];

export default function OptionMenuPage() {
  const [selectedMag, setSelectedMag] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedHead, setSelectedHead] = useState(false);

  const selectedMagItem =
    magCreamOptions.find((item) => item.id === selectedMag) || null;
  const selectedShapeItem =
    shapeCareOptions.find((item) => item.id === selectedShape) || null;

  const totalPrice = useMemo(() => {
    return (
      (selectedMagItem?.price || 0) +
      (selectedShapeItem?.price || 0) +
      (selectedHead ? 3000 : 0)
    );
  }, [selectedMagItem, selectedShapeItem, selectedHead]);

  const totalMinutes = useMemo(() => {
    return (
      (selectedMagItem?.minutes || 0) +
      (selectedShapeItem?.minutes || 0) +
      (selectedHead ? 30 : 0)
    );
  }, [selectedMagItem, selectedShapeItem, selectedHead]);

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f5e6ea 0%, #f3dde3 40%, #ecd2da 100%)",
    display: "flex",
    justifyContent: "center",
    padding: "24px 12px",
  };

  const phoneStyle = {
    width: "100%",
    maxWidth: "430px",
    height: "calc(100vh - 48px)",
    background: "rgba(255, 248, 245, 0.94)",
    borderRadius: "28px",
    boxShadow: "0 10px 30px rgba(90, 58, 44, 0.12)",
    overflow: "hidden",
  };

  const scrollStyle = {
    height: "100%",
    overflowY: "auto",
    padding: "24px",
  };

  const blockStyle = {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "20px",
    padding: "14px",
    marginBottom: "14px",
  };

  const optionButtonStyle = (selected) => ({
    width: "100%",
    borderRadius: "16px",
    border: selected ? "2px solid #8c6a53" : "1px solid #ddd",
    background: selected ? "#f9f0ea" : "#fff",
    padding: "12px",
    marginBottom: "10px",
    textAlign: "left",
  });

  return (
    <div style={containerStyle}>
      <div style={phoneStyle}>
        <div style={scrollStyle}>
          <h1 style={{ color: "#5a3a2c" }}>オプション選択</h1>

          {/* マグクリーム */}
          <div style={blockStyle}>
            <h2>① マグクリーム</h2>
            {magCreamOptions.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setSelectedMag((prev) => (prev === item.id ? null : item.id))
                }
                style={optionButtonStyle(selectedMag === item.id)}
              >
                {item.name} +{item.price}円（約{item.minutes}分）
              </button>
            ))}
          </div>

          {/* シェイプ */}
          <div style={blockStyle}>
            <h2>② 巡りシェイプケア</h2>
            {shapeCareOptions.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setSelectedShape((prev) =>
                    prev === item.id ? null : item.id
                  )
                }
                style={optionButtonStyle(selectedShape === item.id)}
              >
                {item.name} +{item.price}円（約{item.minutes}分）
              </button>
            ))}
          </div>

          {/* 頭 */}
          <div style={blockStyle}>
            <h2>③ 頭部解放</h2>
            <button
              onClick={() => setSelectedHead((prev) => !prev)}
              style={optionButtonStyle(selectedHead)}
            >
              頭部ケア追加 +3000円（約30分）
            </button>
          </div>

          {/* 合計 */}
          <div style={blockStyle}>
            <h3>合計</h3>
            <p>{totalPrice}円</p>
            <p>約{totalMinutes}分</p>
          </div>
        </div>
      </div>
    </div>
  );
}
