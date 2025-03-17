import type { Metadata } from 'next'

import { Provider } from '@/app/provider'

export const metadata: Metadata = {
  title: 'インポス請求書 - Stripe決済の0.4%を削減',
  description:
    'ストライプ請求書の手数料0.4%を削減するための、請求書発行サービス',
}

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
