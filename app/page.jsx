export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/top-visual.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "58vh",
          boxSizing: "border-box",
        }}
      >
        <a
          href="/reserve"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "320px",
            maxWidth: "80vw",
            height: "78px",
            borderRadius: "999px",
            backgroundColor: "#8b5a3c",
            color: "#f7d9d2",
            textDecoration: "none",
            fontSize: "30px",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            border: "4px solid #1f120d",
            boxShadow: "0 2px 0 rgba(0,0,0,0.15)",
            textShadow:
              "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
          }}
        >
          予約する
        </a>

        <div
          style={{
            marginTop: "42px",
            display: "flex",
            gap: "44px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="/confirm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "190px",
              maxWidth: "38vw",
              height: "64px",
              borderRadius: "999px",
              backgroundColor: "#8b5a3c",
              color: "#d8b39b",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: "bold",
              border: "4px solid #1f120d",
            }}
          >
            予約確認
          </a>

          <a
            href="/info"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "190px",
              maxWidth: "38vw",
              height: "64px",
              borderRadius: "999px",
              backgroundColor: "#8b5a3c",
              color: "#d8b39b",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: "bold",
              border: "4px solid #1f120d",
            }}
          >
            店舗情報
          </a>
        </div>
      </div>
    </main>
  );
}
