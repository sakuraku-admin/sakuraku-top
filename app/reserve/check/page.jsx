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
          padding: "18px 18px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "14px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "72%",
              maxWidth: "350px",
              minHeight: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2px",
              marginBottom: "14px",
              background: "rgba(255, 250, 246, 0.44)",
              borderRadius: "0 0 24px 24px",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxShadow: "0 2px 10px rgba(120, 90, 70, 0.05)",
            }}
          >
            <span
              style={{
                color: "#6e4b41",
                fontSize: "clamp(17px, 4.5vw, 22px)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                lineHeight: 1.2,
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              }}
            >
              ご予約内容
            </span>
          </div>

          <div
            style={{
              width: "92%",
              margin: "0 auto",
              background: "rgba(248, 242, 237, 0.9)",
              borderRadius: "30px",
              padding: "22px 18px 22px",
              boxSizing: "border-box",
              boxShadow: "0 8px 22px rgba(110, 80, 65, 0.06)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              marginTop: "34px",
            }}
          >
            <div
              style={{
                background: "rgba(241, 241, 241, 0.92)",
                borderRadius: "24px",
                padding: "18px 14px 16px",
                textAlign: "center",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  color: "#6a4337",
                  fontSize: "clamp(20px, 5.1vw, 27px)",
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
                  fontSize: "clamp(19px, 4.9vw, 26px)",
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
                fontSize: "clamp(18px, 4.6vw, 23px)",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                marginBottom: "4px",
              }}
            >
              <div>
                {menuName}（{menuTime}）
              </div>
              <div
                style={{
                  fontSize: "clamp(16px, 4vw, 20px)",
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
                fontSize: "clamp(13px, 3.3vw, 17px)",
                lineHeight: 1.9,
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
                      fontSize: "clamp(14px, 3.5vw, 17px)",
                    }}
                  >
                    オプション
                  </div>
                  <div
                    style={{
                      color: "#9a7f76",
                      fontSize: "clamp(12px, 3.05vw, 16px)",
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
                fontSize: "clamp(20px, 4.8vw, 23px)",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                marginBottom: "16px",
              }}
            >
              合計　{totalPrice}
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(120, 89, 74, 0.14)",
                marginBottom: "14px",
              }}
            />

            <div
              style={{
                color: "#84675d",
                fontSize: "clamp(13px, 3.15vw, 16px)",
                lineHeight: 1.85,
                letterSpacing: "0.01em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                textAlign: "center",
                marginBottom: "18px",
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
                  fontSize: "clamp(18px, 4.6vw, 26px)",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  padding: "17px 18px",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(210, 140, 160, 0.14)",
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
                  fontSize: "clamp(17px, 4.2vw, 23px)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  padding: "15px 18px",
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
                  fontSize: "clamp(15px, 3.5vw, 18px)",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  padding: "2px 0 0",
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
                marginTop: "0px",
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
                  fontSize: "clamp(14px, 3.3vw, 17px)",
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

        <img
          src="/images/hedera.png"
          alt="hedera decoration"
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
            zIndex: 3,
          }}
        />
      </div>
    </main>
  );
}
