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
          {/* メールアドレス */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="メールアドレス"
            style={{
              position: "absolute",
              left: "42%",
              top: "18%",
              width: "42%",
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

          {/* 電話番号下4桁 */}
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
              top: "25%",
              width: "42%",
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

          {/* ログインボタン */}
          <button
            type="submit"
            style={{
              position: "absolute",
              left: "40.5%",
              top: "30%",
              width: "22%",
              height: "4.8%",
              borderRadius: "14px",
              border: "1.5px solid rgba(107, 77, 58, 0.72)",
              background: "rgba(255, 255, 255, 0.22)",
              color: "#4a3425",
              fontSize: "20px",
              cursor: "pointer",
              boxSizing: "border-box",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            ログイン
          </button>

          {/* メール再送 */}
          <button
            type="button"
            onClick={handleResendMail}
            style={{
              position: "absolute",
              left: "63%",
              top: "45%",
              width: "18%",
              height: "2.8%",
              borderRadius: "11px",
              border: "1.5px solid rgba(107, 77, 58, 0.72)",
              background: "rgba(255, 255, 255, 0.18)",
              color: "#4a3425",
              fontSize: "12px",
              cursor: "pointer",
              boxSizing: "border-box",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            ✉ メール再送
          </button>
        </form>
      </div>
    </main>
  );
}
