import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/config/business";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cattle & Livestock Hauling in Missouri | Pemberton Cattle Company",
    template: "%s | Pemberton Cattle Company",
  },
  description:
    "Pemberton Cattle Company provides cattle, livestock, and agricultural hauling from Richland, Missouri. Request a local, regional, or long-distance haul online.",
  keywords: [
    "cattle hauling Missouri",
    "livestock hauling Missouri",
    "cattle transport Richland MO",
    "agricultural hauling Missouri",
    "farm equipment hauling Missouri",
    "sale barn transport Missouri",
    "cattle truck Missouri",
    "livestock trailer Missouri",
  ],
  authors: [{ name: BUSINESS.businessName }],
  creator: BUSINESS.businessName,
  publisher: BUSINESS.businessName,
  metadataBase: new URL("https://pembertonco.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pembertonco.com",
    siteName: BUSINESS.businessName,
    title: "Cattle & Livestock Hauling in Missouri | Pemberton Cattle Company",
    description: "Cattle, livestock, and agricultural hauling from Richland, Missouri. Request a haul online — local, regional, or long-distance.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pemberton Cattle Company — Richland, Missouri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pemberton Cattle Company — Cattle & Livestock Hauling, Missouri",
    description: "Cattle, livestock, and agricultural hauling based in Richland, Missouri.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "TransportationService"],
              name: BUSINESS.businessName,
              description: "Cattle, livestock, and agricultural hauling based in Richland, Missouri.",
              url: "https://pembertonco.com",
              logo: "https://pembertonco.com/logo.png",
              image: "https://pembertonco.com/logo.png",
              address: { "@type": "PostalAddress", addressLocality: BUSINESS.city, addressRegion: BUSINESS.state, addressCountry: "US" },
              geo: { "@type": "GeoCoordinates", latitude: BUSINESS.latitude, longitude: BUSINESS.longitude },
              areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: BUSINESS.latitude, longitude: BUSINESS.longitude }, geoRadius: "482803" },
              serviceType: ["Cattle Hauling", "Livestock Hauling", "Agricultural Hauling", "Farm Equipment Hauling", "Sale Barn Transportation"],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-brand-black text-brand-off-white">
        {children}
      </body>
    </html>
  );
}
