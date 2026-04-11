"use client";

export default function ReserveCheckPage() {
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  const menuName = "整体コース";
  const menuTime = "60分";
  const menuPrice = "￥5,000";

  const options = [
    { name: "頭部解放", price: "￥3,000" },
    { name: "巡りシェイプ1部位", price: "￥2,000" },
    { name: "マグバーム", price: "￥1,000" },
  ];

  const totalPrice = "￥11,000";

  const message =
    "ご来店を心よりお待ちしております🌸 ご不明な点がありましたらお気軽にLINEでお問合せください";

  const reserveHistory = [
    { date: "2026/4/10(金)", course: "整体 60分" },
    { date: "2026/3/28(土)", course: "深整 120分" },
    { date: "2026/3/10(火)", course: "整体 90分" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#efeae3",
        display: "flex",
        justifyContent: "center",
        padding: "0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          minHeight: "100vh",
          backgroundImage: 'url("/images/reservememory.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "760px",
            margin: "0 auto",
            paddingTop: "170px",
            paddingBottom: "90px",
            paddingLeft: "42px",
            paddingRight: "42px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "rgba(255, 251, 248, 0.82)",
              borderRadius: "26px",
              padding: "28px 24px 26px",
              boxShadow: "0 10px 24px rgba(120, 89, 74, 0.08)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.88)",
                  borderRadius: "999px",
                  padding: "14px 24px 16px",
                  color: "#6a4337",
                  fontSize: "34px",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  lineHeight: 1.5,
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  textAlign: "center",
                }}
              >
                ご予約日時：{reserveDate}　{reserveTime}
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#7d5b50",
                fontSize: "24px",
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                marginBottom: "22px",
              }}
            >
              <div>
                {menuName}（{menuTime}）
              </div>
              <div style={{ fontSize: "21px", marginTop: "2px" }}>{menuPrice}</div>
            </div>

            <div
              style={{
                color: "#8c6c61",
                fontSize: "20px",
                lineHeight: 1.95,
                letterSpacing: "0.01em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                textAlign: "center",
                marginBottom: "18px",
              }}
            >
              {options.length > 0 && (
                <div style={{ marginBottom: "6px" }}>
                  オプション：
                  {options.map((option, index) => (
                    <span key={option.name}>
                      {index === 0 ? "" : "　"}
                      {option.name}
                    </span>
                  ))}
                </div>
              )}

              {options.length > 0 && (
                <div style={{ fontSize: "18px", color: "#9a7f76", marginBottom: "8px" }}>
                  {options.map((option, index) => (
                    <span key={option.name + option.price}>
                      {index === 0 ? "" : "　"}
                      {option.name} {option.price}
                    </span>
                  ))}
                </div>
              )}

              <div
                style={{
                  fontSize: "23px",
                  color: "#6f4b41",
                  marginTop: "10px",
                }}
              >
                合計　{totalPrice}
              </div>
            </div>

            <div
              style={{
                marginTop: "14px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(120, 89, 74, 0.16)",
                color: "#84675d",
                fontSize: "17px",
                lineHeight: 2.0,
                letterSpacing: "0.01em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              {message}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBottom: "28px",
              }}
            >
              <button
                type="button"
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "999px",
                  background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
                  color: "#fffdfb",
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  padding: "20px 18px",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(210, 140, 160, 0.18)",
                  fontFamily: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
                }}
              >
                予約を変更する
              </button>

              <button
                type="button"
                style={{
                  width: "100%",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.72)",
                  color: "#7d5b50",
                  fontSize: "24px",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  padding: "17px 18px",
                  cursor: "pointer",
                  border: "1.5px solid rgba(145, 112, 101, 0.26)",
                  boxShadow: "0 4px 10px rgba(120, 89, 74, 0.06)",
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                }}
              >
                予約を取り消す
              </button>

              <button
                type="button"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  color: "#8d7066",
                  fontSize: "18px",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  padding: "6px 0 0",
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                }}
              >
                戻る
              </button>
            </div>

            <div
              style={{
                background: "rgba(255, 247, 244, 0.52)",
                borderRadius: "22px",
                padding: "18px 18px 16px",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "#6f4b41",
                  fontSize: "24px",
                  letterSpacing: "0.04em",
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                  marginBottom: "14px",
                }}
              >
                過去のご予約
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {reserveHistory.map((history) => (
                  <div
                    key={`${history.date}-${history.course}`}
                    style={{
                      background: "rgba(255,255,255,0.78)",
                      borderRadius: "16px",
                      padding: "14px 16px",
                      color: "#7a5e55",
                      fontSize: "18px",
                      lineHeight: 1.8,
                      letterSpacing: "0.01em",
                      fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                      boxShadow: "0 2px 8px rgba(120, 89, 74, 0.05)",
                    }}
                  >
                    <div>{history.date}</div>
                    <div>{history.course}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
