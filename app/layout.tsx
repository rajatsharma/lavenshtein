import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edit Distance Calculator",
  description: "Calculate Levenshtein distance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
