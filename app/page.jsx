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
      '"Yu Gothic", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
    border: "1.5px solid rgba(95, 58, 42, 0.62)",
    boxSizing: "border-box",
    letterSpacing: "0.06em",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    textShadow:
      "0 0 0 #fff, 0 0 6px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.6)",
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
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(14px, 1.3vw, 20px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Gothic", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    letterSpacing: "0.03em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",
    textShadow: "none",
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
        padding: "0",
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
            background: "rgba(255,255,255,0.01)",
          }}
        />

        {/* ボタン配置レイヤー */}
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {/* 予約する */}
          <a
            href="/reserve"
            style={{
              ...mainButtonStyle,
              position: "absolute",
              left: "50%",
              top: "41.8%",
              transform: "translateX(-50%)",
            }}
          >
            予約する
          </a>

          {/* 予約確認 */}
          <a
            href="/confirm"
            style={{
              ...subButtonStyle,
              position: "absolute",
              left: "35%",
              top: "50.9%",
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
              left: "65%",
              top: "50.9%",
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
