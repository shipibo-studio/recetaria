import type { Metadata } from "next";
import { Andada_Pro, Archivo } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300&family=Andada+Pro:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var html = document.documentElement;
                  html.classList.remove('dark');
                  html.style.colorScheme = 'light';
                  localStorage.removeItem('theme');
                  localStorage.setItem('theme', 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${andadaPro.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
