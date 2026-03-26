export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        backgroundColor: "#f6c39d",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          minHeight: "100vh",
          backgroundImage: "url('/images/top-visual.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
          position: "relative",
        }}
      >
        <div
          style={{
            paddingTop: "62%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <a
            href="/reserve"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "260px",
              height: "74px",
              borderRadius: "999px",
              backgroundColor: "#8f5d40",
              color: "#f6d7d0",
              textDecoration: "none",
              fontSize: "28px",
              fontWeight: "bold",
              border: "4px solid #1f120d",
              boxSizing: "border-box",
              textShadow:
                "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
            }}
          >
            予約する
          </a>

          <div
            style={{
              marginTop: "34px",
              display: "flex",
              gap: "36px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/confirm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "170px",
                height: "58px",
                borderRadius: "999px",
                backgroundColor: "#8f5d40",
                color: "#d9b29a",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                border: "4px solid #1f120d",
                boxSizing: "border-box",
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
                width: "170px",
                height: "58px",
                borderRadius: "999px",
                backgroundColor: "#8f5d40",
                color: "#d9b29a",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                border: "4px solid #1f120d",
                boxSizing: "border-box",
              }}
            >
              店舗情報
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
