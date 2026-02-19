import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import Providers from './providers'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'GitPulse - AI-Powered GitHub Repository Analyzer',
  description:
    'Analyze any open source repository with AI. Get instant summaries, star metrics, important pull requests, contributor insights, and repository health scores.',
}

export const viewport: Viewport = {
  themeColor: '#0a0d12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_jetbrains.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
