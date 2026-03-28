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
    <main className="min-h-screen bg-[#f6d2b8] flex items-start justify-center">
      <div className="w-full max-w-[500px] px-2 py-2">
        <div
          className="relative w-full"
          style={{ aspectRatio: "900 / 1600" }}
        >
          <img
            src="/images/touroku.png"
            alt="新規会員登録"
            className="absolute inset-0 h-full w-full object-contain"
          />

          <form onSubmit={handleRegister} className="absolute inset-0">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="お名前"
              className="absolute bg-transparent outline-none text-[20px] text-[#2f2117]"
              style={{
                left: "36%",
                top: "15.2%",
                width: "35.5%",
                height: "4.2%",
                borderRadius: "9999px",
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.35)",
              }}
            />

            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="電話番号"
              className="absolute bg-transparent outline-none text-[20px] text-[#2f2117]"
              style={{
                left: "36%",
                top: "20.8%",
                width: "35.5%",
                height: "4.2%",
                borderRadius: "9999px",
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.35)",
              }}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="メールアドレス"
              className="absolute bg-transparent outline-none text-[20px] text-[#2f2117]"
              style={{
                left: "36%",
                top: "26.2%",
                width: "55.5%",
                height: "4.2%",
                borderRadius: "9999px",
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.35)",
              }}
            />

            <button
              type="submit"
              className="absolute text-[#2f2117] transition hover:scale-[1.02] active:scale-[0.98]"
              style={{
                left: "42%",
                top: "33.2%",
                width: "18%",
                height: "4.8%",
                borderRadius: "24px",
                border: "3px solid #2f2117",
                backgroundColor: "rgba(255,245,238,0.78)",
                fontSize: "34px",
                lineHeight: 1,
              }}
            >
              登録
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
