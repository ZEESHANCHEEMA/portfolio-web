import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { profile } from "@/content/profile";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeeshannawaz.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.linkedIn }],
  creator: profile.name,
  keywords: [
    "Zeeshan Nawaz",
    "Web Developer",
    "Mobile Application Developer",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Frontend Developer",
    "Gujranwala",
    "Pakistan",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Root document shell with fonts, smooth scroll, and SEO metadata. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gujranwala",
      addressCountry: "PK",
    },
    sameAs: [profile.linkedIn, "https://github.com/ZEESHANCHEEMA"],
    knowsAbout: ["React", "Next.js", "React Native", "TypeScript", "Frontend engineering"],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${profile.name} — Web & Mobile Development`,
    areaServed: "Worldwide",
    provider: { "@type": "Person", name: profile.name },
    address: { "@type": "PostalAddress", addressLocality: "Gujranwala", addressCountry: "PK" },
    serviceType: ["Web Application Development", "Mobile Application Development", "Frontend Architecture Consulting"],
  };

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
