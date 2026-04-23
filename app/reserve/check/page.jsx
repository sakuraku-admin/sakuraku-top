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
        padding: "24px 16px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "390px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: 0,
            width: "100%",
            height: "92px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          <img
            src="/images/hedera.png"
            alt="hedera decoration"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              userSelect: "none",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "68%",
            maxWidth: "250px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12px",
            marginBottom: "14px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,248,243,0.46) 55%, rgba(255,245,239,0.34) 100%)",
            borderRadius: "18px",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow:
              "0 3px 10px rgba(120, 90, 70, 0.04), inset 0 1px 0 rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <span
            style={{
              color: "#6e4b41",
              fontSize: "clamp(16px, 4.2vw, 20px)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textShadow: "0 1px 3px rgba(255,255,255,0.18)",
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
            maxWidth: "340px",
            background: "rgba(255, 250, 246, 0.9)",
            borderRadius: "28px",
            padding: "14px 14px 16px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(110, 80, 65, 0.06)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "22px",
              padding: "12px 10px 11px",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                color: "#6a4337",
                fontSize: "clamp(16px, 4.4vw, 22px)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                lineHeight: 1.35,
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              }}
            >
              ご予約日時：{reserveDate}
            </div>
            <div
              style={{
                color: "#6a4337",
                fontSize: "clamp(16px, 4.2vw, 21px)",
                fontWeight: 600,
                letterSpacing: "0.01em",
                lineHeight: 1.3,
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
              fontSize: "clamp(16px, 4vw, 20px)",
              lineHeight: 1.55,
              letterSpacing: "0.02em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              marginBottom: "2px",
            }}
          >
            <div>
              {menuName}（{menuTime}）
            </div>
            <div
              style={{
                fontSize: "clamp(14px, 3.6vw, 18px)",
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
              fontSize: "clamp(11px, 2.9vw, 14px)",
              lineHeight: 1.65,
              letterSpacing: "0.01em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {options.length > 0 && (
              <>
                <div
                  style={{
                    marginBottom: "2px",
                    fontSize: "clamp(12px, 3.1vw, 14px)",
                  }}
                >
                  オプション
                </div>
                <div
                  style={{
                    color: "#9a7f76",
                    fontSize: "clamp(10px, 2.7vw, 13px)",
                    lineHeight: 1.7,
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
              fontSize: "clamp(18px, 4.4vw, 21px)",
              lineHeight: 1.45,
              letterSpacing: "0.02em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              marginBottom: "10px",
            }}
          >
            合計　{totalPrice}
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(120, 89, 74, 0.12)",
              marginBottom: "10px",
            }}
          />

          <div
            style={{
              color: "#84675d",
              fontSize: "clamp(10px, 2.75vw, 13px)",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            <div>ご来店を心よりお待ちしております🌸</div>
            <div>ご不明な点がありましたらお気軽にLINEからお問合せください</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "8px",
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
                fontSize: "clamp(16px, 4.2vw, 22px)",
                fontWeight: 700,
                letterSpacing: "0.03em",
                padding: "13px 16px",
                cursor: "pointer",
                boxShadow: "0 7px 16px rgba(210, 140, 160, 0.13)",
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
                fontSize: "clamp(15px, 3.9vw, 20px)",
                fontWeight: 500,
                letterSpacing: "0.03em",
                padding: "12px 16px",
                cursor: "pointer",
                border: "1.5px solid rgba(145, 112, 101, 0.16)",
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
                fontSize: "clamp(13px, 3.1vw, 15px)",
                letterSpacing: "0.04em",
                cursor: "pointer",
                padding: "0",
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
              marginTop: 0,
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
                fontSize: "clamp(12px, 2.95vw, 14px)",
                letterSpacing: "0.03em",
                cursor: "pointer",
                padding: "4px 6px",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                textDecoration: "underline",
                textUnderlineOffset: "3px",
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
