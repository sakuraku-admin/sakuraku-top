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

        <div style={styles.overlay}>
          <h1 style={styles.title}>会員ログイン</h1>

          <div style={styles.card}>
            <div style={styles.formRow}>
              <div style={styles.labelBlock}>
                <div style={styles.subLabel}>（ご登録時の）</div>
                <div style={styles.mainLabel}>メールアドレス</div>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="メールアドレス"
                style={styles.input}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.labelBlock}>
                <div style={styles.mainLabel}>電話番号</div>
                <div style={styles.mainLabel}>（下４桁）</div>
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={phoneLast4}
                onChange={(e) =>
                  setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                aria-label="電話番号下4桁"
                style={styles.input}
              />
            </div>

            <div style={styles.loginButtonWrap}>
              <button type="submit" onClick={handleLogin} style={styles.loginButton}>
                ログイン
              </button>
            </div>
          </div>

          <div style={styles.bottomRow}>
            <div style={styles.helpText}>※ログインできない場合→</div>

            <button
              type="button"
              onClick={handleResendMail}
              style={styles.resendButton}
            >
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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#e6b895",
    padding: "0",
    boxSizing: "border-box",
    WebkitTextSizeAdjust: "100%",
  },

  canvas: {
    position: "relative",
    width: "100%",
    maxWidth: "520px",
    aspectRatio: "900 / 1600",
    overflow: "hidden",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    userSelect: "none",
    pointerEvents: "none",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    paddingTop: "5.5%",
  },

  title: {
    margin: 0,
    color: "#1f120d",
    fontSize: "clamp(28px, 5vw, 42px)",
    lineHeight: 1.2,
    fontWeight: "700",
    letterSpacing: "0.08em",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
  },

  card: {
    width: "80%",
    marginTop: "8.8%",
    border: "2px solid rgba(84, 56, 42, 0.72)",
    borderRadius: "26px",
    background: "rgba(255, 250, 245, 0.22)",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
    padding: "12% 7.5% 10%",
    boxSizing: "border-box",
  },

  formRow: {
    display: "grid",
    gridTemplateColumns: "41% 59%",
    alignItems: "center",
    columnGap: "4%",
    marginBottom: "22px",
  },

  labelBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#1f120d",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    textAlign: "center",
  },

  subLabel: {
    fontSize: "clamp(10px, 1.6vw, 14px)",
    lineHeight: 1.2,
    marginBottom: "6px",
    whiteSpace: "nowrap",
  },

  mainLabel: {
    fontSize: "clamp(14px, 2.2vw, 21px)",
    lineHeight: 1.25,
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  input: {
    width: "100%",
    height: "56px",
    borderRadius: "999px",
    border: "2px solid rgba(95, 58, 42, 0.62)",
    background: "rgba(255, 248, 242, 0.5)",
    color: "#5a3a2c",
    boxSizing: "border-box",
    outline: "none",
    padding: "0 16px",
    fontSize: "16px",
    fontFamily:
      '"Yu Gothic", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
    appearance: "none",
    WebkitAppearance: "none",
  },

  loginButtonWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },

  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36%",
    minWidth: "120px",
    height: "56px",
    borderRadius: "22px",
    background: "rgba(255, 244, 236, 0.36)",
    color: "#5a3a2c",
    border: "2px solid rgba(70, 40, 28, 0.85)",
    boxSizing: "border-box",
    fontSize: "clamp(16px, 2.2vw, 24px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    letterSpacing: "0.03em",
    lineHeight: 1,
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTextFillColor: "#5a3a2c",
    textDecoration: "none",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    padding: 0,
  },

  bottomRow: {
    width: "80%",
    marginTop: "6.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    boxSizing: "border-box",
  },

  helpText: {
    color: "#1f120d",
    fontSize: "clamp(12px, 1.8vw, 16px)",
    lineHeight: 1.3,
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    whiteSpace: "nowrap",
  },

  resendButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "132px",
    height: "38px",
    padding: "0 14px",
    borderRadius: "16px",
    background: "rgba(255, 245, 238, 0.24)",
    color: "#5a3a2c",
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    fontSize: "clamp(11px, 1.4vw, 13px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    lineHeight: 1,
    cursor: "pointer",
    whiteSpace: "nowrap",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTextFillColor: "#5a3a2c",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",
  },
};
