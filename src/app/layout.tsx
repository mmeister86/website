import type { Metadata } from 'next'
import { HK_Grotesk } from './fonts'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Matthias - sort of Webdeveloper',
  description: 'matthias\' portfolio',
  authors: [{ name: 'matthias' }],
  icons: {
    shortcut: '/images/ico/favicon.ico',
    apple: '/images/ico/apple-touch-icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={HK_Grotesk.variable}>
      <body>{children}</body>
    </html>
  )
}
