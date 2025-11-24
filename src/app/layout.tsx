import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "E.A Research - Equitable Digital Agriculture",
    template: "%s | E.A Research"
  },
  description: "Research and prototypes on equitable digital agriculture: ASR/voice-first technologies, tokenization systems, zero-knowledge privacy, and socio-technical design for African smallholder farmers.",
  keywords: [
    "digital agriculture",
    "voice-first ASR",
    "speech recognition",
    "African languages",
    "Kiswahili ASR",
    "zero-knowledge privacy",
    "blockchain agriculture",
    "equitable technology",
    "smallholder farmers",
    "agricultural technology",
    "Sub Saharan Africa research"
  ],
  authors: [{ name: "E.A Research Team" }],
  creator: "E.A Research",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://earesearch.org",
    siteName: "E.A Research",
    title: "E.A Research - Equitable Digital Agriculture",
    description: "Research and prototypes on equitable digital agriculture: ASR/voice-first technologies, tokenization systems, zero-knowledge privacy, and socio-technical design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "E.A Research - Equitable Digital Agriculture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E.A Research - Equitable Digital Agriculture",
    description: "Research and prototypes on equitable digital agriculture for African smallholder farmers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased `}>
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
