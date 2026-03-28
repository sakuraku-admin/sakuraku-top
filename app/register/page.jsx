"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("新規登録", { name, phone, email });
  };

  const inputStyle = {
    position: "absolute",
    left: "34.8%",
    width: "43.5%",
    height: "4.2%",
    borderRadius: "999px",
    border: "2px solid rgba(95, 58, 42, 0.62)",
    background: "rgba(255, 248, 242, 0.36)",
    color: "#5a3a2c",
    boxSizing: "border-box",
    outline: "none",
    padding: "0 14px",
    fontSize: "16px",
    fontFamily:
      '"Yu Gothic", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
  };

  const registerButtonStyle = {
    position: "absolute",
    left: "50%",
    top: "33%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22%",
    minWidth: "116px",
    height: "4.6%",
    minHeight: "42px",
    borderRadius: "18px",
    background: "rgba(255, 244, 236, 0.24)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(18px, 1.8vw, 28px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(95, 58, 42, 0.62)",
    boxSizing: "border-box",
    letterSpacing: "0.04em",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    textShadow: "none",
    paddingBottom: "1px",
    cursor: "pointer",
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
          backgroundImage: "url('/images/touroku.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
          aspectRatio: "9 / 16",
        }}
      >
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="お名前"
            style={{
              ...inputStyle,
              top: "15%",
            }}
          />

          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="電話番号"
            style={{
              ...inputStyle,
              top: "21%",
            }}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              ...inputStyle,
              top: "27%",
              width: "49%",
            }}
          />

          <button type="submit" style={registerButtonStyle}>
            登録
          </button>
        </form>
      </div>
    </main>
  );
}
