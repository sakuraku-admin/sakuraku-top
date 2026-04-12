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
      <div style={styles.viewport}>
        <div style={styles.phoneFrame}>
          <div style={styles.background} />

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
                <span style={styles.labelText}>
                  電話番号（下4桁）
                </span>
                <input
                  type="text"
                  value={phoneLast4}
                  onChange={(e) => setPhoneLast4(e.target.value)}
                  style={styles.input}
                />
              </label>

              <button type="submit" style={styles.loginButton}>
                ログイン
              </button>
            </form>

            <p style={styles.notice}>
              ※ログインできない場合↓
            </p>

            <button style={styles.resendButton} onClick={handleResendMail}>
              ✉ メール再送
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#d8cfc5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  viewport: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  phoneFrame: {
    width: "390px",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    borderRadius: "28px",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: "url('/images/riroguin.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: "40px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  // ⭐ ここ大きくした
  title: {
    fontSize: "26px",
    color: "#5a3a2e",
    fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif",
    letterSpacing: "0.08em",
    marginBottom: "24px",
  },

  card: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.78)",
    borderRadius: "28px",
    padding: "24px 20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  subText: {
    fontSize: "13px",
    color: "#6b4a3a",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  labelText: {
    fontSize: "14px",
    color: "#5a3a2e",
  },

  input: {
    height: "44px",
    borderRadius: "999px",
    border: "1px solid rgba(90,58,46,0.2)",
    padding: "0 16px",
    background: "#f5f5f5",
  },

  // ⭐ サーモンピンクに変更
  loginButton: {
    marginTop: "12px",
    height: "48px",
    borderRadius: "999px",
    border: "none",
    background: "#f08a7c",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
  },

  notice: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#6b4a3a",
  },

  resendButton: {
    marginTop: "8px",
    height: "40px",
    borderRadius: "999px",
    border: "none",
    background: "#f3ede8",
    color: "#5a3a2e",
    padding: "0 20px",
    fontSize: "14px",
  },
};
