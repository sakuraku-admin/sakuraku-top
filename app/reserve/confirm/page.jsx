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
            background: "#ddd7d1",
            borderRadius: "18px",
            padding: "18px 20px",
            color: "#7b5a49",
            fontSize: "26px",
            letterSpacing: "0.1em",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
            marginBottom: "18px",
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
              border: "2px solid #d29c8a",
              borderRadius: "24px",
              background: "#f4f0ec",
              padding: "24px 22px 22px",
              boxShadow: "0 2px 8px rgba(178, 132, 117, 0.10)",
              marginBottom: "28px",
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
                color: "#8d695c",
                fontSize: "17px",
                lineHeight: 1.9,
                fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", serif',
                letterSpacing: "0.03em",
              }}
            >
              <div style={{ whiteSpace: "nowrap" }}>オプション：</div>
              <div>
                <div>{options[0]}</div>
                <div>{options[1]}</div>
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
                marginBottom: "20px",
              }}
            >
              所要時間： {totalTime}
            </div>

            <div
              style={{
                fontSize: "17px",
                letterSpacing: "0.04em",
                lineHeight: 1.8,
              }}
            >
              ご予約日：{reserveDate}　{reserveTime}
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
              opacity: 0.18,
              filter:
                "brightness(1.03) contrast(0.95) grayscale(8%) drop-shadow(0 1px 2px rgba(255,255,255,0.55))",
              mixBlendMode: "multiply",
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
