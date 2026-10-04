'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Architecture of the homelab (homelab-infra repo), drawn as SVG in a 16:10
 * viewBox so it fills the same frames as a screenshot. Links draw in when the
 * diagram enters the viewport; while `playing`, packets travel along them: web traffic
 * through Cloudflare and Traefik, a request stopped by CrowdSec, the
 * WireGuard VPN, the GitOps deploy loop and the alerts sent to Discord.
 * Static under prefers-reduced-motion, or with `animated={false}`
 * (thumbnails). `compact` drops the bottom row (GitOps and alerts), which a
 * tile would cover with its title. `decorative` hides it from assistive
 * technology, for places that already name the project (tile, thumbnail).
 */

const COLORS = {
  bg: '#0a1426',
  node: '#10203a',
  stroke: 'rgba(148,163,184,0.35)',
  text: '#e2e8f0',
  sub: 'rgba(226,232,240,0.6)',
  host: '#6fc2b0',
  web: '#ec4899',
  vpn: '#22d3ee',
  gitops: '#f59e0b',
  blocked: '#ef4444',
  alert: '#818cf8',
};

const W = 240;
const H = 96;
const STACK_X = [1010, 1290];
const STACK_Y = [110, 230, 350, 470];

// Links between nodes (drawn) and the routes packets follow (through the
// node centers, under the nodes, so packets look like they enter them).
const LINKS = [
  { d: 'M260 300 H340', color: COLORS.web },
  { d: 'M580 300 C635 300 635 230 690 230', color: COLORS.web },
  { d: 'M940 230 H975', color: COLORS.web },
  { d: 'M975 158 V518', color: COLORS.web },
  ...STACK_Y.map((y) => ({ d: `M975 ${y + H / 2} H1010`, color: COLORS.web })),
  ...STACK_Y.map((y) => ({ d: `M1250 ${y + H / 2} H1290`, color: COLORS.web })),
  { d: 'M815 276 V340', color: COLORS.blocked },
  { d: 'M260 640 H690', color: COLORS.vpn },
  { d: 'M940 640 H975 V518', color: COLORS.vpn },
  { band: true, d: 'M280 905 H330', color: COLORS.gitops },
  { band: true, d: 'M570 905 H620', color: COLORS.gitops },
  { band: true, d: 'M860 905 H910', color: COLORS.gitops },
  { band: true, d: 'M1030 860 V800', color: COLORS.gitops },
  { band: true, d: 'M1410 736 V860', color: COLORS.alert },
];

const PACKETS = [
  {
    d: 'M150 300 H580 C635 300 635 230 690 230 H815 H975 V158 H1130',
    color: COLORS.web,
    dur: 3.2,
    begin: 0,
  },
  {
    d: 'M150 300 H580 C635 300 635 230 690 230 H815 H975 V278 H1410',
    color: COLORS.web,
    dur: 3.6,
    begin: 1.4,
  },
  {
    d: 'M150 300 H580 C635 300 635 230 690 230 H815 V390',
    color: COLORS.blocked,
    dur: 4,
    begin: 2.2,
  },
  { d: 'M150 640 H815 H975 V398 H1130', color: COLORS.vpn, dur: 3.8, begin: 0.8 },
  { band: true, d: 'M160 905 H1030 V800', color: COLORS.gitops, dur: 4.4, begin: 0.4 },
  { band: true, d: 'M1410 690 V905', color: COLORS.alert, dur: 2.6, begin: 1.8 },
];

function Node({ x, y, w = W, h = H, label, sub, color = COLORS.stroke, highlight = false }) {
  return (
    <g>
      {/* Opaque base: packets travel under the nodes and must vanish there,
          including under the translucent tint of a highlighted node. */}
      <rect x={x} y={y} width={w} height={h} rx={18} fill={COLORS.node} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={18}
        fill={highlight ? `${color}26` : 'none'}
        stroke={color}
        strokeWidth={highlight ? 3 : 2}
      />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 6 : h / 2 + 10)}
        textAnchor="middle"
        fill={COLORS.text}
        fontSize={Math.min(28, (w - 28) / (label.length * 0.58))}
        fontWeight={700}
      >
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 26} textAnchor="middle" fill={COLORS.sub} fontSize={20}>
          {sub}
        </text>
      )}
    </g>
  );
}

export default function HomelabDiagram({
  animated = true,
  playing = true,
  compact = false,
  decorative = false,
}) {
  const t = useTranslations('server.diagram');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const live = animated && !reduced;
  // Packets only travel while `playing` (the tile ties it to its hover); the
  // links still draw in once either way.
  const flowing = live && playing;
  const links = compact ? LINKS.filter((l) => !l.band) : LINKS;
  const packets = compact ? PACKETS.filter((p) => !p.band) : PACKETS;

  const stacks = [
    { label: 'Portfolio', sub: 'Next.js', highlight: true },
    { label: 'GitLab', sub: 'EE · Runner' },
    { label: 'Immich', sub: t('photos') },
    { label: 'Nextcloud', sub: t('files') },
    { label: t('media'), sub: 'Plex · *arr · VPN' },
    { label: t('management'), sub: 'n8n · Vaultwarden' },
    { label: 'PostgreSQL', sub: t('database') },
    { label: 'SearXNG', sub: t('search') },
  ];

  return (
    <svg
      viewBox={compact ? '0 0 1600 830' : '0 0 1600 1000'}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : t('aria')}
      aria-hidden={decorative || undefined}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: COLORS.bg,
        fontFamily: 'inherit',
      }}
    >
      <defs>
        <pattern id="homelab-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="rgba(148,163,184,0.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="homelab-glow" cx="70%" cy="40%" r="60%">
          <stop offset="0%" stopColor={COLORS.host} stopOpacity="0.14" />
          <stop offset="100%" stopColor={COLORS.host} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill={COLORS.bg} />
      <rect width="1600" height="1000" fill="url(#homelab-grid)" />
      <rect width="1600" height="1000" fill="url(#homelab-glow)" />

      {/* The server itself: everything Ansible configures */}
      <rect
        x={640}
        y={40}
        width={920}
        height={760}
        rx={28}
        fill="rgba(111,194,176,0.04)"
        stroke={COLORS.host}
        strokeWidth={2}
        strokeDasharray="10 8"
      />
      <text x={672} y={90} fill={COLORS.host} fontSize={24} fontWeight={700} letterSpacing={2}>
        {t('host').toUpperCase()}
      </text>
      <text x={1528} y={90} textAnchor="end" fill={COLORS.sub} fontSize={20}>
        Ansible · ufw · Docker
      </text>
      {!compact && (
        <text x={40} y={846} fill={COLORS.gitops} fontSize={22} fontWeight={700} letterSpacing={2}>
          GITOPS
        </text>
      )}

      {links.map((link, i) => (
        <motion.path
          key={link.d}
          d={link.d}
          fill="none"
          stroke={link.color}
          strokeOpacity={0.55}
          strokeWidth={3}
          strokeLinecap="round"
          initial={live ? { pathLength: 0 } : false}
          whileInView={live ? { pathLength: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
        />
      ))}

      {flowing &&
        packets.map((p) => (
          <circle key={p.d} r={8} fill={p.color} opacity={0}>
            <animateMotion
              path={p.d}
              dur={`${p.dur}s`}
              begin={`${p.begin + 1.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.08;0.9;1"
              dur={`${p.dur}s`}
              begin={`${p.begin + 1.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      <Node x={40} y={250} w={220} label="Internet" sub={t('visitors')} color={COLORS.web} />
      <Node x={40} y={590} w={220} label={t('remote')} sub="WireGuard" color={COLORS.vpn} />
      <Node x={340} y={250} label="Cloudflare" sub="Tunnel · DDNS" color={COLORS.web} />
      <Node
        x={690}
        y={180}
        w={250}
        label="Traefik"
        sub="HTTPS · reverse-proxy"
        color={COLORS.web}
      />
      <g>
        <Node x={690} y={340} w={250} label="CrowdSec" sub="WAF · IPS" color={COLORS.blocked} />
        {flowing && (
          // Flashes when the red packet reaches it: the request is blocked.
          <rect x={690} y={340} width={250} height={H} rx={18} fill={COLORS.blocked} opacity={0}>
            <animate
              attributeName="opacity"
              values="0;0;0.35;0"
              keyTimes="0;0.86;0.93;1"
              dur="4s"
              begin={`${2.2 + 1.2}s`}
              repeatCount="indefinite"
            />
          </rect>
        )}
      </g>
      <Node x={690} y={590} w={250} label="WireGuard" sub="VPN" color={COLORS.vpn} />

      {stacks.map((stack, i) => (
        <Node
          key={stack.label}
          x={STACK_X[i % 2]}
          y={STACK_Y[Math.floor(i / 2)]}
          label={stack.label}
          sub={stack.sub}
          color={stack.highlight ? COLORS.web : COLORS.stroke}
          highlight={stack.highlight}
        />
      ))}

      <Node
        x={1010}
        y={640}
        w={520}
        label={t('selfHealing')}
        sub={t('selfHealingSub')}
        color={COLORS.alert}
      />

      {!compact && (
        <>
          <Node x={40} y={860} h={90} label="Renovate" sub={t('update')} color={COLORS.gitops} />
          <Node x={330} y={860} h={90} label="Merge request" sub="GitLab" color={COLORS.gitops} />
          <Node
            x={620}
            y={860}
            h={90}
            label="CI"
            sub="gitleaks · shellcheck"
            color={COLORS.gitops}
          />
          <Node
            x={910}
            y={860}
            h={90}
            label={t('deploy')}
            sub="compose up -d"
            color={COLORS.gitops}
          />
          <Node x={1290} y={860} h={90} label="Discord" sub={t('alerts')} color={COLORS.alert} />
        </>
      )}
    </svg>
  );
}
