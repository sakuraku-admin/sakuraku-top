"use client";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("ログアウトしました");
  };

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundImage: "url('/images/mokume.png')",
        backgroundRepeat: "repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          minHeight: "100vh",
          aspectRatio: "2000 / 3500",
          overflow: "hidden",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "2.2%",
            right: "4.2%",
            background: "transparent",
            border: "none",
            color: "rgba(90, 58, 44, 0.68)",
            fontSize: "clamp(11px, 1vw, 14px)",
            fontWeight: 500,
            fontFamily:
              '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
            letterSpacing: "0.04em",
            cursor: "pointer",
            zIndex: 20,
            padding: 0,
            lineHeight: 1.4,
            textShadow: "0 1px 3px rgba(255,255,255,0.45)",
          }}
        >
          ログアウトする
        </button>

        <img
          src="/images/top1.png"
          alt="さく楽 トップカード"
          style={{
            position: "absolute",
            top: "5.2%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "86%",
            height: "auto",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
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
