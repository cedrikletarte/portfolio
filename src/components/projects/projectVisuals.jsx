import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import DnsIcon from '@mui/icons-material/Dns';
import ExploreIcon from '@mui/icons-material/Explore';
import FunctionsIcon from '@mui/icons-material/Functions';
import GestureIcon from '@mui/icons-material/Gesture';
import HubIcon from '@mui/icons-material/Hub';
import LanguageIcon from '@mui/icons-material/Language';
import LayersIcon from '@mui/icons-material/Layers';
import MapIcon from '@mui/icons-material/Map';
import MemoryIcon from '@mui/icons-material/Memory';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import TranslateIcon from '@mui/icons-material/Translate';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

export const HEADER_ICONS = {
  server: DnsIcon,
  website: LanguageIcon,
  gaming: SportsEsportsIcon,
  ai: PsychologyIcon,
  earth: PublicIcon,
};

export const HIGHLIGHT_ICONS = {
  server: [LayersIcon, SecurityIcon, AutoAwesomeMotionIcon],
  website: [CodeIcon, ViewCarouselIcon, AutoAwesomeIcon, SpeedIcon, TranslateIcon],
  gaming: [SportsEsportsIcon, SpeedIcon, ThreeDRotationIcon, GestureIcon],
  ai: [FunctionsIcon, MemoryIcon, MemoryIcon, HubIcon],
  earth: [ExploreIcon, MapIcon, MapIcon, AutoAwesomeIcon],
};

export const FALLBACK_HIGHLIGHT_ICON = CheckCircleIcon;

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
