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

              {/* ←ここが調整ポイント */}
              <button type="submit" style={styles.loginButton}>
                ログイン
              </button>
            </form>

            {/* ←ここも調整 */}
            <div style={styles.helpArea}>
              <span style={styles.helpText}>
                ※ログインできない場合→
              </span>
              <button
                type="button"
                onClick={handleResendMail}
                style={styles.mailButton}
              >
                ✉メール再送
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f4ede6 0%, #efe3d7 45%, #eadccf 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 12px",
  },

  viewport: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  phoneFrame: {
    position: "relative",
    width: "min(92vw, 520px)",
    aspectRatio: "900 / 1600",
    maxHeight: "96vh",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(83, 57, 39, 0.22)",
  },

  background: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/images/rirog.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "16%",
    paddingLeft: "7%",
    paddingRight: "7%",
  },

  title: {
    color: "#5b3d2b",
    fontSize: "clamp(26px, 4.8vw, 34px)",
    fontWeight: 700,
    letterSpacing: "0.12em",
  },

  card: {
    marginTop: "15%",
    width: "100%",
    background: "rgba(255, 252, 248, 0.92)",
    border: "1.5px solid rgba(140, 109, 86, 0.22)",
    borderRadius: "28px",
    padding: "9% 7%",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  subText: {
    color: "#7a5a47",
    fontSize: "14px",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  labelText: {
    color: "#5b3d2b",
    fontSize: "16px",
    fontWeight: 600,
  },

  input: {
    height: "54px",
    borderRadius: "999px",
    border: "1.8px solid rgba(123, 89, 66, 0.28)",
    padding: "0 18px",
    fontSize: "16px",
  },

  // 🔥 ログインボタン下げた
  loginButton: {
    marginTop: "28px", // ←ここ増やした
    height: "56px",
    border: "none",
    borderRadius: "999px",
    background: "#b9806e",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 700,
    cursor: "pointer",
  },

  // 🔥 横並び＆左寄せ
  helpArea: {
    marginTop: "6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // ←左寄せ
    gap: "10px", // ←→との間隔
    width: "100%",
  },

  helpText: {
    color: "#6c4c39",
    fontSize: "14px",
  },

  mailButton: {
    height: "42px",
    padding: "0 18px",
    borderRadius: "999px",
    border: "1px solid rgba(122, 90, 71, 0.3)",
    background: "rgba(255, 250, 245, 0.9)",
    color: "#7a5a47",
    fontSize: "14px",
    cursor: "pointer",
  },
};
