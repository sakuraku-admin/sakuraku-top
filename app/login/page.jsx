"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("ログイン", { email, phoneLast4 });

    // 👇追加（仮ログイン保存）
    localStorage.setItem("customerName", email);
    localStorage.setItem("isLoggedIn", "true");

    // 👇ホームへ戻す（※これ無いと画面変わらない）
    window.location.href = "/";
  };

  const handleResendMail = () => {
    console.log("メール再送", { email });
  };

  return (
    <main style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>会員ログイン</h1>

        <form style={styles.card} onSubmit={handleLogin}>
          <p style={styles.subText}>（ご登録時の）</p>

          <label style={styles.label}>
            <span style={styles.labelText}>メールアドレス</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              autoComplete="email"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            <span style={styles.labelText}>電話番号（下4桁）</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={phoneLast4}
              onChange={(e) =>
                setPhoneLast4(e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder=""
              autoComplete="one-time-code"
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.loginButton}>
            ログイン
          </button>
        </form>

        <div style={styles.helpArea}>
          <span style={styles.helpText}>※ログインできない場合 ↓</span>
          <button
            type="button"
            onClick={handleResendMail}
            style={styles.mailButton}
          >
            ✉メール再送
          </button>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokume.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "44px 20px 32px",
    boxSizing: "border-box",
  },

  overlay: {
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    margin: 0,
    color: "#5b3d2b",
    fontSize: "clamp(30px, 5.4vw, 38px)",
    fontWeight: 600,
    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif",
    letterSpacing: "0.08em",
    textShadow: "0 2px 8px rgba(255,255,255,0.35)",
    lineHeight: 1.2,
    marginBottom: "34px",
  },

  card: {
    width: "100%",
    maxWidth: "390px",
    background: "rgba(255, 255, 255, 0.34)",
    border: "1.2px solid rgba(255, 255, 255, 0.34)",
    borderRadius: "30px",
    boxShadow: "0 12px 30px rgba(91, 61, 43, 0.10)",
    padding: "30px 24px 26px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },

  subText: {
    margin: "0 0 4px 0",
    color: "#7a5a47",
    fontSize: "clamp(14px, 2.5vw, 17px)",
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    textAlign: "left",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  labelText: {
    color: "#5b3d2b",
    fontSize: "clamp(15px, 2.8vw, 18px)",
    fontWeight: 600,
    letterSpacing: "0.04em",
    lineHeight: 1.4,
  },

  input: {
    width: "100%",
    height: "54px",
    borderRadius: "999px",
    border: "1.4px solid rgba(255, 255, 255, 0.42)",
    background: "rgba(255, 255, 255, 0.58)",
    padding: "0 18px",
    fontSize: "16px",
    color: "#4f3526",
    boxSizing: "border-box",
    outline: "none",
    boxShadow: "inset 0 1px 4px rgba(91, 61, 43, 0.05)",
  },

  loginButton: {
    marginTop: "14px",
    width: "100%",
    height: "56px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #f29a8d 0%, #e48174 100%)",
    color: "#fffdfb",
    fontSize: "clamp(17px, 3.1vw, 20px)",
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(228, 129, 116, 0.24)",
  },

  helpArea: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },

  helpText: {
    color: "#6c4c39",
    fontSize: "clamp(14px, 2.5vw, 16px)",
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    textAlign: "center",
    textShadow: "0 1px 4px rgba(255,255,255,0.35)",
  },

  mailButton: {
    minWidth: "230px",
    maxWidth: "100%",
    height: "48px",
    padding: "0 26px",
    borderRadius: "999px",
    border: "1.2px solid rgba(255, 255, 255, 0.34)",
    background: "rgba(255, 255, 255, 0.28)",
    color: "#7a5a47",
    fontSize: "clamp(15px, 2.8vw, 17px)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(91, 61, 43, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
};
