'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   Social Bar – React port of https://codepen.io/b1tn3r/pen/LmwmEq
   Adapted for Eternal Raga website theme (deep purple instead of gray).
   ─────────────────────────────────────────────────────────────────────────── */

/* ── Platform data ───────────────────────────────────────────────────────── */
interface Platform {
  title: string;
  href: string;
  color: string;         // CSS background value
  iconPath: string;      // SVG path(s)
  iconViewBox?: string;
}

const INSTAGRAM_GRADIENT =
  'radial-gradient(circle at 35% 90%, rgb(254,197,100), transparent 50%), ' +
  'radial-gradient(circle at 0px 140%, rgb(254,197,100), transparent 50%), ' +
  'radial-gradient(at 0px -25%, rgb(82,88,207), transparent 50%), ' +
  'radial-gradient(at 20% -50%, rgb(82,88,207), transparent 50%), ' +
  'radial-gradient(at 100% 0px, rgb(137,61,194), transparent 50%), ' +
  'radial-gradient(at 60% -20%, rgb(137,61,194), transparent 50%), ' +
  'radial-gradient(at 100% 100%, rgb(217,49,122), transparent), ' +
  'linear-gradient(rgb(101,89,202), rgb(188,49,143) 30%, rgb(227,63,95) 50%, rgb(247,118,56) 70%, rgb(254,198,109) 100%)';

const platforms: Platform[] = [
  {
    title: 'Company Website',
    href: 'https://www.creativechronix.net/',
    color: '#00695c',
    iconPath: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c1.828 0 3.403 2.407 3.996 5.75H8.004C8.597 5.907 10.172 3.5 12 3.5zm-4.464 5.75c.303-1.68.872-3.145 1.642-4.233A8.508 8.508 0 004.066 9.25h3.47zm8.928 0h3.47a8.508 8.508 0 00-5.112-4.233c.77 1.088 1.34 2.554 1.642 4.233zM3.5 12c0-.604.066-1.192.186-1.75h3.857c-.057.57-.043 1.16-.043 1.75s-.014 1.18.043 1.75H3.686A8.45 8.45 0 013.5 12zm.566 2.75h3.47c.284 1.567.82 2.945 1.532 4.02A8.51 8.51 0 014.066 14.75zM12 20.5c-1.73 0-3.232-2.196-3.89-5.25h7.78C15.232 18.304 13.73 20.5 12 20.5zm3.932-.73c.712-1.075 1.248-2.453 1.532-4.02h3.47a8.51 8.51 0 01-5.002 4.02zM20.314 13.75h-3.857c.057-.57.043-1.16.043-1.75s.014-1.18-.043-1.75h3.857c.12.558.186 1.146.186 1.75s-.066 1.192-.186 1.75z',
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/@EternalRaga',
    color: '#FF0000',
    iconPath: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/eternal.raga',
    color: INSTAGRAM_GRADIENT,
    iconPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/eternalraga/',
    color: '#3b5999',
    iconPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    title: 'Threads',
    href: '#',
    color: '#000000',
    iconPath: 'M16.556 12.975a4.396 4.396 0 00-.193-.088c-.116-2.89-1.725-4.533-4.472-4.552h-.037c-1.642 0-3.003.7-3.851 1.977l1.717 1.18c.633-.899 1.627-1.06 2.134-1.06h.025c.824.005 1.446.245 1.849.714.293.34.49.813.588 1.414a10.68 10.68 0 00-2.449-.152c-2.762.16-4.538 1.766-4.413 3.993.063 1.134.657 2.11 1.672 2.748.858.54 1.963.795 3.112.72 1.518-.1 2.71-.604 3.542-1.498.632-.68 1.036-1.558 1.22-2.66.731.441 1.274 1.022 1.57 1.735.502 1.212.532 3.204-.993 4.728-1.34 1.34-2.952 1.92-5.38 1.938-2.69-.02-4.727-.883-6.054-2.565-1.239-1.572-1.879-3.833-1.9-6.718.021-2.885.661-5.147 1.9-6.718C6.773 6.383 8.81 5.52 11.5 5.5c2.71.02 4.772.885 6.127 2.572.663.826 1.147 1.87 1.451 3.097l1.97-.52c-.369-1.508-.984-2.817-1.845-3.89C17.508 4.55 14.885 3.52 11.508 3.5h-.015c-3.37.02-5.97 1.053-7.727 3.267C2.233 8.71 1.521 11.36 1.5 14.57v.018c.021 3.21.733 5.86 2.266 7.802C5.524 24.506 8.123 25.54 11.494 25.56h.015c2.9-.02 4.962-.785 6.676-2.5 2.24-2.24 2.16-5.03 1.39-6.883a5.766 5.766 0 00-3.019-2.202zm-5.29 4.57c-1.273.073-2.594-.499-2.66-1.694-.048-.863.615-1.826 2.478-1.934.217-.013.43-.019.637-.019a8.17 8.17 0 011.754.194c-.2 2.878-1.395 3.387-2.21 3.453z',
    iconViewBox: '0 0 24 28',
  },
];

/* ── Ripple state ────────────────────────────────────────────────────────── */
interface RippleData {
  id: number;
  x: number;
  y: number;
  bg: string;
  size: number;
}

/* default container bg — matches the deep purple theme */
const DEFAULT_BG = '#1B0A3C';

export default function SocialBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle]         = useState('FOLLOW US');
  const [linkHref, setLinkHref]   = useState('#');
  const [linkVisible, setLinkVisible] = useState(false);
  const [currentIdx, setCurrentIdx]   = useState<number | null>(null);
  const [containerBg, setContainerBg] = useState(DEFAULT_BG);
  const [ripples, setRipples]         = useState<RippleData[]>([]);
  const prevElementRef = useRef<number | null>(null);
  const idCounter      = useRef(0);

  /* ── Ripple handler (port of jQuery mouseenter logic) ──────────────── */
  const handleItemEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
      // "only trigger anim when diff item"
      if (idx === prevElementRef.current) return;
      prevElementRef.current = idx;

      const p = platforms[idx];
      setTitle(p.title.toUpperCase());
      setLinkHref(p.href);
      setLinkVisible(true);
      setCurrentIdx(idx);

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const r = Math.max(rect.width, rect.height);
      const bg = p.color;
      const id = ++idCounter.current;

      setRipples(prev => [...prev, { id, x, y, bg, size: r * 2 }]);

      // After animation finishes, set container bg and remove ripple
      setTimeout(() => {
        setContainerBg(bg);
        setRipples(prev => prev.filter(rr => rr.id !== id));
      }, 850);
    },
    [],
  );

  /* clean up on mouse leave */
  const handleContainerLeave = useCallback(() => {
    prevElementRef.current = null;
    // don't reset — keep last color like the CodePen does
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleContainerLeave}
      style={{ background: containerBg }}
      className="social-bar-container"
    >
      {/* Ripples */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="social-bar-ripple"
          style={{
            background: r.bg,
            left: r.x,
            top: r.y,
          }}
        />
      ))}

      {/* Title */}
      <h3 className="social-bar-title">{title}</h3>

      {/* GO TO PAGE link */}
      <div className="social-bar-link-wrap">
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-bar-link${linkVisible ? ' social-bar-link--visible' : ''}`}
        >
          GO TO PAGE
        </a>
      </div>

      {/* Icon circles */}
      <div className="social-bar-icons">
        {platforms.map((p, idx) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.title}
            className={`social-bar-item${currentIdx === idx ? ' social-bar-item--current' : ''}`}
            style={{ background: p.color }}
            onMouseEnter={e => handleItemEnter(e, idx)}
          >
            <svg
              viewBox={p.iconViewBox || '0 0 24 24'}
              fill="white"
              className="social-bar-icon"
            >
              <path d={p.iconPath} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
