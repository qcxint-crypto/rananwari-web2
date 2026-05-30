"use client";

import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";
import { AssetWarmup } from "./components/AssetWarmup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Portfolio Rafli | RANANWARI</title>
        <meta name="description" content="Engineering Portfolio - CAD 3D Drawing & Machine Design" />
        <link rel="icon" href="/MWA.png" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <AssetWarmup />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
