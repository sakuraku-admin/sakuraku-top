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

  return (
    <main style={styles.page}>
      <div style={styles.canvas}>
        <img
          src="/images/riroguin.png"
          alt="会員ログイン背景"
          style={styles.backgroundImage}
        />

        <form onSubmit={handleLogin} style={styles.overlayArea}>
          <div style={styles.inputWrap}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, marginBottom: "18px" }}
            />

            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={phoneLast4}
              onChange={(e) =>
                setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              style={styles.input}
            />

            <div style={styles.loginButtonRow}>
              <button type="submit" style={styles.loginButton}>
                ログイン
              </button>
            </div>
          </div>

          <div style={styles.resendRow}>
            <button
              type="button"
              onClick={handleResendMail}
              style={styles.resendButton}
            >
              ✉ メール再送
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#e6b895",
  },

  canvas: {
    position: "relative",
    width: "100%",
    maxWidth: "520px",
    aspectRatio: "9 / 16",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlayArea: {
    position: "absolute",
    left: "44%",
    top: "21%",
    width: "42%",
  },

  inputWrap: {
    width: "100%",
  },

  input: {
    width: "100%",
    height: "54px",
    borderRadius: "999px",
    border: "2px solid rgba(95, 58, 42, 0.62)",
    background: "rgba(255, 248, 242, 0.36)",
    padding: "0 16px",
    fontSize: "16px",
    appearance: "none",
    WebkitAppearance: "none",
  },

  loginButtonRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },

  loginButton: {
    width: "60%",
    height: "48px",
    borderRadius: "20px",
    border: "2px solid rgba(70, 40, 28, 0.85)",
    background: "rgba(255, 244, 236, 0.24)",
    fontSize: "16px",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
  },

  resendRow: {
    position: "absolute",
    right: "0",
    top: "135%",
  },

  resendButton: {
    width: "120px",
    height: "32px",
    borderRadius: "14px",
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    background: "rgba(255, 245, 238, 0.14)",
    fontSize: "12px",
    cursor: "pointer",
  },
};
