import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import PortfolioLayout from "../components/PortfolioLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tim's Portfolio",
  description: "Tim's Portfolio Website",
};

const googleFont = Roboto({
  variable: "--font-google",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleFont.variable}`}>
      <body>
        <PortfolioLayout>{children}</PortfolioLayout>
      </body>
    </html>
  );
}