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
          src="/images/riroguin.png"
          alt="会員ログイン"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        <form
          onSubmit={handleLogin}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              position: "absolute",
              left: "42%",
              top: "16.3%",
              width: "42%",
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
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={phoneLast4}
            onChange={(e) =>
              setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            aria-label="電話番号下4桁"
            style={{
              position: "absolute",
              left: "42%",
              top: "22.6%",
              width: "42%",
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
              left: "40.5%",
              top: "34.0%",
              width: "22%",
              height: "4.8%",
              borderRadius: "22px",
              border: "2.5px solid #6b4d3a",
              background: "rgba(255,244,236,0.88)",
              color: "#2f2117",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ログイン
          </button>

          <button
            type="button"
            onClick={handleResendMail}
            style={{
              position: "absolute",
              left: "63%",
              top: "41.6%",
              width: "18%",
              height: "2.8%",
              borderRadius: "999px",
              border: "2px solid #6b4d3a",
              background: "rgba(255,244,236,0.85)",
              color: "#2f2117",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            ✉ メール再送
          </button>
        </form>
      </div>
    </main>
  );
}
