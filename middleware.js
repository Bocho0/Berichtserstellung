// Zugangsprüfung: ohne gültige Sitzung nur Login-Seite und /api/auth erreichbar.
import { next } from '@vercel/edge';
export const config = { matcher: '/(.*)' };
const enc = new TextEncoder();
async function check(t) {
  try {
    const [p, h] = t.split('.');
    const key = await crypto.subtle.importKey('raw', enc.encode(process.env.SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(p));
    const e = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
    if (e !== h) return null;
    const o = JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')));
    return o.exp > Date.now() ? o : null;
  } catch { return null; }
}
export default async function middleware(req) {
  const url = new URL(req.url), path = url.pathname;
  if (!process.env.SESSION_SECRET) return new Response('SESSION_SECRET fehlt in Vercel.', { status: 503 });
  if (path === '/login.html' || path === '/api/auth') return next();
  const m = (req.headers.get('cookie') || '').match(/(?:^|;\s*)sess=([^;]*)/);
  const s = m ? await check(m[1]) : null;
  if (!s) return path.startsWith('/api/') ? new Response('{"error":"Nicht angemeldet"}', { status: 401 }) : Response.redirect(new URL('/login.html', req.url), 303);
  if ((path === '/admin.html' || path === '/api/admin') && s.role !== 'admin') return Response.redirect(new URL('/archiv.html', req.url), 303);
  return next();
}
