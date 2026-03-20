import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RateShield - Decode Your Con Edison Bill",
  description:
    "Understand why your electricity bill is high and what you can do about it. RateShield reveals the charges you control vs. the ones you can't.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
