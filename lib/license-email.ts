const RESEND_API = 'https://api.resend.com'

const FROM = 'DubCheck <keys@robinbusse.dev>'
const REPLY_TO = 'support@audio-dubcheck.com'
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
        `<pre style="background:#0f172a;color:#e2e8f0;padding:14px 16px;border-radius:10px;white-space:pre-wrap;word-break:break-all;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.5;margin:8px 0;">${k}</pre>`
    )
    .join('')

  const plural = keys.length > 1 ? 'keys' : 'key'
  const isAre = keys.length > 1 ? 'are' : 'is'

  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;color:#0f172a;max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="background:#ffffff;border-radius:16px;padding:36px 32px;border:1px solid #e2e8f0;">

      <div style="text-align:center;margin:0 0 28px;">
        <img src="https://audio-dubcheck.com/logo-email.png" width="56" height="56" alt="DubCheck" style="display:inline-block;border:0;" />
      </div>

      <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;text-align:center;">Thanks for buying DubCheck ${label}</h1>
      <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 4px;text-align:center;">Your license ${plural} ${isAre} below. Keep this email safe, it's your proof of purchase.</p>

      <div style="height:1px;background:#e2e8f0;margin:28px 0;"></div>

      <h2 style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin:0 0 4px;">License ${plural}</h2>
      ${keysBlock}

      <h2 style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin:28px 0 12px;">Quickstart</h2>
      <ol style="font-size:15px;line-height:1.7;color:#334155;padding-left:20px;margin:0;">
        <li>Download DubCheck: <a href="${DOWNLOAD_URL}" style="color:#2563eb;text-decoration:none;">audio-dubcheck.com/download</a></li>
        <li>Open the app, go to Settings → License, paste your key, hit Activate.</li>
        <li>You're in. Full docs at <a href="https://audio-dubcheck.com/help" style="color:#2563eb;text-decoration:none;">audio-dubcheck.com/help</a>.</li>
      </ol>

      <div style="height:1px;background:#e2e8f0;margin:28px 0;"></div>

      <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">Something off, or need a hand? Just reply to this email or write to <a href="mailto:support@audio-dubcheck.com" style="color:#2563eb;text-decoration:none;">support@audio-dubcheck.com</a>. I read every one.</p>
      <p style="font-size:14px;color:#0f172a;margin:16px 0 0;">Robin<br/><span style="color:#94a3b8;">DubCheck</span></p>

    </div>
  </div>
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
      reply_to: REPLY_TO,
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
