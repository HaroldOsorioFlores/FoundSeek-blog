import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoundSeek",
  description:
    "Tu fuente confiable para tutoriales de tecnología y mucho más. En FoundSeek, encontrarás contenido diverso y de calidad para todos los intereses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900`}
      >
        <Header />
        {children}
        {/* <SignUpNewsletter /> */}
        <Footer />
      </body>
    </html>
  );
}
