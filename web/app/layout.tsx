import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JournCode | Master Coding Interviews with AI-Powered Learning",
  description:
    "Accelerate your coding interview preparation with JournCode. Our AI-powered platform helps you master algorithms, data structures, and problem-solving techniques through personalized learning paths and real-time feedback.",
  keywords:
    "LeetCode, coding interviews, algorithm practice, data structures, programming, software engineering, technical interviews, coding practice, problem solving",
  authors: [{ name: "JournCode Team" }],
  openGraph: {
    title: "JournCode | Master Coding Interviews with AI-Powered Learning",
    description:
      "Accelerate your coding interview preparation with JournCode. Our AI-powered platform helps you master algorithms, data structures, and problem-solving techniques.",
    type: "website",
    locale: "en_US",
    siteName: "JournCode",
  },
  twitter: {
    card: "summary_large_image",
    title: "JournCode | Master Coding Interviews with AI-Powered Learning",
    description:
      "Accelerate your coding interview preparation with JournCode. Our AI-powered platform helps you master algorithms, data structures, and problem-solving techniques.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
