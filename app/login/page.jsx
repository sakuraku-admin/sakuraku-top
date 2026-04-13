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
              inputMode="numeric"
              maxLength={4}
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
    letterSpacing: "0.06em",
    textShadow: "0 2px 10px rgba(255,255,255,0.4)",
    marginBottom: "34px",
  },

  // ★ここがガッツリ変更
  card: {
    width: "100%",
    maxWidth: "390px",

    background: "rgba(255, 255, 255, 0.28)", // ←かなり下げる
    border: "1px solid rgba(255,255,255,0.35)",

    borderRadius: "30px",
    padding: "30px 24px 26px",

    display: "flex",
    flexDirection: "column",
    gap: "18px",

    backdropFilter: "blur(14px)", // ←かなり強く
    WebkitBackdropFilter: "blur(14px)",

    boxShadow: "0 10px 25px rgba(91, 61, 43, 0.08)",
  },

  subText: {
    color: "#6e4c39",
    fontSize: "clamp(14px, 2.5vw, 17px)",
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
  },

  input: {
    height: "54px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.5)",
    background: "rgba(255, 255, 255, 0.65)", // ←ここも透明寄り
    padding: "0 18px",
    fontSize: "16px",
    color: "#4f3526",
  },

  loginButton: {
    marginTop: "14px",
    height: "56px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #f29a8d 0%, #e48174 100%)",
    color: "#fff",
    fontSize: "clamp(17px, 3.1vw, 20px)",
    fontWeight: 700,
    letterSpacing: "0.1em",
    boxShadow: "0 10px 20px rgba(228, 129, 116, 0.24)",
  },

  helpArea: {
    marginTop: "26px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  helpText: {
    color: "#6c4c39",
    fontSize: "clamp(14px, 2.5vw, 16px)",
  },

  // ★こっちも合わせる
  mailButton: {
    height: "48px",
    padding: "0 26px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(255, 255, 255, 0.25)", // ←かなり透明
    color: "#7a5a47",
    fontSize: "clamp(15px, 2.8vw, 17px)",
    backdropFilter: "blur(10px)",
  },
};
