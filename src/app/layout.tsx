import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NBA Fantasy',
  description: 'A simple NBA fantasy app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-gb">
      <body className={inter.className}>{children}</body>
    </html>
  )
}