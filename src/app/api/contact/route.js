import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 50_000;

// In-memory rate limiting: fine for a single-instance Node deployment (this
// app runs as one `next start` process behind the reverse proxy, not on
// multiple serverless/edge instances), and avoids pulling in Redis/Upstash
// for a low-traffic contact form. Resets on server restart, which is fine.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitStore = new Map(); // ip -> { count, resetAt }

function getClientIp(req) {
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();

  // Opportunistic cleanup so one-time visitors don't accumulate forever.
  if (rateLimitStore.size > 10_000) {
    for (const [key, entry] of rateLimitStore) {
      if (now > entry.resetAt) rateLimitStore.delete(key);
    }
  }

  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(req) {
  if (isRateLimited(getClientIp(req))) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) },
    });
  }

  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return new Response(JSON.stringify({ error: 'Message is too long.' }), { status: 400 });
  }

  const sanitizedMessage = sanitizeHtml(message, {
    allowedTags: ['b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'blockquote'],
    allowedAttributes: {},
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      replyTo: email,
      to: process.env.MAIL_USER,
      subject: `Contact de ${name}`,
      html: sanitizedMessage,
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error('Email send error:', e);
    return new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), { status: 500 });
  }
}
