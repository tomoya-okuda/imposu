// 1. NextAuth のセットアップ
// ・NextAuth.js を初期化し、認証システムを構築。
// ・PrismaAdapter を使用して、データベースと接続。
// ・ForwardEmail プロバイダーを利用して Magic Link 認証 を実装。
// ・prisma インスタンス を @/lib/prisma からインポートし、データベース操作を行う。
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import ForwardEmail from 'next-auth/providers/forwardemail'

import { prisma } from '@/lib/prisma'

// 2. NextAuth の設定
// ・認証データの保存
// └ PrismaAdapter を使用し、ユーザー情報を PostgreSQL に保存。
// ・セッション管理の方式
// └ JWT（JSON Web Token）を使用 し、ステートレスな認証を実現。
// ・JWT の有効期限
// └ 30日間（60秒 × 60分 × 24時間 × 30日） に設定。
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), // Prismaを認証アダプターとして使用
  session: { strategy: 'jwt' }, // JWTセッション戦略を使用
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // JWTトークンの有効期間を30日に設定
  },

  // 認証で使用する信頼できるホストを設定
  trustHost: true,

  // 3. コールバックの設定
  // ・session コールバック
  // └ JWT から user.id を session.user.id に設定 することで、フロントエンドでユーザー ID を簡単に取得できるようにする。
  // ・jwt コールバック
  // └ ユーザー情報 (user.id) を JWT に格納 し、セッション管理を簡略化。
  // ・認証成功時のリダイレクト先を指定
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    // 認証成功時のリダイレクト先を指定
    signIn() {
      // ユーザーが認証されていれば、dashboardにリダイレクト
      return true // trueを返すとcallbackUrlまたはデフォルトのURLにリダイレクトされます
    },
    redirect({ url, baseUrl }) {
      // callbackUrlが指定されていれば使用し、なければダッシュボードにリダイレクト
      if (url.startsWith(baseUrl)) return url
      // ユーザーが認証されたらデフォルトでダッシュボードにリダイレクト
      return `${baseUrl}/dashboard`
    },
  },

  // 4. ForwardEmail を使用した Magic Link 認証
  // ・ForwardEmail API を使用して Magic Link 認証メールを送信
  // └ process.env.AUTH_FORWARDEMAIL_KEY を API キーとして使用。
  // └ sendVerificationRequest にカスタムのメール送信処理を定義。
  // └ fetch を使用し、 ForwardEmail API にリクエストを送信 して Magic Link メールを送信。
  // └ メールの本文は generateEmailHtml 関数で生成。

  providers: [
    ForwardEmail({
      apiKey: process.env.AUTH_FORWARDEMAIL_KEY,
      from: process.env.AUTH_FORWARDEMAIL_FROM,
      maxAge: 15 * 60, // マジックリンクの有効期限を15分に設定
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url)

        try {
          const res = await fetch('https://api.forwardemail.net/v1/emails', {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from(
                provider.apiKey + ':'
              ).toString('base64')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: provider.from,
              to: email,
              subject: `${host}にログイン - ${new Date().toLocaleTimeString(
                'ja-JP'
              )}`,
              html: generateEmailHtml({ url, host }),
              text: `${host}にログインするには次のリンクをクリックしてください: ${url}\n\n※このリンクは15分間有効です。`,
            }),
          })

          if (!res.ok) {
            const errorData = await res
              .text()
              .catch(() => 'レスポンスの解析に失敗しました')
            throw new Error(
              `メール送信エラー: ${res.status} ${res.statusText} - ${errorData}`
            )
          }
        } catch (error) {
          console.error('メール送信中にエラーが発生しました:', error)
          throw error
        }
      },

      // 5. メールアドレスの正規化
      // ・メールアドレスの一貫性を確保する
      // └ 小文字に変換し、不要な空白を削除。
      // └ @ の前後を適切に分割し、 ドメインの一部に不要なカンマ , が含まれる場合に削除。
      normalizeIdentifier(identifier: string): string {
        const [local, domain] = identifier.toLowerCase().trim().split('@')
        const cleanDomain = domain.split(',')[0]
        return `${local}@${cleanDomain}`
      },
    }),
  ],

  // 6. 認証ページのカスタマイズ
  // ・認証フローのページをカスタマイズ:
  // └ /auth/signin → ログインページ
  // └ /auth/error → 認証エラーページ
  // └ /auth/verify-request → メール送信完了ページ
  pages: {
    signIn: '/sign-in',
    error: '/error',
    verifyRequest: '/verify-request',
  },
})

// 7. Magic Link メールの HTML 生成
// ・ログインメールの HTML を生成
// └ host.replace(/\./g, '&#8203;.') → メール本文内でドメインの . をエスケープ
// └ ボタンのスタイルを定義
// └ ユーザーがクリックしやすいように、コールトゥアクション（CTA）ボタンを強調
function generateEmailHtml({ url, host }: { url: string; host: string }) {
  const escapedHost = host.replace(/\./g, '&#8203;.')
  const brandColor = '#346df1'
  const timestamp = new Date().toLocaleTimeString('ja-JP')

  return `
    <body style="background: #f9f9f9;">
      <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
            <strong>${escapedHost}</strong> にログイン
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${brandColor}">
                  <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${brandColor}; display: inline-block; font-weight: bold;">
                    ログイン
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
            このメールをリクエストしていない場合は、無視してください。<br>
            このリンクは15分間有効です。(${timestamp} 送信)
          </td>
        </tr>
      </table>
    </body>
  `
}
