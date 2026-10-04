import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DnsIcon from '@mui/icons-material/Dns';
import FunctionsIcon from '@mui/icons-material/Functions';
import GestureIcon from '@mui/icons-material/Gesture';
import HealingIcon from '@mui/icons-material/Healing';
import HubIcon from '@mui/icons-material/Hub';
import LanguageIcon from '@mui/icons-material/Language';
import MemoryIcon from '@mui/icons-material/Memory';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PublicIcon from '@mui/icons-material/Public';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import TranslateIcon from '@mui/icons-material/Translate';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import HomelabDiagram from './diagrams/HomelabDiagram';

export const HEADER_ICONS = {
  server: DnsIcon,
  website: LanguageIcon,
  gaming: SportsEsportsIcon,
  ai: PsychologyIcon,
  earth: PublicIcon,
};

export const HIGHLIGHT_ICONS = {
  server: [AccountTreeIcon, SecurityIcon, HealingIcon],
  website: [AutoAwesomeIcon, SpeedIcon, TranslateIcon],
  gaming: [SportsEsportsIcon, ThreeDRotationIcon, GestureIcon],
  ai: [FunctionsIcon, MemoryIcon, HubIcon],
  earth: [SatelliteAltIcon, TravelExploreIcon, ThreeDRotationIcon],
};

export const FALLBACK_HIGHLIGHT_ICON = CheckCircleIcon;

// Diagrams a project can show in place of a screenshot (`diagram` in data/projects.ts).
export const DIAGRAMS = {
  homelab: HomelabDiagram,
};

// Placeholder flavor filenames + fixed (non-random) code-skeleton bar widths,
// keyed by project so ProjectPlaceholder never needs Math.random() (would
// cause SSR/CSR hydration mismatches).
export const PLACEHOLDER_META = {
  server: { file: 'docker-compose.yml', bars: [62, 38, 71, 45, 83, 29] },
  website: { file: 'app/page.tsx', bars: [55, 70, 40, 66, 31, 58] },
  earth: { file: 'globe.tsx', bars: [48, 65, 34, 72, 50, 27] },
};

// Renders a raw i18n string that may contain literal <b>...</b> markers
// (used instead of next-intl's t.rich so plain strings from t.raw() arrays
// can still render bold spans).
export const renderBold = (html) => {
  const parts = html.split(/(<b>.*?<\/b>)/g);
  return parts.map((part, i) => {
    const match = part.match(/^<b>(.*?)<\/b>$/);
    return match ? <strong key={i}>{match[1]}</strong> : part;
  });
};
