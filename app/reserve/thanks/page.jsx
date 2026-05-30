"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const USER_STORAGE_KEY = "sakurakuUser";

function ThanksContent() {
  const searchParams = useSearchParams();

  const [menuName, setMenuName] = useState("");
  const [menuTime, setMenuTime] = useState("");
  const [options, setOptions] = useState([]);
  const [reserveDate, setReserveDate] = useState("");
  const [reserveTime, setReserveTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReservationLoaded, setIsReservationLoaded] = useState(false);

  useEffect(() => {
    const loadReservation = async () => {
      try {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (!savedUser) {
          window.location.href = "/register";
          return;
        }

        const parsedUser = JSON.parse(savedUser);

        if (!parsedUser?.isLoggedIn) {
          window.location.href = "/register";
          return;
        }

        const reservationId = searchParams.get("id");

        if (!reservationId) {
          setIsLoading(false);
          setIsReservationLoaded(false);
          return;
        }

        const reservationRef = doc(db, "reservations", reservationId);
        const reservationSnap = await getDoc(reservationRef);

        if (!reservationSnap.exists()) {
          setIsLoading(false);
          setIsReservationLoaded(false);
          return;
        }

        const reservationData = reservationSnap.data();

        if (
          parsedUser?.userId &&
          reservationData?.customerId &&
          reservationData.customerId !== parsedUser.userId
        ) {
          setIsLoading(false);
          setIsReservationLoaded(false);
          return;
        }

        setMenuName(reservationData.menuName || "");
        setMenuTime(reservationData.menuTime || "");
        setOptions(
          Array.isArray(reservationData.options) ? reservationData.options : []
        );
        setReserveDate(reservationData.reserveDate || "");
        setReserveTime(reservationData.reserveTime || "");
        setIsReservationLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("予約データの読み込みに失敗しました", error);
        setIsLoading(false);
        setIsReservationLoaded(false);
      }
    };

    loadReservation();
  }, [searchParams]);

  const hasOptions = options && options.length > 0;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.titleBar}>ご予約ありがとうございます</div>

        <div style={styles.message}>
          ご予約を承りました。
          <br />
          ご来店を心よりお待ちしております🌸
        </div>

        <section style={styles.infoCard}>
          <div style={styles.pinkCard}>
            {isLoading ? (
              <div style={styles.loadingText}>ご予約内容を確認しています。</div>
            ) : isReservationLoaded ? (
              <>
                <div style={styles.datePill}>
                  <div style={styles.dateLabel}>ご予約日時</div>
                  <div style={styles.dateValue}>
                    {reserveDate}　{reserveTime}
                  </div>
                </div>

                <div style={styles.subInfo}>
                  <div style={styles.menuText}>
                    {menuName}
                    {menuTime ? `（${menuTime}）` : ""}
                  </div>

             {hasOptions && (
  <div style={styles.optionBlock}>
    {menuName.includes("深整") ? (
      <div style={styles.optionItem}>
        カスタマイズ選択済み
      </div>
    ) : (
      options.map((option) => (
        <div key={option} style={styles.optionItem}>
          {option}
        </div>
      ))
    )}
  </div>
)}
                </div>
              </>
            ) : (
              <div style={styles.loadingText}>
                ご予約内容の確認に失敗しました。
                <br />
                予約履歴ページよりご確認ください。
              </div>
            )}
          </div>

          <div style={styles.noteArea}>
            <div style={styles.note}>
              <div>ご不明な点がありましたら</div>
              <div>お気軽にLINEでお問合せください</div>
            </div>

            <img
              src="/images/tea-confirm.png"
              alt=""
              style={styles.teaImage}
            />
          </div>
        </section>

        <button
          onClick={() => (window.location.href = "/")}
          style={styles.backButton}
        >
          トップへ戻る
        </button>
      </div>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <ThanksContent />
    </Suspense>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/mokume.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "18px 16px 24px",
    boxSizing: "border-box",
    fontFamily:
      '"Hiragino Mincho ProN", "Yu Mincho", "Hiragino Kaku Gothic ProN", "Yu Gothic", serif',
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    background: "#FFF5EC",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "28px",
    padding: "14px 16px 16px",
    boxShadow: "0 8px 18px rgba(91, 61, 43, 0.06)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  titleBar: {
    background: "#D8F5DE",
    borderRadius: "20px",
    padding: "14px 14px",
    color: "#3e4c47",
    fontSize: "1.32rem",
    marginBottom: "14px",
    letterSpacing: "0.04em",
    lineHeight: 1.5,
  },

  message: {
    color: "#7a5a5a",
    fontSize: "0.97rem",
    lineHeight: 1.9,
    marginBottom: "16px",
  },

  infoCard: {
    marginBottom: "14px",
  },

  pinkCard: {
    position: "relative",
    width: "100%",
    background:
      "linear-gradient(to bottom, #FFCFD2 75%, rgba(255, 207, 210, 0) 100%)",
    borderRadius: "22px",
    padding: "16px 14px 14px",
    boxSizing: "border-box",
    overflow: "hidden",
    textAlign: "center",
    marginBottom: "8px",
  },

  datePill: {
  maxWidth: "286px",
  margin: "0 auto 14px",
  background: "rgba(255, 255, 255, 0.62)",
  borderRadius: "18px",
  padding: "10px 16px 12px",
  boxShadow: "0 2px 8px rgba(255,255,255,0.25)",
  boxSizing: "border-box",
},

  dateLabel: {
    color: "#8a6671",
    fontSize: "0.88rem",
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    marginBottom: "4px",
  },

  dateValue: {
    color: "#6a4337",
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.7,
    wordBreak: "keep-all",
  },

  subInfo: {
    color: "#6a4337",
    fontSize: "0.9rem",
    lineHeight: 1.9,
    padding: "0 14px",
    textAlign: "center",
  },

  menuText: {
    textAlign: "center",
  },

  optionBlock: {
    marginTop: "6px",
    textAlign: "center",
    lineHeight: 1.55,
  },

  optionItem: {
    textAlign: "center",
    marginTop: "2px",
  },

  loadingText: {
    color: "#6a4337",
    fontSize: "0.9rem",
    lineHeight: 1.8,
    padding: "22px 8px",
    textAlign: "center",
  },

  noteArea: {
    position: "relative",
    minHeight: "62px",
  },

  note: {
    color: "#8b7268",
    fontSize: "0.77rem",
    lineHeight: 1.8,
    marginTop: "2px",
    padding: "0 76px 0 8px",
    textAlign: "center",
  },

  teaImage: {
    position: "absolute",
    right: "12px",
    bottom: "0",
    width: "84px",
    opacity: 0.34,
    filter:
      "brightness(1.08) contrast(0.96) saturate(0.95) drop-shadow(0 1px 2px rgba(255,255,255,0.6))",
    pointerEvents: "none",
    userSelect: "none",
  },

  backButton: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
    color: "#fff",
    fontSize: "1.18rem",
    padding: "16px",
    cursor: "pointer",
    letterSpacing: "0.03em",
  },
};
