import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { DayCountdown } from "@/components/DayCountdown";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Personal MVP",
  description: "Tasks, Habits, Economy and KCAL tracking",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
          <header className="pt-3 px-5 flex justify-end">
            <DayCountdown />
          </header>
          <div className="flex-1 pb-16 flex flex-col">
            {children}
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
