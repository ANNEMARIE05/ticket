import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { CatalogProvider } from "@/context/CatalogContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  title: "NGTICKET — Billetterie officielle",
  description: "Réservez vos places pour les matchs FECAFOOT, concerts et événements au Cameroun. 100 % cashless. Développé par NGSER.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-ngBlue selection:text-white">
        <AppProvider>
          <CatalogProvider>
            {children}
          </CatalogProvider>
        </AppProvider>
      </body>
    </html>
  );
}
