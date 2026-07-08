const RESEND_API = 'https://api.resend.com'

const FROM = 'DubCheck <keys@audio-dubcheck.com>'
const DOWNLOAD_URL = 'https://audio-dubcheck.com/download?via=email'

type SendArgs = {
  to: string
  keys: string[]
  label: string
  edition: string
  tier: string
}

function html({ keys, label }: { keys: string[]; label: string }): string {
  const keysBlock = keys
    .map(
      k =>
        `<pre style="background:#0f172a;color:#e2e8f0;padding:12px 14px;border-radius:8px;white-space:pre-wrap;word-break:break-all;font-size:12px;line-height:1.4;margin:8px 0;">${k}</pre>`
    )
    .join('')

  const plural = keys.length > 1 ? 'keys' : 'key'

  return `<!doctype html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;max-width:560px;margin:0 auto;padding:24px;">
  <h1 style="font-size:22px;margin:0 0 12px;">Thanks for buying DubCheck ${label}.</h1>
  <p style="font-size:15px;line-height:1.5;">Your license ${plural} ${keys.length > 1 ? 'are' : 'is'} below. Keep this email safe — this is your proof of purchase.</p>

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.08em;color:#475569;margin:24px 0 4px;">License ${plural}</h2>
  ${keysBlock}

  <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.08em;color:#475569;margin:24px 0 8px;">Quickstart</h2>
  <ol style="font-size:15px;line-height:1.6;padding-left:20px;margin:0;">
    <li>Download DubCheck: <a href="${DOWNLOAD_URL}" style="color:#2563eb;">${DOWNLOAD_URL}</a></li>
    <li>Open the app, go to Settings → License, paste your key, hit Activate.</li>
    <li>You're in. Full docs at <a href="https://audio-dubcheck.com/help" style="color:#2563eb;">audio-dubcheck.com/help</a>.</li>
  </ol>

  <p style="font-size:13px;color:#64748b;margin-top:32px;">Reply to this email if anything is off. I read every one.<br/>Robin</p>
</body>
</html>`
}

export async function sendLicenseEmail(args: SendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log(
      `[license-email] (no Resend key) would send ${args.keys.length} key(s) to ${args.to}`
    )
    return
  }

  const res = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: args.to,
      subject: `Your DubCheck ${args.label} license`,
      html: html({ keys: args.keys, label: args.label }),
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(
      `Resend send failed: ${res.status} ${JSON.stringify(data)}`
    )
  }
}
