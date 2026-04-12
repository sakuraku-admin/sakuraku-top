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
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            <span style={styles.labelText}>電話番号（下4桁）</span>
            <input
              type="text"
              value={phoneLast4}
              onChange={(e) =>
                setPhoneLast4(e.target.value.replace(/[^0-9]/g, ""))
              }
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
  // ⭐全面木目
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokume.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
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
    fontSize: "clamp(30px, 5vw, 36px)",
    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif",
    letterSpacing: "0.12em",
    marginBottom: "24px",
  },

  card: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.78)",
    borderRadius: "28px",
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  subText: {
    fontSize: "14px",
    color: "#7a5a47",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  labelText: {
    fontSize: "14px",
    color: "#5b3d2b",
  },

  input: {
    height: "44px",
    borderRadius: "999px",
    border: "1px solid rgba(90,58,46,0.2)",
    padding: "0 16px",
  },

  loginButton: {
    marginTop: "12px",
    height: "48px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(180deg, #f29a8d 0%, #e48174 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
  },

  helpArea: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },

  helpText: {
    fontSize: "13px",
    color: "#6c4c39",
  },

  mailButton: {
    height: "40px",
    padding: "0 20px",
    borderRadius: "999px",
    border: "none",
    background: "rgba(255, 255, 255, 0.85)",
    color: "#5a3a2e",
  },
};
