export default function Home() {
  const mainButtonStyle = {
    position: "absolute",
    left: "50%",
    top: "40.8%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36%",
    minWidth: "190px",
    height: "5.2%",
    minHeight: "58px",
    borderRadius: "20px",
    background: "rgba(255, 244, 236, 0.24)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c", // ← ダークブラウン
    textDecoration: "none",
    fontSize: "clamp(20px, 2vw, 30px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(95, 58, 42, 0.62)",
    boxSizing: "border-box",
    letterSpacing: "0.06em",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",

    // ← 主役だけ白縁
    textShadow:
      "0 0 0 #fff, 0 0 6px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.6)",

    paddingBottom: "2px",
  };

  const subButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22%",
    minWidth: "122px",
    height: "3.9%",
    minHeight: "46px",
    borderRadius: "18px",
    background: "rgba(255, 245, 238, 0.14)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c", // ← 統一
    textDecoration: "none",
    fontSize: "clamp(14px, 1.3vw, 20px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',
    border: "1.5px solid rgba(90, 55, 40, 0.5)",
    boxSizing: "border-box",
    letterSpacing: "0.03em",
    boxShadow: "0 4px 10px rgba(80, 45, 35, 0.12)",

    // ← 下はシンプル
    textShadow: "none",

    paddingBottom: "1px",
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
          minHeight: "100vh",
          backgroundImage: "url('/images/top-visual.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
          aspectRatio: "9 / 16",
        }}
      >
        {/* 予約する */}
        <a href="/reserve" style={mainButtonStyle}>
          予約する
        </a>

        {/* 下ボタン */}
        <a
          href="/confirm"
          style={{
            ...subButtonStyle,
            position: "absolute",
            left: "35%",
            top: "50.5%",
            transform: "translateX(-50%)",
          }}
        >
          予約確認
        </a>

        <a
          href="/info"
          style={{
            ...subButtonStyle,
            position: "absolute",
            left: "65%",
            top: "50.5%",
            transform: "translateX(-50%)",
          }}
        >
          店舗情報
        </a>
      </div>
    </main>
  );
}

【登録画面】コード
"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("新規登録", { name, phone, email });
  };

  const inputStyle = {
    position: "absolute",
    left: "34.8%",
    width: "43.5%",
    height: "4.2%",
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

  const registerButtonStyle = {
    position: "absolute",
    left: "50%",
    top: "27.2%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22%",
    minWidth: "116px",
    height: "4.6%",
    minHeight: "42px",
    borderRadius: "18px",
    background: "rgba(255, 244, 236, 0.24)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    color: "#5a3a2c",
    textDecoration: "none",
    fontSize: "clamp(18px, 1.8vw, 28px)",
    fontWeight: "700",
    fontFamily:
      '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", serif',

    // ★ここが理想バランス
    border: "2px solid rgba(70, 40, 28, 0.85)",

    boxSizing: "border-box",
    letterSpacing: "0.04em",
    boxShadow:
      "0 5px 12px rgba(80, 45, 35, 0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
    textShadow: "none",
    paddingBottom: "1px",
    cursor: "pointer",
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
          minHeight: "100vh",
          backgroundImage: "url('/images/touroku.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
          aspectRatio: "9 / 16",
        }}
      >
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="お名前"
            style={{
              ...inputStyle,
              top: "12.5%",
            }}
          />

          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="電話番号"
            style={{
              ...inputStyle,
              top: "17%",
            }}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              ...inputStyle,
              top: "21.5%",
              width: "49%",
            }}
          />

          <button type="submit" style={registerButtonStyle}>
            登録
          </button>
        </form>
      </div>
    </main>
  );
}
