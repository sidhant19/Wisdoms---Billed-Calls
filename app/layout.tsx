import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import logo from '../components/assets/MetaLogo.png'
const iter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "wisdom's.",
  description: 'The best place to find experts in your field.',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href={logo.src} />
      <body className={`${iter.className} antialiased`}>
      <ThemeProvider
          attribute='class'
          defaultTheme='system'
      >

          {children}



      </ThemeProvider>
      </body>
    </html>
  )
}
