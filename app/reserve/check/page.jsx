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

  const handleChangeReservation = () => {
    window.location.href = "/menu";
  };

  const handleCancelReservation = () => {
    const confirmed = window.confirm("ご予約を取り消しますか？");
    if (!confirmed) return;

    localStorage.removeItem("selectedMenu");
    localStorage.removeItem("selectedOption");
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("reservationData");
    localStorage.removeItem("currentReservation");

    alert("ご予約を取り消しました");
    window.location.href = "/";
  };

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundImage: "url('/images/mokume.png')",
        backgroundRepeat: "repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          minHeight: "100vh",
          overflow: "hidden",
          padding: "22px 20px 42px",
          boxSizing: "border-box",
        }}
      >
        <img
          src="/images/hedera.png"
          alt="装飾"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "560px",
            height: "auto",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <div
            style={{
              position: "relative",
              marginTop: "2px",
              marginBottom: "20px",
              width: "62%",
              maxWidth: "290px",
              minHeight: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 251, 247, 0.58)",
              borderRadius: "0 0 22px 22px",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              boxShadow: "0 2px 8px rgba(120, 90, 70, 0.06)",
            }}
          >
            <span
              style={{
                color: "#6e4b41",
                fontSize: "clamp(17px, 4.6vw, 22px)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                lineHeight: 1.2,
              }}
            >
              ご予約内容
            </span>
          </div>

          <div
            style={{
              width: "100%",
              background: "rgba(249, 243, 238, 0.88)",
              borderRadius: "30px",
              padding: "26px 20px 28px",
              boxSizing: "border-box",
              boxShadow: "0 8px 22px rgba(110, 80, 65, 0.08)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              marginTop: "62px",
            }}
          >
            <div
              style={{
                background: "rgba(244, 244, 244, 0.92)",
                borderRadius: "24px",
                padding: "18px 14px 16px",
                textAlign: "center",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  color: "#6a4337",
                  fontSize: "clamp(20px, 5.3vw, 27px)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  lineHeight: 1.5,
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                ご予約日時：{reserveDate}
              </div>
              <div
                style={{
                  color: "#6a4337",
                  fontSize: "clamp(19px, 5.1vw, 26px)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  lineHeight: 1.4,
                  marginTop: "2px",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                {reserveTime}
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#7d5b50",
                fontSize: "clamp(18px, 4.8vw, 23px)",
                lineHeight: 1.85,
                letterSpacing: "0.02em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                marginBottom: "6px",
              }}
            >
              <div>
                {menuName}（{menuTime}）
              </div>
              <div
                style={{
                  fontSize: "clamp(16px, 4.3vw, 20px)",
                  color: "#8d7066",
                  marginTop: "2px",
                }}
              >
                {menuPrice}
              </div>
            </div>

            <div
              style={{
                color: "#8c6c61",
                fontSize: "clamp(13px, 3.5vw, 17px)",
                lineHeight: 1.95,
                letterSpacing: "0.01em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {options.length > 0 && (
                <>
                  <div
                    style={{
                      marginBottom: "4px",
                      fontSize: "clamp(14px, 3.7vw, 17px)",
                    }}
                  >
                    オプション
                  </div>
                  <div
                    style={{
                      color: "#9a7f76",
                      fontSize: "clamp(12px, 3.25vw, 16px)",
                      lineHeight: 1.9,
                    }}
                  >
                    {options.map((option, index) => (
                      <span key={option.name}>
                        {index === 0 ? "" : "　"}
                        {option.name} {option.price}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#6f4b41",
                fontSize: "clamp(20px, 5vw, 23px)",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                marginBottom: "18px",
              }}
            >
              合計　{totalPrice}
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(120, 89, 74, 0.16)",
                marginBottom: "16px",
              }}
            />

            <div
              style={{
                color: "#84675d",
                fontSize: "clamp(13px, 3.4vw, 16px)",
                lineHeight: 1.9,
                letterSpacing: "0.01em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                textAlign: "center",
                marginBottom: "22px",
              }}
            >
              <div>ご来店を心よりお待ちしております🌸</div>
              <div>ご不明な点がありましたらお気軽にLINEからお問合せください</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <button
                type="button"
                onClick={handleChangeReservation}
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "999px",
                  background: "linear-gradient(180deg, #dfa4b5 0%, #d291a4 100%)",
                  color: "#fffdfb",
                  fontSize: "clamp(18px, 4.8vw, 26px)",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  padding: "18px 18px",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(210, 140, 160, 0.16)",
                  fontFamily:
                    '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
                }}
              >
                予約を変更する
              </button>

              <button
                type="button"
                onClick={handleCancelReservation}
                style={{
                  width: "100%",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.82)",
                  color: "#7d5b50",
                  fontSize: "clamp(17px, 4.5vw, 23px)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  padding: "16px 18px",
                  cursor: "pointer",
                  border: "1.5px solid rgba(145, 112, 101, 0.20)",
                  boxShadow: "none",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                予約を取り消す
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  color: "#8d7066",
                  fontSize: "clamp(15px, 3.8vw, 18px)",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  padding: "4px 0 0",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                戻る
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "2px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/reserve/history";
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#8f766a",
                  fontSize: "clamp(14px, 3.6vw, 17px)",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  padding: "6px 8px",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                過去のご予約を見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
