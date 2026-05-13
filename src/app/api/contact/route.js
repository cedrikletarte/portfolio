import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 50_000;

export async function POST(req) {
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
