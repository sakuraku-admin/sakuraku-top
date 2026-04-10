"use client";

export default function ReserveConfirmPage() {
  const customerName = "〇〇　〇〇";
  const menuName = "整体コース";
  const menuTime = "60分";
  const options = ["巡りシェイプ1部位", "頭部解放"];
  const totalTime = "90分";
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7f2ec 0%, #f3ede6 48%, #f6f1ea 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "20px 14px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(255,255,255,0.42)",
          borderRadius: "28px",
          padding: "20px 16px 22px",
          boxSizing: "border-box",
          boxShadow: "0 10px 30px rgba(120, 93, 74, 0.08)",
          backdropFilter: "blur(3px)",
        }}
      >
        <div
          style={{
            background: "#dcc5b0",
            color: "#4f3428",
            borderRadius: "18px",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            padding: "12px 10px 14px",
            marginBottom: "18px",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
          }}
        >
          ご予約内容の確認
        </div>

        <div
          style={{
            background: "rgba(221, 211, 201, 0.68)",
            color: "#6c4c3c",
            borderRadius: "18px",
            padding: "18px 20px",
            fontSize: "26px",
            letterSpacing: "0.08em",
            marginBottom: "18px",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
          }}
        >
          {customerName} 様
        </div>

        <section
          style={{
            position: "relative",
            background: "rgba(233, 226, 219, 0.72)",
            borderRadius: "24px",
            padding: "18px 16px 72px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              border: "2px solid rgba(204, 154, 137, 0.9)",
              borderRadius: "24px",
              background: "rgba(255, 251, 248, 0.26)",
              boxShadow:
                "0 3px 10px rgba(191, 145, 128, 0.10), inset 0 1px 0 rgba(255,255,255,0.45)",
              padding: "24px 22px 22px",
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "#5a3a2d",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.11em",
                marginBottom: "20px",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
              }}
            >
              {menuName}　{menuTime}
            </div>

            <div
              style={{
                color: "#866254",
                fontSize: "18px",
                lineHeight: 1.9,
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "5.4em 1fr",
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    whiteSpace: "nowrap",
                    letterSpacing: "0.06em",
                  }}
                >
                  オプション：
                </div>
                <div>
                  {options.map((option, index) => (
                    <div key={option} style={{ marginTop: index === 0 ? 0 : "2px" }}>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              color: "#5f4033",
              fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            }}
          >
            <div
              style={{
                fontSize: "17px",
                letterSpacing: "0.08em",
                marginBottom: "4px",
              }}
            >
              所要時間：
              <span
                style={{
                  fontSize: "18px",
                  marginLeft: "6px",
                }}
              >
                {totalTime}
              </span>
            </div>

            <div
              style={{
                fontSize: "17px",
                letterSpacing: "0.08em",
                marginTop: "18px",
                marginBottom: "6px",
              }}
            >
              ご予約日：
            </div>

            <div
              style={{
                fontSize: "18px",
                lineHeight: 1.8,
                letterSpacing: "0.04em",
              }}
            >
              <div>{reserveDate}</div>
              <div style={{ paddingLeft: "2.6em" }}>{reserveTime}</div>
            </div>
          </div>

          <img
            src="/images/tea-illust.png"
            alt="お茶のイラスト"
            style={{
              position: "absolute",
              right: "14px",
              bottom: "18px",
              width: "118px",
              opacity: 0.2,
              filter:
                "grayscale(10%) brightness(1.08) contrast(0.92) blur(0.2px) drop-shadow(0 1px 1px rgba(255,255,255,0.45))",
              mixBlendMode: "multiply",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </section>

        <div
          style={{
            marginTop: "16px",
            padding: "0 4px",
            color: "#8a6e62",
            fontSize: "13px",
            lineHeight: 1.9,
            letterSpacing: "0.02em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
          }}
        >
          <div>※ご予約当日のご変更・キャンセル等はLINEにてうけたまわります。</div>
          <div>
            ※当サロンは完全入れ替え制になりますので、なるべくご予約時間ちょうどを目安にお越しいただけますと幸いです。
          </div>
        </div>

        <button
          type="button"
          style={{
            marginTop: "18px",
            width: "100%",
            border: "none",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, #e5a4b6 0%, #db95a8 52%, #d4869b 100%)",
            color: "#fffdfb",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "18px 16px",
            boxShadow: "0 10px 22px rgba(214, 135, 156, 0.18)",
            cursor: "pointer",
          }}
        >
          この内容で予約する
        </button>
      </div>
    </main>
  );
}
