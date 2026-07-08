import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendMailMock = vi.fn().mockResolvedValue({});
vi.mock('nodemailer', () => ({
  default: {
    createTransport: () => ({ sendMail: sendMailMock }),
  },
}));

const { POST } = await import('./route.js');

// Each test uses its own fake IP so the in-memory rate limiter (shared
// module state) doesn't leak between unrelated test cases.
function makeRequest(body, ip) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMailMock.mockClear();
  });

  it('rejects a request missing required fields', async () => {
    const res = await POST(makeRequest({ name: '', email: '', message: '' }, '10.0.0.1'));
    expect(res.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    const res = await POST(
      makeRequest({ name: 'A', email: 'not-an-email', message: 'hi' }, '10.0.0.2'),
    );
    expect(res.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rejects a message over the length limit', async () => {
    const res = await POST(
      makeRequest({ name: 'A', email: 'a@b.com', message: 'x'.repeat(50_001) }, '10.0.0.3'),
    );
    expect(res.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('sends a valid message', async () => {
    const res = await POST(
      makeRequest({ name: 'A', email: 'a@b.com', message: 'Hello there' }, '10.0.0.4'),
    );
    expect(res.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it('rate-limits after too many requests from the same IP', async () => {
    const ip = '10.0.0.5';
    const body = { name: 'A', email: 'a@b.com', message: 'Hello there' };

    for (let i = 0; i < 3; i++) {
      const res = await POST(makeRequest(body, ip));
      expect(res.status).toBe(200);
    }

    const limited = await POST(makeRequest(body, ip));
    expect(limited.status).toBe(429);
    expect(limited.headers.get('Retry-After')).toBeTruthy();
  });
});
