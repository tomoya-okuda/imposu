export const APP_NAME = 'インポス請求書'
export const APP_DESCRIPTION = `${APP_NAME}はStripe手数料がタダになるクラウド型Stripe請求書発行サービスです。ノーコードで簡単設定し、ワンクリックで請求書リンクを発行。発行も編集も、お客様にお任せ。`

export const navData = {
  HOME: {
    title: `${APP_NAME}`,
    titleEng: 'Imposu',
    href: '/',
    metadata: {
      title: `Stripe請求書0.4%を削減 | ${APP_NAME}`,
      description: `${APP_DESCRIPTION}`,
      alternates: {
        canonical: `${process.env.NEXTAUTH_URL}/`,
      },
      openGraph: {
        title: `Stripe請求書0.4%を削減しませんか？ | ${APP_NAME}`,
        description: `${APP_DESCRIPTION}`,
        images: [
          {
            url: `${process.env.NEXTAUTH_URL}/images/imposu-ogp.webp`,
            width: 1200,
            height: 630,
          },
        ],
      },
    },
  },
}

export const home = navData.HOME
