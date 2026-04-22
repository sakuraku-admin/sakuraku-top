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
        backgroundColor: "#efeae3",
        display: "flex",
        justifyContent: "center",
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          minHeight: "100vh",
          backgroundImage: 'url("/images/mokumecheck.png")',
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
            paddingTop: "160px",
            paddingBottom: "90px",
            paddingLeft: "42px",
            paddingRight: "42px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "rgba(255, 251, 248, 0.84)",
              borderRadius: "24px",
              padding: "30px 24px 28px",
              boxShadow: "0 8px 18px rgba(120, 89, 74, 0.05)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.96)",
                  borderRadius: "24px",
                  padding: "14px 60px 12px",
                  color: "#6a4337",
                  fontSize: "33px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  lineHeight: 1.55,
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                  textAlign: "center",
                }}
              >
                <div>ご予約日時：{reserveDate}</div>
                <div>{reserveTime}</div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#7d5b50",
                fontSize: "23px",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                marginBottom: "8px",
              }}
            >
              <div>
                {menuName}（{menuTime}）
              </div>
              <div
                style={{
                  fontSize: "20px",
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
                fontSize: "17px",
                lineHeight: 1.9,
                letterSpacing: "0.01em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {options.length > 0 && (
                <>
                  <div style={{ marginBottom: "2px" }}>オプション</div>
                  <div style={{ color: "#9a7f76", fontSize: "16px" }}>
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
                fontSize: "23px",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                marginBottom: "18px",
              }}
            >
              合計　{totalPrice}
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(120, 89, 74, 0.14)",
                marginBottom: "16px",
              }}
            />

            <div
              style={{
                color: "#84675d",
                fontSize: "16px",
                lineHeight: 1.95,
                letterSpacing: "0.01em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
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
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              <button
                type="button"
                onClick={handleChangeReservation}
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "999px",
                  background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
                  color: "#fffdfb",
                  fontSize: "26px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  padding: "18px 18px",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(210, 140, 160, 0.16)",
                  fontFamily: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
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
                  background: "rgba(255,255,255,0.84)",
                  color: "#7d5b50",
                  fontSize: "23px",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  padding: "16px 18px",
                  cursor: "pointer",
                  border: "1.5px solid rgba(145, 112, 101, 0.20)",
                  boxShadow: "none",
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
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
                  fontSize: "18px",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  padding: "4px 0 0",
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                }}
              >
                戻る
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "8px",
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
                  fontSize: "17px",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  padding: "6px 8px",
                  fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
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
