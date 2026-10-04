'use client';

import { useEffect, useRef } from 'react';

/**
 * A project's muted, looping demo clip, filling its (positioned) frame.
 * WebM (VP9) comes first as the lighter file; MP4 (H.264) covers Safari.
 * `playing` drives playback; stopping reloads the element so it shows the
 * poster again instead of a paused frame. Without a `label` it is treated as
 * decoration and hidden from assistive technology.
 */
export default function ProjectVideo({
  video,
  playing = true,
  controls = false,
  label,
  preload = 'metadata',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      // Autoplay can be refused (data saver, policies): the poster stays.
      el.play().catch(() => {});
    } else if (!el.paused || el.currentTime > 0) {
      el.pause();
      el.load();
    }
  }, [playing]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      poster={video.poster}
      preload={preload}
      controls={controls}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
