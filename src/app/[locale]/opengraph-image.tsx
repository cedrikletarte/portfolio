import { ImageResponse } from "next/og";

export const alt = "Cédrik Letarte — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const role = locale === "fr" ? "Développeur Full-Stack" : "Full-Stack Developer";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0a192f",
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(236,72,153,0.35), transparent 60%), radial-gradient(circle at 15% 80%, rgba(111,194,176,0.25), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "#ec4899",
            marginBottom: 24,
          }}
        >
          cedrikletarte.com
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "#e2e8f0",
            lineHeight: 1.1,
          }}
        >
          Cédrik Letarte
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 500,
            color: "#6fc2b0",
            marginTop: 20,
          }}
        >
          {role}
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 6,
            borderRadius: 999,
            background: "#ec4899",
            marginTop: 40,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
