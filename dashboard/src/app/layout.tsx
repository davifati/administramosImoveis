export const dynamic = 'force-static';
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import React from "react"
import "./globals.css"
import { siteConfig } from "./siteRotas"


export const metadata: Metadata = {
  metadataBase: new URL("https://propius.com"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Administramos Imóveis",
    `${siteConfig.name}`,
    "gestão de boletos de imovéis",
    `${siteConfig.description}`,
    `${siteConfig.name} App`,
  ],
  authors: [
    {
      name: siteConfig.name,
      url: "",
    },
  ],
  creator: `${siteConfig.name} All rights reserved.`,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/propius_favico.ico",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`
          ${GeistSans.className} 
          overflow-x-hidden 
          overflow-y-scroll 
          scroll-auto 
          bg-gray-50 
          antialiased 
          selection:bg-blue-100
          selection:text-blue-700 
          dark:bg-gray-950`
        }
      >
        <ThemeProvider
          defaultTheme="system"
          disableTransitionOnChange
          attribute="class"
        >
          <NuqsAdapter>
            <div>{children}</div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
