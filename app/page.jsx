export default function Home() {
  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        backgroundColor: "#e6b895",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          minHeight: "100vh",
          backgroundImage: "url('/images/top-visual.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
          aspectRatio: "9 / 16",
        }}
      >
        {/* 予約する */}
        <a
          href="/reserve"
          style={{
            position: "absolute",
            left: "50%",
            top: "54.8%", // ← 少し上に調整
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34%",
            minWidth: "180px",
            height: "4.8%",
            minHeight: "56px",
            borderRadius: "999px",
            backgroundColor: "#8f5d40",
            color: "#f08f88",
            textDecoration: "none",
            fontSize: "clamp(20px, 2.2vw, 34px)",
            fontWeight: "bold",
            fontFamily:
              '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
            border: "2px solid #2a1810", // ← 細く
            boxSizing: "border-box",
            letterSpacing: "0.04em",
            textShadow: "0 1px 0 rgba(255,255,255,0.25)",
            boxShadow:
              "0 6px 10px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.15)", // ← 影追加
          }}
        >
          予約する
        </a>

        {/* 下ボタン */}
        <a
          href="/confirm"
          style={{
            position: "absolute",
            left: "35%",
            top: "63.8%", // ← 一緒に上げる
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22%",
            minWidth: "120px",
            height: "3.9%",
            minHeight: "46px",
            borderRadius: "999px",
            backgroundColor: "#8f5d40",
            color: "#d5b19b",
            textDecoration: "none",
            fontSize: "clamp(15px, 1.5vw, 22px)",
            fontWeight: "bold",
            fontFamily:
              '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
            border: "2px solid #2a1810",
            boxSizing: "border-box",
            letterSpacing: "0.03em",
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.15)",
          }}
        >
          予約確認
        </a>

        <a
          href="/info"
          style={{
            position: "absolute",
            left: "65%",
            top: "63.8%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22%",
            minWidth: "120px",
            height: "3.9%",
            minHeight: "46px",
            borderRadius: "999px",
            backgroundColor: "#8f5d40",
            color: "#d5b19b",
            textDecoration: "none",
            fontSize: "clamp(15px, 1.5vw, 22px)",
            fontWeight: "bold",
            fontFamily:
              '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
            border: "2px solid #2a1810",
            boxSizing: "border-box",
            letterSpacing: "0.03em",
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.15)",
          }}
        >
          店舗情報
        </a>
      </div>
    </main>
  );
}
