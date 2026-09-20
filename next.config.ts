import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Emit a minimal self-contained server in .next/standalone (only the files the app actually needs),
  // which keeps the Docker image small. Run it with `node server.js` (see the Dockerfile).
  output: 'standalone',
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
