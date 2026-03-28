export default function LoginPage() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/riroguin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* 入力エリア */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "75%",
        }}
      >
        <input placeholder="example@mail.com" style={inputStyle} />
        <input placeholder="下4桁" style={inputStyle} />

        <button style={buttonStyle}>ログイン</button>

        <button style={subButtonStyle}>
          ✉ メール再送
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "30px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "30px",
  border: "none",
  backgroundColor: "#8B5A2B",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const subButtonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "20px",
  border: "1px solid #8B5A2B",
  backgroundColor: "transparent",
  color: "#8B5A2B",
  fontSize: "14px",
};
