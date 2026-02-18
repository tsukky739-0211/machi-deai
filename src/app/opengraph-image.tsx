import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "街deai - 知らなかった街に、出会おう";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#1c1410",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "serif",
        }}
      >
        {/* ロゴ */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "48px",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              color: "#e8673a",
              fontWeight: "700",
              letterSpacing: "-1px",
            }}
          >
            街
          </span>
          <span
            style={{
              fontSize: "48px",
              color: "#f5f0eb",
              fontWeight: "300",
              letterSpacing: "2px",
            }}
          >
            deai
          </span>
        </div>

        {/* メインコピー */}
        <div
          style={{
            fontSize: "72px",
            color: "#f5f0eb",
            fontWeight: "700",
            lineHeight: 1.25,
            letterSpacing: "-1px",
            marginBottom: "32px",
          }}
        >
          知らなかった街に、
          <br />
          出会おう。
        </div>

        {/* サブコピー */}
        <div
          style={{
            fontSize: "28px",
            color: "#a89880",
            fontWeight: "400",
            letterSpacing: "0.5px",
          }}
        >
          好みのvibe を選ぶだけで、ぴったりの穴場な街が見つかる。
        </div>

        {/* 右下にURL */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "100px",
            fontSize: "22px",
            color: "#6b5a4a",
            letterSpacing: "1px",
          }}
        >
          machi-deai.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
