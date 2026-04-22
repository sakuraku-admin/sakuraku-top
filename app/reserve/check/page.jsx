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
    const ok = window.confirm("ご予約を取り消しますか？");
    if (!ok) return;

    localStorage.removeItem("selectedMenu");
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");

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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          padding: "40px 20px 60px",
          boxSizing: "border-box",
        }}
      >
        {/* 上部アイビー */}
        <img
          src="/images/ivy-top.png"
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        />

        {/* タイトル */}
        <div
          style={{
            textAlign: "center",
            fontFamily: '"Yu Mincho", serif',
            fontSize: "22px",
            color: "#6f4b41",
            marginBottom: "16px",
            opacity: 0.9,
          }}
        >
          ご予約内容
        </div>

        {/* メインカード */}
        <div
          style={{
            background: "rgba(255, 251, 248, 0.85)",
            borderRadius: "28px",
            padding: "28px 20px 26px",
            boxShadow: "0 10px 25px rgba(100,60,40,0.12)",
          }}
        >
          {/* 日時 */}
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              borderRadius: "22px",
              padding: "18px",
              textAlign: "center",
              marginBottom: "18px",
              fontFamily: '"Yu Mincho", serif',
              color: "#6a4337",
            }}
          >
            <div style={{ fontSize: "20px" }}>
              ご予約日時：{reserveDate}
            </div>
            <div style={{ fontSize: "22px", marginTop: "4px" }}>
              {reserveTime}
            </div>
          </div>

          {/* メニュー */}
          <div
            style={{
              textAlign: "center",
              fontFamily: '"Yu Mincho", serif',
              color: "#7d5b50",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontSize: "18px" }}>
              {menuName}（{menuTime}）
            </div>
            <div style={{ fontSize: "16px", marginTop: "4px" }}>
              {menuPrice}
            </div>
          </div>

          {/* オプション */}
          <div
            style={{
              textAlign: "center",
              fontFamily: '"Yu Mincho", serif',
              fontSize: "14px",
              color: "#8c6c61",
              marginBottom: "12px",
            }}
          >
            <div style={{ marginBottom: "2px" }}>オプション</div>
            <div>
              {options.map((o, i) => (
                <span key={o.name}>
                  {i !== 0 && "　"}
                  {o.name} {o.price}
                </span>
              ))}
            </div>
          </div>

          {/* 合計 */}
          <div
            style={{
              textAlign: "center",
              fontFamily: '"Yu Mincho", serif',
              fontSize: "20px",
              color: "#6f4b41",
              marginBottom: "14px",
            }}
          >
            合計　{totalPrice}
          </div>

          {/* 区切り */}
          <div
            style={{
              height: "1px",
              background: "rgba(120,89,74,0.2)",
              marginBottom: "14px",
            }}
          />

          {/* メッセージ */}
          <div
            style={{
              textAlign: "center",
              fontFamily: '"Yu Mincho", serif',
              fontSize: "14px",
              color: "#84675d",
              marginBottom: "18px",
            }}
          >
            <div>ご来店を心よりお待ちしております🌸</div>
            <div>
              ご不明な点がありましたらお気軽にLINEからお問合せください
            </div>
          </div>

          {/* ボタン */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={handleChangeReservation}
              style={{
                borderRadius: "999px",
                padding: "16px",
                border: "none",
                background:
                  "linear-gradient(180deg, #e8a3b3 0%, #d98fa2 100%)",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              予約を変更する
            </button>

            <button
              onClick={handleCancelReservation}
              style={{
                borderRadius: "999px",
                padding: "14px",
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(120,89,74,0.2)",
                color: "#7d5b50",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              予約を取り消す
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                background: "none",
                border: "none",
                color: "#8d7066",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              戻る
            </button>
          </div>

          {/* 履歴 */}
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <button
              onClick={() => (window.location.href = "/reserve/history")}
              style={{
                background: "none",
                border: "none",
                textDecoration: "underline",
                color: "#8f766a",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              過去のご予約を見る
            </button>
          </div>
        </div>

        {/* 下アイビー */}
        <img
          src="/images/ivy-bottom.png"
          style={{
            width: "100%",
            marginTop: "18px",
          }}
        />
      </div>
    </main>
  );
}
