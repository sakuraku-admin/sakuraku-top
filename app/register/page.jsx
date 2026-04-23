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
        minHeight: "100vh",
        backgroundImage: "url('/images/mokume.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "34px 20px 34px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/images/hedera.png"
          alt="hedera decoration"
          style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "420px",
            height: "auto",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 3,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "70%",
            maxWidth: "280px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "8px",
            marginBottom: "18px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,250,246,0.52) 55%, rgba(255,247,242,0.42) 100%)",
            borderRadius: "18px",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow:
              "0 4px 14px rgba(120, 90, 70, 0.05), inset 0 1px 0 rgba(255,255,255,0.22)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <span
            style={{
              color: "#6e4b41",
              fontSize: "clamp(17px, 4.4vw, 22px)",
              fontWeight: 500,
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textShadow: "0 1px 3px rgba(255,255,255,0.22)",
            }}
          >
            ご予約内容
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "390px",
            background: "rgba(248, 242, 237, 0.86)",
            borderRadius: "30px",
            padding: "18px 16px 22px",
            boxSizing: "border-box",
            boxShadow: "0 10px 24px rgba(110, 80, 65, 0.07)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            marginTop: "6px",
          }}
        >
          <div
            style={{
              background: "rgba(241, 241, 241, 0.92)",
              borderRadius: "24px",
              padding: "16px 12px 14px",
              textAlign: "center",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                color: "#6a4337",
                fontSize: "clamp(18px, 4.9vw, 27px)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                lineHeight: 1.45,
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              }}
            >
              ご予約日時：{reserveDate}
            </div>
            <div
              style={{
                color: "#6a4337",
                fontSize: "clamp(18px, 4.7vw, 26px)",
                fontWeight: 600,
                letterSpacing: "0.01em",
                lineHeight: 1.35,
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
              fontSize: "clamp(17px, 4.4vw, 23px)",
              lineHeight: 1.75,
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
                fontSize: "clamp(15px, 3.9vw, 20px)",
                color: "#8d7066",
                marginTop: "1px",
              }}
            >
              {menuPrice}
            </div>
          </div>

          <div
            style={{
              color: "#8c6c61",
              fontSize: "clamp(12px, 3.15vw, 16px)",
              lineHeight: 1.8,
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
                    marginBottom: "3px",
                    fontSize: "clamp(13px, 3.35vw, 16px)",
                  }}
                >
                  オプション
                </div>
                <div
                  style={{
                    color: "#9a7f76",
                    fontSize: "clamp(11px, 2.95vw, 15px)",
                    lineHeight: 1.85,
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
              fontSize: "clamp(19px, 4.7vw, 23px)",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              marginBottom: "14px",
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
              fontSize: "clamp(12px, 3.05vw, 15px)",
              lineHeight: 1.8,
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
              gap: "12px",
              marginBottom: "10px",
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
                fontSize: "clamp(17px, 4.5vw, 24px)",
                fontWeight: 700,
                letterSpacing: "0.03em",
                padding: "16px 18px",
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
                background: "rgba(255,255,255,0.80)",
                color: "#7d5b50",
                fontSize: "clamp(16px, 4.1vw, 22px)",
                fontWeight: 500,
                letterSpacing: "0.03em",
                padding: "15px 18px",
                cursor: "pointer",
                border: "1.5px solid rgba(145, 112, 101, 0.18)",
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
                fontSize: "clamp(14px, 3.4vw, 17px)",
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
              marginTop: "0",
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
                fontSize: "clamp(13px, 3.15vw, 16px)",
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
    </main>
  );
}
