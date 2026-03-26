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
            top: "60%",
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
            color: "#f6d7d0",
            textDecoration: "none",
            fontSize: "clamp(20px, 2.2vw, 34px)",
            fontWeight: "bold",
            border: "4px solid #1f120d",
            boxSizing: "border-box",
            textShadow:
              "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
          }}
        >
          予約する
        </a>

        <a
          href="/confirm"
          style={{
            position: "absolute",
            left: "35%",
            top: "70.5%",
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
            color: "#d9b29a",
            textDecoration: "none",
            fontSize: "clamp(15px, 1.5vw, 22px)",
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
            position: "absolute",
            left: "65%",
            top: "70.5%",
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
            color: "#d9b29a",
            textDecoration: "none",
            fontSize: "clamp(15px, 1.5vw, 22px)",
            fontWeight: "bold",
            border: "4px solid #1f120d",
            boxSizing: "border-box",
          }}
        >
          店舗情報
        </a>
      </div>
    </main>
  );
}
