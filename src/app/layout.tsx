import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
export const metadata: Metadata = {
  title: "Опросы в реальном времени",
  description: "Создавайте опросы и голосуйте в реальном времени",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
