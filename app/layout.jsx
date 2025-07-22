
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://free-aichat.vercel.app'),  // Remove trailing slash for consistency
  title: {
    default: "FreeAI Chat - Free AI Chat Assistant with Multiple Models",
    template: "%s | FreeAI Chat"
  },
  description: "Experience seamless conversations with FreeAI Chat. Switch between Gemini and Groq models for enhanced AI interactions. Free, fast, and no sign-up required.",
  keywords: ["AI chat", "free AI", "Gemini chat", "Groq chat", "AI assistant", "chatbot", "artificial intelligence", "free chatbot"],
  authors: [{ name: "M-Arham07" }],
  creator: "M-Arham07",
  publisher: "FreeAI Chat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FreeAI Chat - Free AI Chat Assistant",
    description: "Experience seamless conversations with multiple AI models. Switch between Gemini and Groq for enhanced AI interactions.",
    url: 'https://free-aichat.vercel.app',  // Remove trailing slash for consistency
    siteName: 'FreeAI Chat',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: '/og-image.jpg', // Add your OG image in public folder
      width: 1200,
      height: 630,
      alt: 'FreeAI Chat Preview'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeAI Chat - Free AI Chat Assistant',
    description: 'Experience seamless conversations with multiple AI models',
    images: ['/og-image.jpg'], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export const viewport = {
  interactiveWidget: 'resizes-content',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="google-site-verification" content="W3wHC93KbFpQsD5atPpV-zi6dHE8U2dq4MeebPWJ-rE" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
