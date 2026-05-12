export const config = { matcher: ['/((?!login.html$).*)'] }

export default function middleware(request) {
  const url = new URL(request.url)
  if (url.pathname === '/login.html') return

  const cookie = request.headers.get('cookie') || ''
  const isAuth = cookie.split(';').some(c => c.trim() === 'fin_auth=0306')
  if (isAuth) return

  return Response.redirect(new URL('/login.html', request.url), 302)
}
