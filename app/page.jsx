export default function Home() {
  const mainButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38%",
    minWidth: "190px",
    height: "5.4%",
    minHeight: "58px",
    borderRadius: "20px",
    background: "rgba(255, 244, 236, 0.24)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(20px, 2vw, 30px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(95, 58, 42, 0.4)",
    boxSizing: "border-box",
    letterSpacing: "0.06em",
    boxShadow:
      "0 3px 8px rgba(80, 45, 35, 0.12), inset 0 1px 0 rgba(255,255,255,0.28)",
    textShadow:
      "0 0 0 #fff, 0 0 6px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.6)",
    paddingBottom: "2px",
  };

  const subButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24%",
    minWidth: "130px",
    height: "4.2%",
    minHeight: "48px",
    borderRadius: "18px",
    background: "rgba(255, 245, 238, 0.14)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(14px, 1.3vw, 20px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    letterSpacing: "0.03em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",
    paddingBottom: "1px",
  };

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f3ede8",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          minHeight: "100vh",
          backgroundImage: "url('/images/newtop.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          aspectRatio: "2000 / 3500",
          overflow: "hidden",
        }}
      >
        {/* 透明レイヤー */}
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        />

        {/* ボタンレイヤー */}
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {/* 予約する（上に移動） */}
          <a
            href="/reserve"
            style={{
              ...mainButtonStyle,
              position: "absolute",
              left: "50%",
              top: "38.5%",
              transform: "translateX(-50%)",
            }}
          >
            予約する
          </a>

          {/* 予約確認（下＆間隔広げ） */}
          <a
            href="/confirm"
            style={{
              ...subButtonStyle,
              position: "absolute",
              left: "30%",
              top: "49.5%",
              transform: "translateX(-50%)",
            }}
          >
            予約確認
          </a>

          {/* 店舗情報 */}
          <a
            href="/info"
            style={{
              ...subButtonStyle,
              position: "absolute",
              left: "70%",
              top: "49.5%",
              transform: "translateX(-50%)",
            }}
          >
            店舗情報
          </a>
        </div>
      </div>
    </main>
  );
}
