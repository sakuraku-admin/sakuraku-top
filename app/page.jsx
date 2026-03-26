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
        <a
          href="/reserve"
          style={{
            position: "absolute",
            left: "50%",
            top: "56.8%",
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
            border: "4px solid #1f120d",
            boxSizing: "border-box",
            letterSpacing: "0.04em",
            textShadow: "0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          予約する
        </a>

        <a
          href="/confirm"
          style={{
            position: "absolute",
            left: "35%",
            top: "65.8%",
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
            border: "4px solid #1f120d",
            boxSizing: "border-box",
            letterSpacing: "0.03em",
          }}
        >
          予約確認
        </a>

        <a
          href="/info"
          style={{
            position: "absolute",
            left: "65%",
            top: "65.8%",
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
            border: "4px solid #1f120d",
            boxSizing: "border-box",
            letterSpacing: "0.03em",
          }}
        >
          店舗情報
        </a>
      </div>
    </main>
  );
}
