"use client";

import { useEffect, useState } from "react";

const USER_STORAGE_KEY = "sakurakuUser";
const CURRENT_RESERVATION_STORAGE_KEY = "sakurakuCurrentReservation";
const RESERVATIONS_STORAGE_KEY = "sakurakuReservations";
const AVAILABILITY_STORAGE_KEY = "sakurakuAvailability";

export default function ReserveCheckPage() {
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
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

      const savedReservation = localStorage.getItem(
        CURRENT_RESERVATION_STORAGE_KEY
      );

      if (savedReservation) {
        setReservation(JSON.parse(savedReservation));
      }
    } catch (error) {
      console.error("予約情報の読み込みに失敗しました", error);
    }
  }, []);

  const reserveDate = reservation?.reserveDate || "現在ご予約はありません";
  const reserveTime = reservation?.reserveTime || "";

  const menuName = reservation?.menuName || "";
  const menuTime = reservation?.menuTime || "";
  const menuPrice = reservation?.price || "";

  const options = Array.isArray(reservation?.options) ? reservation.options : [];

  const totalPrice = reservation?.totalPrice || "";

  const removeCurrentReservationAndRestoreSlot = () => {
    localStorage.removeItem(CURRENT_RESERVATION_STORAGE_KEY);

    const savedReservations = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    const reservations = savedReservations ? JSON.parse(savedReservations) : [];

    const updatedReservations = Array.isArray(reservations)
      ? reservations.filter((item) => item.id !== reservation.id)
      : [];

    localStorage.setItem(
      RESERVATIONS_STORAGE_KEY,
      JSON.stringify(updatedReservations)
    );

    const savedAvailability = localStorage.getItem(AVAILABILITY_STORAGE_KEY);

    if (savedAvailability && reservation.date && reservation.startTime) {
      const availability = JSON.parse(savedAvailability);

      const currentDay = Array.isArray(availability[reservation.date])
        ? availability[reservation.date]
        : [];

      const restoredDay = currentDay.includes(reservation.startTime)
        ? currentDay
        : [...currentDay, reservation.startTime].sort();

      const nextAvailability = {
        ...availability,
        [reservation.date]: restoredDay,
      };

      localStorage.setItem(
        AVAILABILITY_STORAGE_KEY,
        JSON.stringify(nextAvailability)
      );
    }
  };

  const handleChangeReservation = () => {
    if (!reservation) return;

    try {
      removeCurrentReservationAndRestoreSlot();
      window.location.href = "/menu";
    } catch (error) {
      console.error("予約変更処理に失敗しました", error);
      alert("予約変更処理に失敗しました。もう一度お試しください。");
    }
  };

  const handleCancelReservation = () => {
    if (!reservation) return;

    const confirmed = window.confirm("ご予約を取り消しますか？");
    if (!confirmed) return;

    try {
      removeCurrentReservationAndRestoreSlot();

      alert("ご予約を取り消しました");
      window.location.href = "/";
    } catch (error) {
      console.error("予約の取り消しに失敗しました", error);
      alert("予約の取り消しに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/mokume.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "24px 16px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "390px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: 0,
            width: "100%",
            height: "92px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          <img
            src="/images/hedera.png"
            alt="hedera decoration"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              userSelect: "none",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "68%",
            maxWidth: "250px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12px",
            marginBottom: "14px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,248,243,0.46) 55%, rgba(255,245,239,0.34) 100%)",
            borderRadius: "18px",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            boxShadow:
              "0 3px 10px rgba(120, 90, 70, 0.04), inset 0 1px 0 rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <span
            style={{
              color: "#6e4b41",
              fontSize: "clamp(16px, 4.2vw, 20px)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textShadow: "0 1px 3px rgba(255,255,255,0.18)",
            }}
          >
            ご予約内容
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "340px",
            background: "rgba(255, 250, 246, 0.9)",
            borderRadius: "28px",
            padding: "14px 14px 16px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(110, 80, 65, 0.06)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "22px",
              padding: "12px 10px 11px",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                color: "#6a4337",
                fontSize: "clamp(16px, 4.4vw, 22px)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                lineHeight: 1.35,
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              }}
            >
              ご予約日時：{reserveDate}
            </div>
            <div
              style={{
                color: "#6a4337",
                fontSize: "clamp(16px, 4.2vw, 21px)",
                fontWeight: 600,
                letterSpacing: "0.01em",
                lineHeight: 1.3,
                marginTop: "2px",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              }}
            >
              {reserveTime}
            </div>
          </div>

          {reservation && (
            <>
              <div
                style={{
                  textAlign: "center",
                  color: "#7d5b50",
                  fontSize: "clamp(16px, 4vw, 20px)",
                  lineHeight: 1.55,
                  letterSpacing: "0.02em",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  marginBottom: "2px",
                }}
              >
                <div>
                  {menuName}（{menuTime}）
                </div>
                <div
                  style={{
                    fontSize: "clamp(14px, 3.6vw, 18px)",
                    color: "#8d7066",
                    marginTop: "1px",
                  }}
                >
                  {menuPrice}
                </div>
              </div>

              <div
                style={{
                  color: "#8c6c61",
                  fontSize: "clamp(11px, 2.9vw, 14px)",
                  lineHeight: 1.65,
                  letterSpacing: "0.01em",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  textAlign: "center",
                  marginBottom: "8px",
                }}
              >
                {options.length > 0 && (
                  <>
                    <div
                      style={{
                        marginBottom: "2px",
                        fontSize: "clamp(12px, 3.1vw, 14px)",
                      }}
                    >
                      オプション
                    </div>
                    <div
                      style={{
                        color: "#9a7f76",
                        fontSize: "clamp(10px, 2.7vw, 13px)",
                        lineHeight: 1.7,
                      }}
                    >
                      {options.map((option, index) => (
                        <span key={option}>
                          {index === 0 ? "" : "　"}
                          {option}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {totalPrice && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#6f4b41",
                    fontSize: "clamp(16px, 4vw, 19px)",
                    lineHeight: 1.45,
                    letterSpacing: "0.02em",
                    fontFamily:
                      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                    marginBottom: "10px",
                    borderBottom: "1px solid rgba(120, 89, 74, 0.25)",
                    paddingBottom: "4px",
                    display: "block",
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  合計　{totalPrice}
                </div>
              )}
            </>
          )}

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(120, 89, 74, 0.12)",
              marginBottom: "10px",
            }}
          />

          <div
            style={{
              color: "#84675d",
              fontSize: "clamp(10px, 2.75vw, 13px)",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            {reservation ? (
              <>
                <div>ご来店を心よりお待ちしております🌸</div>
                <div>
                  ご不明な点がありましたらお気軽にLINEからお問合せください
                </div>
              </>
            ) : (
              <div>現在表示できるご予約はありません。</div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            {reservation && (
              <>
                <button
                  type="button"
                  onClick={handleChangeReservation}
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(180deg, #dfa4b5 0%, #d291a4 100%)",
                    color: "#fffdfb",
                    fontSize: "clamp(16px, 4.2vw, 22px)",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    padding: "13px 16px",
                    cursor: "pointer",
                    boxShadow: "0 7px 16px rgba(210, 140, 160, 0.13)",
                    fontFamily:
                      '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
                  }}
                >
                  予約を変更する
                </button>

                <button
                  type="button"
                  onClick={handleCancelReservation}
                  style={{
                    width: "100%",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.82)",
                    color: "#7d5b50",
                    fontSize: "clamp(15px, 3.9vw, 20px)",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    padding: "12px 16px",
                    cursor: "pointer",
                    border: "1.5px solid rgba(145, 112, 101, 0.16)",
                    boxShadow: "none",
                    fontFamily:
                      '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  }}
                >
                  予約を取り消す
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: "#8d7066",
                fontSize: "clamp(13px, 3.1vw, 15px)",
                letterSpacing: "0.04em",
                cursor: "pointer",
                padding: "0",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              }}
            >
              戻る
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 0,
            }}
          >
            <button
              type="button"
              onClick={() => {
                window.location.href = "/reserve/history";
              }}
              style={{
                border: "none",
                background: "transparent",
                color: "#8f766a",
                fontSize: "clamp(12px, 2.95vw, 14px)",
                letterSpacing: "0.03em",
                cursor: "pointer",
                padding: "4px 6px",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              過去のご予約を見る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
