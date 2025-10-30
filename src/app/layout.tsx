import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-aa5ac43c.vercel.app"),
  title: "Evo | Consulting AI Agency",
  description:
    "Evo partners with forward-thinking companies to architect AI strategies, deploy intelligent agents, and automate operations with measurable impact.",
  keywords: [
    "AI consulting",
    "AI agency",
    "AI automation",
    "AI agents",
    "AI strategy",
    "Evo Consulting",
  ],
  openGraph: {
    title: "Evo | Consulting AI Agency",
    description:
      "Architect intelligent systems, deploy high-impact AI agents, and automate at scale with Evo.",
    url: "https://agentic-aa5ac43c.vercel.app",
    siteName: "Evo",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Evo Consulting AI Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evo | Consulting AI Agency",
    description:
      "Architect intelligent systems, deploy high-impact AI agents, and automate at scale with Evo.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
