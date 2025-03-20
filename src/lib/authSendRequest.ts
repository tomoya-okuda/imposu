// Theme型の定義
interface Theme {
  brandColor?: string
  buttonText?: string
}

// VerificationRequestParams型の定義
interface VerificationRequestParams {
  identifier: string
  url: string
  provider: {
    apiKey: string
    from: string
  }
  theme?: Theme
}

export async function sendVerificationRequest(
  params: VerificationRequestParams
) {
  const { identifier: to, provider, url, theme = {} } = params
  const { host } = new URL(url)
  const res = await fetch('https://api.forwardemail.net/v1/emails', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(provider.apiKey + ':')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `${host}にログイン - ${new Date().toLocaleTimeString('ja-JP')}`,
      html: html({ url, host, theme }),
      text: text({ url, host }),
    }),
  })

  if (!res.ok) {
    try {
      const errorData = await res.json()
      throw new Error(
        `Forward Email error: ${res.status} ${
          res.statusText
        } - ${JSON.stringify(errorData)}`
      )
    } catch {
      // JSONとして解析できなかった場合のフォールバック
      const errorText = await res
        .text()
        .catch(() => 'レスポンスの解析に失敗しました')
      throw new Error(
        `Forward Email error: ${res.status} ${res.statusText} - ${errorText}`
      )
    }
  }
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, '&#8203;.')

  const brandColor = theme.brandColor || '#346df1'
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${
      color.mainBackground
    }; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
          color.text
        };">
        <strong>${escapedHost}</strong> にログイン
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${
              color.buttonBackground
            }"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                  color.buttonText
                }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    color.buttonBorder
  }; display: inline-block; font-weight: bold;">ログイン</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
          color.text
        };">
        このメールをリクエストしていない場合は、無視してください。<br>
        このリンクは15分間有効です。(${new Date().toLocaleTimeString(
          'ja-JP'
        )} 送信)
      </td>
    </tr>
  </table>
</body>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `${host}にログインするには次のリンクをクリックしてください。\n${url}\n\n※このリンクは15分間有効です。`
}
