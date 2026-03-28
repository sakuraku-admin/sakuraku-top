export default function RegisterPage() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/touroku.png')",
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
          top: "32%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "75%",
        }}
      >
        <input placeholder="山田 花子" style={inputStyle} />
        <input placeholder="09012345678" style={inputStyle} />
        <input placeholder="example@mail.com" style={inputStyle} />

        <button style={buttonStyle}>登録する</button>
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
};
