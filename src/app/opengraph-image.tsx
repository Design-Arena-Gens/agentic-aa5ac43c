import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "80px",
          boxSizing: "border-box",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#f6f4ff",
          background:
            "radial-gradient(140% 120% at 95% 10%, rgba(102, 255, 230, 0.25), transparent 60%)," +
            " radial-gradient(130% 110% at 0% 100%, rgba(141, 76, 255, 0.6), #050014)",
          fontFamily: '"Geist", "Inter", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "uppercase",
            letterSpacing: "0.5em",
            fontSize: 28,
            color: "#bba8ff",
          }}
        >
          <span>Evo</span>
          <span style={{ fontSize: 22, letterSpacing: "0.2em", color: "#7ef4ea" }}>
            Consulting AI Agency
          </span>
        </div>

        <div style={{ maxWidth: 720 }}>
          <h1
            style={{
              fontSize: 80,
              lineHeight: 1.04,
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Architect intelligent systems that compound your advantage.
          </h1>
          <p
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 640,
              color: "rgba(230, 224, 255, 0.88)",
            }}
          >
            Strategy. Agents. Automations. Evo ships production-grade AI experiences with measurable ROI.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(230, 224, 255, 0.75)",
          }}
        >
          <span>AI Consulting</span>
          <span>AI Agents</span>
          <span>Automations</span>
          <span>AI Web</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
