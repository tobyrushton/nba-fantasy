import 'server-only'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import '../styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NBA Fantasy',
    description: 'A simple NBA fantasy app',
}

const Layout = ({ children }: { children: ReactNode }): ReactNode => {
    return (
        <html lang="en-gb">
            <body className={inter.className}>{children}</body>
        </html>
    )
}

export default Layout
