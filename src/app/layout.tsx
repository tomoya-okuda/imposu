import type { Metadata } from 'next'

import { Provider } from '@/app/provider'
import { home } from '@/const/pageData'

export const metadata: Metadata = home.metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
