import { NextResponse } from 'next/server'

import { auth } from '@/app/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // dashboardディレクトリへのアクセスを保護
  const isAccessingProtectedRoute = nextUrl.pathname.startsWith('/dashboard')
  // ルートページへのアクセスを確認
  const isAccessingRootPage = nextUrl.pathname === '/'
  // 認証ページへのアクセスを確認
  const isAccessingAuthPages = [
    '/sign-in',
    '/sign-up',
    '/error',
    '/verify-request',
  ].includes(nextUrl.pathname)

  // 未認証ユーザーが保護されたルートにアクセスした場合、ログインページへリダイレクト
  if (isAccessingProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl.origin))
  }

  // 認証済みユーザーがルートページまたは認証ページにアクセスした場合、ダッシュボードへリダイレクト
  if ((isAccessingRootPage || isAccessingAuthPages) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
  }

  return NextResponse.next()
})

// matcherを拡張して、ルートページと認証関連ページも含める
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/error',
    '/verify-request',
    '/dashboard/:path*',
  ],
}
