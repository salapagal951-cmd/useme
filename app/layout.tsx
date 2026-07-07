import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studydif.vercel.app"),

  title: {
    default: "StudyDif - AI MCQ & Quiz Generator",
    template: "%s | StudyDif",
  },

  description:
    "Generate AI-powered MCQs and quizzes from topics, notes, PDFs, and images. Study smarter with instant practice questions.",

  keywords: [
    "AI Quiz Generator",
    "AI MCQ Generator",
    "PDF to Quiz",
    "Image to Quiz",
    "Notes to Quiz",
    "Topic to Quiz",
    "Study AI",
    "Exam Preparation",
    "Competitive Exam",
    "StudyDif",
  ],

  authors: [
    {
      name: "StudyDif",
    },
  ],

  creator: "StudyDif",

  publisher: "StudyDif",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studydif.vercel.app",
    siteName: "StudyDif",
    title: "StudyDif - AI MCQ & Quiz Generator",
    description:
      "Generate AI quizzes from topics, notes, PDFs and images instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StudyDif",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "StudyDif - AI MCQ & Quiz Generator",
    description:
      "Generate AI quizzes from topics, notes, PDFs and images instantly.",
    images: ["/og-image.png"],
  },

  icons: {
  icon: "/favicon.ico",
  apple: "/apple-touch-icon.png",
},

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="min-h-full flex flex-col">
  {children}
  <Analytics />
  <SpeedInsights />
</body>
    </html>
  );
}