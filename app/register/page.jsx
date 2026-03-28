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
        background: "#f3c9aa",
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="お名前"
            style={{
              position: "absolute",
              left: "37%",
              top: "16.5%",
              width: "44%",
              height: "4.3%",
              borderRadius: "999px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,248,242,0.65)",
              padding: "0 14px",
              fontSize: "16px",
              color: "#2f2117",
              boxSizing: "border-box",
            }}
          />

          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="電話番号"
            style={{
              position: "absolute",
              left: "37%",
              top: "22.0%",
              width: "44%",
              height: "4.3%",
              borderRadius: "999px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,248,242,0.65)",
              padding: "0 14px",
              fontSize: "16px",
              color: "#2f2117",
              boxSizing: "border-box",
            }}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              position: "absolute",
              left: "37%",
              top: "27.5%",
              width: "50%",
              height: "4.3%",
              borderRadius: "999px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,248,242,0.65)",
              padding: "0 14px",
              fontSize: "16px",
              color: "#2f2117",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              position: "absolute",
              left: "39%",
              top: "35.4%",
              width: "22%",
              height: "4.8%",
              borderRadius: "22px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,244,236,0.88)",
              color: "#2f2117",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            登録
          </button>
        </form>
      </div>
    </main>
  );
}
