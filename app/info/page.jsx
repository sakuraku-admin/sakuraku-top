"use client";

export default function InfoPage() {
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
        padding: "32px 16px 32px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "rgba(255, 250, 246, 0.88)",
            borderRadius: "28px",
            padding: "28px 20px 24px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(110, 80, 65, 0.06)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                color: "#7a5a4d",
                fontSize: "clamp(13px, 3vw, 15px)",
                letterSpacing: "0.08em",
                lineHeight: 1.6,
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                marginBottom: "6px",
              }}
            >
              プライベート整体サロン
            </div>

            <div
              style={{
                color: "#d98d8a",
                fontSize: "clamp(34px, 8vw, 46px)",
                lineHeight: 1.1,
                letterSpacing: "0.12em",
                fontFamily:
                  '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                textShadow: "0 1px 6px rgba(255,255,255,0.28)",
              }}
            >
              さく楽
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(120, 89, 74, 0.14)",
              marginBottom: "18px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  color: "#6d4d3f",
                  fontSize: "clamp(15px, 3.7vw, 17px)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  marginBottom: "4px",
                }}
              >
                営業時間
              </div>
              <div
                style={{
                  color: "#7f6257",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                  lineHeight: 1.8,
                  letterSpacing: "0.03em",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                11:00～20:00
              </div>
            </div>

            <div>
              <div
                style={{
                  color: "#6d4d3f",
                  fontSize: "clamp(15px, 3.7vw, 17px)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  marginBottom: "4px",
                }}
              >
                営業日
              </div>
              <div
                style={{
                  color: "#7f6257",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                  lineHeight: 1.8,
                  letterSpacing: "0.03em",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                年中無休（不定休あり）
              </div>
            </div>

            <div>
              <div
                style={{
                  color: "#6d4d3f",
                  fontSize: "clamp(15px, 3.7vw, 17px)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  marginBottom: "4px",
                }}
              >
                住所
              </div>
              <div
                style={{
                  color: "#7f6257",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                  lineHeight: 1.8,
                  letterSpacing: "0.03em",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                千葉県我孫子市我孫子1-12-22
                <br />
                ディアコートN803
              </div>
            </div>

            <div>
              <div
                style={{
                  color: "#6d4d3f",
                  fontSize: "clamp(15px, 3.7vw, 17px)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                  marginBottom: "4px",
                }}
              >
                アクセス
              </div>
              <div
                style={{
                  color: "#7f6257",
                  fontSize: "clamp(11px, 2.6vw, 13px)",
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  fontFamily:
                    '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
                }}
              >
                我孫子駅（北口）から徒歩1分
<br />
常陽銀行と「はなぜん」の間の通路を進み、
<br />
左手に「CONKS」という美容室の入ったマンションの8階になります。
<br />
一階エントランスにオートロックの自動ドアがございますので
<br />
「803」を呼び出してお入りください。
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(120, 89, 74, 0.14)",
              marginTop: "18px",
              marginBottom: "16px",
            }}
          />

          <div
            style={{
              color: "#84675d",
              fontSize: "clamp(13px, 3.2vw, 15px)",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
              fontFamily:
                '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              textAlign: "center",
              marginBottom: "18px",
            }}
          >
            ご不明な点がありましたらお気軽にLINEからお問い合わせください。
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "999px",
                background: "linear-gradient(180deg, #e8a3b3 0%, #d98fa2 100%)",
                color: "#fffdfb",
                fontSize: "clamp(16px, 4vw, 19px)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "14px 16px",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(210, 140, 160, 0.14)",
                fontFamily:
                  '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
              }}
            >
              ホームへ戻る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
