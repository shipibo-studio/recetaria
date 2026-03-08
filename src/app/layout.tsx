import type { Metadata } from "next";
import { Andada_Pro, Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300"],
});

const andadaPro = Andada_Pro({
  variable: "--font-andada-pro",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "RecetarIA",
  description: "Aplicación web de sugerencias de recetas con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${andadaPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
