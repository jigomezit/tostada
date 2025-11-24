import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soy Músico - Guitarra y Bajo",
  description: "Contrata un músico profesional para tus proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

