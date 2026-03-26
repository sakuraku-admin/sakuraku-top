export default function Home() {
  const mainButtonStyle = {
    position: "absolute",
    left: "50%",
    top: "52.8%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36%",
    minWidth: "190px",
    height: "5.2%",
    minHeight: "58px",
    borderRadius: "20px",
    background: "rgba(255, 245, 238, 0.16)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#d97f7f",
    textDecoration: "none",
    fontSize: "clamp(19px, 2vw, 30px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(90, 55, 40, 0.55)",
    boxSizing: "border-box",
    letterSpacing: "0.06em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.14)",
    textShadow:
      "0 1px 0 rgba(255,255,255,0.45), 0 0 2px rgba(255,255,255,0.18)",
    paddingBottom: "2px",
  };

  const subButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22%",
    minWidth: "122px",
    height: "3.9%",
    minHeight: "46px",
    borderRadius: "18px",
    background: "rgba(255, 245, 238, 0.14)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#9a6a5f",
    textDecoration: "none",
    fontSize: "clamp(14px, 1.3vw, 20px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    letterSpacing: "0.03em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",
    textShadow: "0 1px 0 rgba(255,255,255,0.35)",
    paddingBottom: "1px",
  };

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
        <a href="/reserve" style={mainButtonStyle}>
          予約する
        </a>

        <a
          href="/confirm"
          style={{
            ...subButtonStyle,
            position: "absolute",
            left: "35%",
            top: "61.7%",
            transform: "translateX(-50%)",
          }}
        >
          予約確認
        </a>

        <a
          href="/info"
          style={{
            ...subButtonStyle,
            position: "absolute",
            left: "65%",
            top: "61.7%",
            transform: "translateX(-50%)",
          }}
        >
          店舗情報
        </a>
      </div>
    </main>
  );
}
