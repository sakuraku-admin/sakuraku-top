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
          <div style={styles.loginBox}>
            <div style={styles.formGrid}>
              <div style={styles.labelColumn}>
                <div style={styles.smallLabel}>（ご登録時の）</div>
                <div style={styles.mainLabel}>メールアドレス</div>

                <div style={styles.phoneLabelWrap}>
                  <div style={styles.mainLabel}>電話番号</div>
                  <div style={styles.mainLabel}>（下４桁）</div>
                </div>
              </div>

              <div style={styles.inputColumn}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="メールアドレス"
                  style={styles.input}
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
                  style={styles.input}
                />
              </div>
            </div>

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
    aspectRatio: "9 / 16",
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

  overlayArea: {
    position: "absolute",
    left: "11%",
    top: "8.2%",
    width: "79%",
    height: "36.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    background: "transparent",
  },

  loginBox: {
    width: "100%",
    minHeight: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "7% 5% 0",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "42% 58%",
    alignItems: "start",
    columnGap: "3%",
    width: "100%",
  },

  labelColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "7%",
    color: "#1f120d",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
  },

  smallLabel: {
    fontSize: "clamp(10px, 1.5vw, 13px)",
    lineHeight: 1.2,
    marginBottom: "10px",
    whiteSpace: "nowrap",
  },

  mainLabel: {
    fontSize: "clamp(14px, 2.2vw, 20px)",
    lineHeight: 1.25,
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  phoneLabelWrap: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },

  inputColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    paddingTop: "6%",
  },

  input: {
    width: "100%",
    height: "54px",
    borderRadius: "999px",
    border: "2px solid rgba(95, 58, 42, 0.62)",
    background: "rgba(255, 248, 242, 0.36)",
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

  loginButtonRow: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "18px",
  },

  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36%",
    minWidth: "120px",
    height: "54px",
    borderRadius: "20px",
    background: "rgba(255, 244, 236, 0.24)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(16px, 2vw, 22px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "2px solid rgba(70, 40, 28, 0.85)",
    boxSizing: "border-box",
    letterSpacing: "0.03em",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    lineHeight: 1,
    padding: 0,
  },

  resendRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "3%",
    boxSizing: "border-box",
  },

  resendButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
    minWidth: "108px",
    height: "34px",
    borderRadius: "14px",
    background: "rgba(255, 245, 238, 0.14)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(10px, 1.2vw, 12px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    letterSpacing: "0.01em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    appearance: "none",
    WebkitAppearance: "none",
    lineHeight: 1,
    padding: 0,
  },
};
