export const config = { matcher: ['/:path*'] }

export default function middleware(request) {
  const auth = request.headers.get('authorization') || ''

  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6))
      const password = decoded.includes(':') ? decoded.split(':')[1] : decoded
      if (password === '0306') return  // 인증 성공 → 통과
    } catch (_) {}
  }

  return new Response(
    `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>인증 필요</title>
<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#f0f4ff;}
.box{text-align:center;color:#4338ca;}</style></head>
<body><div class="box"><h2>🔒 성우 재무 대시보드</h2><p>비밀번호를 입력해주세요.</p></div></body></html>`,
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="성우 재무 대시보드"',
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  )
}
