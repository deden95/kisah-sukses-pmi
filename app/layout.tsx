import { TailwindIndicator } from "@/components/main";
import { seoData } from "@/config/root/seo";
import { getUrl } from "@/lib/utils";
import "@/styles/tailwind.css";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Blog",
    default: seoData.title,
    absolute: seoData.absoluteTitle,
  },
  generator: seoData.author.name,
  applicationName: seoData.title,
  description: seoData.description,
  referrer: "origin-when-cross-origin",
  keywords: seoData.keywords,
  authors: [
    {
      name: seoData.author.name,
      url: seoData.author.githubUrl,
    },
  ],
  creator: seoData.author.name,
  publisher: seoData.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl()),
  alternates: {
    canonical: "/",
  },
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  //   userScalable: false,
  //   viewportFit: "cover",
  // },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicons/favicon.ico"],
    apple: [
      { url: "/favicons/favicon.png" },
    ],
  },

  manifest: `${getUrl()}/favicons/manifest.json`,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    title: seoData.title,
    description: seoData.description,
    siteName: seoData.title,
    images: [
      {
        // url: getOgImageUrl(metaData.title, metaData.subTitle, metaData.tags, '/'),
        url: `${getUrl()}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: seoData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoData.ogTitle,
    description: seoData.description,
    // images: [getOgImageUrl(metaData.title, metaData.subTitle, metaData.tags, '/')],
    images: `${getUrl()}/images/twitter-image.png`,
    creator: seoData.author.githubUrl,
  },
  appleWebApp: {
    capable: true,
    title: seoData.title,
    statusBarStyle: "black-translucent",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <div className="bg-white font-sans">
          {children}
          {/* <VercelAnalytics /> - Temporarily disabled due to TrustedScript CSP error */}
          <Toaster position="top-center" />
          <TailwindIndicator />
        </div>
      </body>
    </html>
  );
}
