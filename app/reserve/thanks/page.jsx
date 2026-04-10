"use client";

export default function ThanksPage() {
  const menuName = "整体コース";
  const menuTime = "60分";
  const options = ["頭部解放", "巡りシェイプ1部位", "マグバーム"];
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  const hasOptions = options && options.length > 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e9e4de",
        display: "flex",
        justifyContent: "center",
        padding: "16px 12px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#f7f4f0",
          borderRadius: "28px",
          padding: "28px 16px 36px",
          boxShadow: "0 8px 24px rgba(135, 102, 90, 0.06)",
          textAlign: "center",
        }}
      >
        {/* タイトル */}
        <div
          style={{
            background: "linear-gradient(180deg, #cfe6df 0%, #c4ddd7 100%)",
            borderRadius: "20px",
            padding: "16px",
            color: "#3e4c47",
            fontSize: "28px",
            fontFamily: '"Hiragino Mincho ProN", serif',
            marginBottom: "22px",
          }}
        >
          ご予約ありがとうございます
        </div>

        {/* メッセージ */}
        <div
          style={{
            color: "#7a5a5a",
            fontSize: "16px",
            lineHeight: 1.9,
            marginBottom: "22px",
            fontFamily: '"Hiragino Mincho ProN", serif',
          }}
        >
          ご予約を承りました。<br />
          ご来店を心よりお待ちしております🌸
        </div>

        {/* ピンク背景エリア */}
        <section
          style={{
            background: "#efd6dc",
            borderRadius: "22px",
            padding: "26px 16px",
            marginBottom: "18px",
          }}
        >
          {/* 白の日時 */}
          <div
            style={{
              display: "inline-block",
              background: "#ffffff",
              borderRadius: "999px",
              padding: "12px 20px",
              fontSize: "22px",
              fontWeight: 500,
fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
              color: "#6a4337",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              marginBottom: "18px",
            }}
          >
            ご予約日時：{reserveDate}　{reserveTime}
          </div>

          {/* 下の情報（薄く） */}
          <div
            style={{
              color: "#9a857d",
              fontSize: "13px",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            {menuName}（{menuTime}）<br />
            {hasOptions && `オプション：${options.join("　")}`}
          </div>

          <div
            style={{
              color: "#8b7268",
              fontSize: "13px",
              marginTop: "12px",
            }}
          >
            ご不明な点がありましたらお気軽にLINEからお問合せください
          </div>
        </section>

        {/* ボタン */}
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
            color: "#fff",
            fontSize: "22px",
            padding: "18px",
            cursor: "pointer",
          }}
        >
          トップへ戻る
        </button>
      </div>
    </main>
  );
}
