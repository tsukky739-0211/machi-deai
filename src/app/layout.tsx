import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://machi-deai.vercel.app";

export const metadata: Metadata = {
  title: "街deai - 知らなかった街に、出会おう",
  description:
    "好きな街を選ぶと、似た雰囲気の穴場な街に出会える。アド街ック天国風ランキングで街の魅力を発見しよう。",
  openGraph: {
    title: "街deai - 知らなかった街に、出会おう",
    description:
      "好みのライフスタイルを選ぶだけで、あなたにぴったりの穴場な街が見つかる。東京100街を収録。",
    type: "website",
    url: siteUrl,
    siteName: "街deai",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "街deai - 知らなかった街に、出会おう",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "街deai - 知らなかった街に、出会おう",
    description:
      "好みのライフスタイルを選ぶだけで、あなたにぴったりの穴場な街が見つかる。東京100街を収録。",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
