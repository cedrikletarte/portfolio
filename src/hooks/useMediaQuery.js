'use client';

import { useSyncExternalStore } from 'react';

function subscribe(query, callback) {
  const mql = window.matchMedia(query);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

// SSR-safe media query hook. Unlike the common `useState` + `useEffect`
// pattern (read `window.matchMedia` once after mount), useSyncExternalStore
// is the API React designed specifically for this: it avoids the
// setState-in-effect render cascade, has no hydration-mismatch warning when
// the client value differs from `defaultValue`, and stays live-synced if the
// user changes the OS setting while the page is open.
export function useMediaQuery(query, defaultValue = false) {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => defaultValue,
  );
}
