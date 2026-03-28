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
    <main className="min-h-screen bg-[#f6d2b8] flex items-start justify-center">
      <div className="w-full max-w-[500px] px-2 py-2">
        <div
          className="relative w-full"
          style={{ aspectRatio: "900 / 1600" }}
        >
          {/* 背景画像 */}
          <img
            src="/images/riroguin.png"
            alt="会員ログイン"
            className="absolute inset-0 h-full w-full object-contain"
          />

          {/* 入力欄 */}
          <form onSubmit={handleLogin} className="absolute inset-0">

            {/* メールアドレス */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="メールアドレス"
              className="absolute bg-transparent outline-none text-[20px] text-[#2f2117]"
              style={{
                left: "43%",
                top: "16.8%",
                width: "38.5%",
                height: "4.3%",
                borderRadius: "9999px",
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.35)",
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
              className="absolute bg-transparent outline-none text-[20px] text-[#2f2117] tracking-[0.2em]"
              style={{
                left: "43%",
                top: "23.0%",
                width: "38.5%",
                height: "4.3%",
                borderRadius: "9999px",
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.35)",
              }}
            />

            {/* ログインボタン */}
            <button
              type="submit"
              className="absolute text-[#2f2117] transition hover:scale-[1.02] active:scale-[0.98]"
              style={{
                left: "41.5%",
                top: "33.0%",
                width: "19%",
                height: "4.8%",
                borderRadius: "24px",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.78)",
                fontSize: "28px",
                lineHeight: 1,
              }}
            >
              ログイン
            </button>

            {/* メール再送 */}
            <button
              type="button"
              onClick={handleResendMail}
              className="absolute text-[#2f2117] transition hover:scale-[1.02] active:scale-[0.98]"
              style={{
                left: "60.5%",
                top: "41.1%",
                width: "22%",
                height: "2.9%",
                borderRadius: "9999px",
                border: "2px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.82)",
                fontSize: "16px",
                lineHeight: 1,
              }}
            >
              ✉ メール再送
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
