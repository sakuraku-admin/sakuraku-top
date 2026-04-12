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
              <span style={styles.helpText}>※ログインできない場合 →</span>
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
    boxSizing: "border-box",
  },

  viewport: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  phoneFrame: {
    position: "relative",
    width: "min(92vw, 520px)",
    aspectRatio: "900 / 1600",
    maxHeight: "96vh",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(83, 57, 39, 0.22)",
    backgroundColor: "#d8c2ae",
  },

  background: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/images/rirog.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transform: "scale(1.01)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "16.8%",
    paddingLeft: "7.5%",
    paddingRight: "7.5%",
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg, rgba(255,248,242,0.06) 0%, rgba(255,248,242,0.02) 100%)",
  },

  title: {
    margin: 0,
    color: "#5b3d2b",
    fontSize: "clamp(26px, 4.8vw, 34px)",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textShadow: "0 2px 8px rgba(255,255,255,0.35)",
    lineHeight: 1.2,
  },

  card: {
    marginTop: "15.5%",
    width: "100%",
    background: "rgba(255, 252, 248, 0.92)",
    border: "1.5px solid rgba(140, 109, 86, 0.22)",
    borderRadius: "28px",
    boxShadow: "0 12px 30px rgba(91, 61, 43, 0.14)",
    padding: "9.5% 7.2% 8.5%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    backdropFilter: "blur(4px)",
  },

  subText: {
    margin: "0 0 2px 0",
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
    border: "1.8px solid rgba(123, 89, 66, 0.28)",
    background: "rgba(255, 255, 255, 0.96)",
    padding: "0 18px",
    fontSize: "16px",
    color: "#4f3526",
    boxSizing: "border-box",
    outline: "none",
    boxShadow: "inset 0 1px 4px rgba(91, 61, 43, 0.05)",
  },

  // ←①ここだけ変更
  loginButton: {
    marginTop: "28px",
    width: "100%",
    height: "56px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #b9806e 0%, #a96d5d 100%)",
    color: "#fffdfb",
    fontSize: "clamp(17px, 3.1vw, 20px)",
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(169, 109, 93, 0.28)",
  },

  // ←②ここだけ変更
  helpArea: {
    marginTop: "5.8%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    width: "100%",
  },

  helpText: {
    color: "#6c4c39",
    fontSize: "clamp(14px, 2.5vw, 16px)",
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    textAlign: "left",
    textShadow: "0 1px 4px rgba(255,255,255,0.35)",
  },

  mailButton: {
    minWidth: "220px",
    maxWidth: "100%",
    height: "48px",
    padding: "0 26px",
    borderRadius: "999px",
    border: "1.5px solid rgba(122, 90, 71, 0.24)",
    background: "rgba(255, 250, 245, 0.9)",
    color: "#7a5a47",
    fontSize: "clamp(15px, 2.8vw, 17px)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(91, 61, 43, 0.1)",
  },
};
