"use client";

export default function ReserveConfirmPage() {
  const customerName = "〇〇　〇〇";
  const menuName = "整体コース"; // ←「深整コース」にすると案内文が切り替わります
  const menuTime = "60分";
  const options = ["巡りシェイプ1部位", "頭部解放"];
  const totalTime = "90分";
  const reserveDate = "2026/4/17(金)";
  const reserveTime = "11:00〜12:30";

  const isShinseiCourse = menuName.includes("深整");

  const timeNote = isShinseiCourse
    ? "※施術時間とは別に、お茶やお着替え等のお時間をご用意しております"
    : "※施術時間にはお着替え等のお時間も含まれております";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e9e4de",
        display: "flex",
        justifyContent: "center",
        padding: "8px 10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#f7f4f0",
          borderRadius: "28px",
          padding: "8px 16px 22px",
          boxSizing: "border-box",
          boxShadow: "0 8px 24px rgba(135, 102, 90, 0.06)",
        }}
      >
        <div
          style={{
            background: "#dcc5b0",
            borderRadius: "20px",
            textAlign: "center",
            padding: "16px 12px",
            color: "#4f3428",
            fontSize: "28px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            marginBottom: "18px",
          }}
        >
          ご予約内容の確認
        </div>

        <div
          style={{
            background: "rgba(243, 225, 230, 0.82)",
            borderRadius: "18px",
            padding: "18px 20px",
            color: "#7a4f4f",
            fontSize: "26px",
            letterSpacing: "0.1em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            marginBottom: "18px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.65), 0 6px 18px rgba(231, 191, 203, 0.18)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {customerName} 様
        </div>

        <section
          style={{
            position: "relative",
            background: "#e9e3de",
            borderRadius: "22px",
            padding: "18px 18px 22px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              border: "2px solid #dba18f",
              borderRadius: "24px",
              background: "#f4f0ec",
              padding: "24px 22px 22px",
              boxShadow: "0 2px 8px rgba(178, 132, 117, 0.10)",
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "#5b3b2f",
                fontSize: "30px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                marginBottom: "22px",
              }}
            >
              {menuName}　{menuTime}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5.2em 1fr",
                columnGap: "0.2em",
                alignItems: "start",
                color: "#946e63",
                fontSize: "17px",
                lineHeight: 1.9,
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                letterSpacing: "0.03em",
              }}
            >
              <div style={{ whiteSpace: "nowrap" }}>オプション：</div>
              <div>
                {options.map((option) => (
                  <div key={option}>{option}</div>
                ))}
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
                letterSpacing: "0.04em",
                marginBottom: "18px",
              }}
            >
              所要時間： {totalTime}
            </div>

            <div
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                lineHeight: 1.7,
                color: "#6a4337",
                background: "rgba(243, 225, 230, 0.62)",
                padding: "6px 14px 8px",
                borderRadius: "999px",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.58), 0 3px 10px rgba(231, 191, 203, 0.12)",
                whiteSpace: "nowrap",
                maxWidth: "calc(100% - 140px)",
              }}
            >
              ご予約日時：{reserveDate}　{reserveTime}
            </div>

            <div
              style={{
                marginTop: "10px",
                color: isShinseiCourse ? "#7f554f" : "#8b7268",
                fontSize: isShinseiCourse ? "14px" : "13px",
                lineHeight: 1.8,
                letterSpacing: "0.01em",
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                background: isShinseiCourse
                  ? "rgba(243, 225, 230, 0.28)"
                  : "transparent",
                display: "inline-block",
                padding: isShinseiCourse ? "4px 10px 5px" : "0",
                borderRadius: isShinseiCourse ? "999px" : "0",
                boxShadow: isShinseiCourse
                  ? "inset 0 1px 0 rgba(255,255,255,0.45)"
                  : "none",
              }}
            >
              {timeNote}
            </div>
          </div>

          <img
            src="/images/tea-confirm.png"
            alt=""
            style={{
              position: "absolute",
              right: "20px",
              bottom: "18px",
              width: "122px",
              opacity: 0.3,
              filter:
                "brightness(1.1) contrast(0.96) saturate(0.95) drop-shadow(0 1px 2px rgba(255,255,255,0.6))",
              mixBlendMode: "normal",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </section>

        <div
          style={{
            marginTop: "14px",
            padding: "0 6px",
            color: "#8f766a",
            fontSize: "13px",
            lineHeight: 1.9,
            letterSpacing: "0.01em",
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
            width: "100%",
            marginTop: "18px",
            border: "none",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #e2a0b2 0%, #d88fa3 100%)",
            color: "#fffdfb",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            padding: "18px 16px",
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(210, 140, 160, 0.18)",
          }}
        >
          この内容で予約する
        </button>
      </div>
    </main>
  );
}
