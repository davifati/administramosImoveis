import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals2.css";

import { Navbar } from "./_components/Navbar";
import { Footer } from "react-day-picker";
import { saasName, saasSlogan } from "../constant";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${saasName} - ${saasSlogan}`,
  description: `${saasSlogan}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Navbar />
          <div>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
