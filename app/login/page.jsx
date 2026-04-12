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

  const inputBaseStyle = {
    position: "absolute",
    width: "47%",
    height: "12%",
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
    top: "49.5%",
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

  const resendButtonStyle = {
    position: "absolute",
    left: "78.5%",
    top: "75.8%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28%",
    height: "8.5%",
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
          <div
            style={{
              position: "absolute",
              left: "11%",
              top: "8.3%",
              width: "79%",
              height: "36%",
              background: "transparent",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="メールアドレス"
              style={{
                ...inputBaseStyle,
                left: "44.5%",
                top: "16.5%",
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
                ...inputBaseStyle,
                left: "44.5%",
                top: "31.5%",
              }}
            />

            <button type="submit" style={loginButtonStyle}>
              ログイン
            </button>

            <button
              type="button"
              onClick={handleResendMail}
              style={resendButtonStyle}
            >
              ✉ メール再送
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
