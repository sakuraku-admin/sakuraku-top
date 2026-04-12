"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("ログイン", { email, phoneLast4 });
  };

  const handleResendMail = () => {
    console.log("メール再送", { email });
  };

  const inputStyle = {
    position: "absolute",
    left: "44.2%",
    width: "38.5%",
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

  const loginButtonStyle = {
    position: "absolute",
    left: "50%",
    top: "23.5%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    minWidth: "108px",
    height: "4.6%",
    minHeight: "42px",
    borderRadius: "18px",
    background: "rgba(255, 244, 236, 0.24)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(15px, 1.5vw, 22px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "2px solid rgba(70, 40, 28, 0.85)",
    boxSizing: "border-box",
    letterSpacing: "0.03em",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    paddingBottom: "1px",
    cursor: "pointer",
  };

  const subButtonStyle = {
    position: "absolute",
    left: "68%",
    top: "31.9%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "17%",
    minWidth: "92px",
    height: "2.8%",
    minHeight: "28px",
    borderRadius: "14px",
    background: "rgba(255, 245, 238, 0.14)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(9px, 0.9vw, 12px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    letterSpacing: "0.01em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",
    paddingBottom: "1px",
    cursor: "pointer",
    whiteSpace: "nowrap",
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
          backgroundImage: "url('/images/riroguin.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
          aspectRatio: "9 / 16",
          margin: "0 auto",
        }}
      >
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              ...inputStyle,
              top: "12.6%",
            }}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={phoneLast4}
            onChange={(e) =>
              setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            aria-label="電話番号下4桁"
            style={{
              ...inputStyle,
              top: "18.1%",
            }}
          />

          <button type="submit" style={loginButtonStyle}>
            ログイン
          </button>

          <button type="button" onClick={handleResendMail} style={subButtonStyle}>
            ✉ メール再送
          </button>
        </form>
      </div>
    </main>
  );
}
