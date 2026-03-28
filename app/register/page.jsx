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

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e3c0a2",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          aspectRatio: "900 / 1600",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/touroku.png"
          alt="新規会員登録"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        <form
          onSubmit={handleRegister}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {/* お名前 */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="お名前"
            style={{
              position: "absolute",
              left: "37%",
              top: "18.5%",
              width: "44%",
              height: "4.3%",
              borderRadius: "999px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,248,242,0.42)",
              padding: "0 14px",
              fontSize: "16px",
              color: "#2f2117",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {/* 電話番号 */}
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="電話番号"
            style={{
              position: "absolute",
              left: "37%",
              top: "25%",
              width: "44%",
              height: "4.3%",
              borderRadius: "999px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,248,242,0.42)",
              padding: "0 14px",
              fontSize: "16px",
              color: "#2f2117",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {/* メールアドレス */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              position: "absolute",
              left: "37%",
              top: "31.5%",
              width: "50%",
              height: "4.3%",
              borderRadius: "999px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,248,242,0.42)",
              padding: "0 14px",
              fontSize: "16px",
              color: "#2f2117",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {/* 登録ボタン */}
          <button
            type="submit"
            style={{
              position: "absolute",
              left: "39%",
              top: "40%",
              width: "22%",
              height: "4.8%",
              borderRadius: "14px",
              border: "1.5px solid rgba(107, 77, 58, 0.72)",
              background: "rgba(255, 255, 255, 0.22)",
              color: "#4a3425",
              fontSize: "22px",
              cursor: "pointer",
              boxSizing: "border-box",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            登録
          </button>
        </form>
      </div>
    </main>
  );
}
