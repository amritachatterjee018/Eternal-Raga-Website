'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';

/* ── SVG icon helpers ───────────────────────────────────────────── */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M18.89 12.846C18.54 14.189 16.87 15.138 13.53 17.036C10.3 18.871 8.68 19.788 7.38 19.42c-.54-.153-1.03-.442-1.42-.841C5 17.614 5 15.743 5 12c0-3.743 0-5.614.96-6.579.39-.399.88-.688 1.42-.84C8.68 4.212 10.3 5.129 13.53 6.964c3.34 1.898 5.01 2.847 5.36 4.19.146.554.146 1.138 0 1.692Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17V7ZM14 7c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56C19.122 20 18.415 20 17 20s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17V7Z"
      stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SkipBackIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M8.065 12.626c.254 1.211 1.608 2.081 4.315 3.822 2.944 1.893 4.417 2.839 5.609 2.474a3.24 3.24 0 0 0 1.089-.655C20 17.418 20 15.612 20 12c0-3.612 0-5.418-.922-6.288a3.24 3.24 0 0 0-1.089-.655c-1.192-.365-2.665.581-5.61 2.552C9.674 9.292 8.32 10.163 8.065 11.374a3.15 3.15 0 0 0 0 1.252ZM4 4v16"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SkipForwardIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" style={{ transform: 'scaleX(-1)' }}>
    <path d="M8.065 12.626c.254 1.211 1.608 2.081 4.315 3.822 2.944 1.893 4.417 2.839 5.609 2.474a3.24 3.24 0 0 0 1.089-.655C20 17.418 20 15.612 20 12c0-3.612 0-5.418-.922-6.288a3.24 3.24 0 0 0-1.089-.655c-1.192-.365-2.665.581-5.61 2.552C9.674 9.292 8.32 10.163 8.065 11.374a3.15 3.15 0 0 0 0 1.252ZM4 4v16"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShuffleIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ opacity: active ? 1 : 0.5 }}>
    <path d="M19.558 4 20.455 4.976c.401.436.601.654.531.839-.07.185-.354.185-.921.185-1.269 0-2.788-.205-3.954.473-.72.42-1.222 1.152-2.071 2.617M3 18h1.581c1.928 0 2.892 0 3.705-.473.721-.42 1.223-1.152 2.072-2.617"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.558 20l.897-.976c.401-.436.601-.654.531-.839-.07-.185-.354-.185-.921-.185-1.269 0-2.788.205-3.954-.473-.72-.42-1.222-1.152-2.071-2.617L10.704 9.562C9.634 7.82 9.1 6.946 8.286 6.473 7.473 6 6.509 6 4.581 6H3"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RepeatIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ opacity: active ? 1 : 0.5 }}>
    <path d="M16.388 3 17.391 3.976c.448.436.672.654.593.839-.079.185-.396.185-1.029.185H9.194C5.221 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4M7.612 21l-1.004-.976c-.448-.436-.672-.654-.593-.839.079-.185.396-.185 1.03-.185h7.761C18.779 19 22 15.866 22 12c0-1.487-.477-2.866-1.29-4"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {active && <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>}
  </svg>
);

/* ── Format seconds → m:ss ──────────────────────────────────────── */
function fmt(s: number) {
  if (!isFinite(s) || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/* ── Component ──────────────────────────────────────────────────── */
interface AudioPlayerProps {
  src: string;
  title: string;
  author?: string;
  isDark: boolean;
}

export default function AudioPlayer({ src, title, author, isDark }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying]   = useState(false);
  const [isRepeat,  setIsRepeat]    = useState(false);
  const [isShuffle, setIsShuffle]   = useState(false);
  const [progress,  setProgress]    = useState(0);   // 0–100
  const [current,   setCurrent]     = useState(0);
  const [duration,  setDuration]    = useState(0);
  const [dragging,  setDragging]    = useState(false);

  /* Init audio element once */
  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = 'metadata';
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('timeupdate', () => {
      if (!dragging) {
        setCurrent(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      }
    });
    audio.addEventListener('ended', () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        setProgress(0);
        setCurrent(0);
      }
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  /* Sync repeat into closure */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => {
      if (isRepeat) { audio.currentTime = 0; audio.play(); }
      else { setIsPlaying(false); setProgress(0); setCurrent(0); }
    };
    audio.addEventListener('ended', onEnd);
    return () => audio.removeEventListener('ended', onEnd);
  }, [isRepeat]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play(); setIsPlaying(true); }
  }, [isPlaying]);

  /* Progress bar pointer interaction */
  const seekTo = useCallback((clientX: number) => {
    const audio = audioRef.current;
    const el = trackRef.current;
    if (!audio || !el || !isFinite(audio.duration)) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
    setProgress(pct * 100);
    setCurrent(pct * audio.duration);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => { if (dragging) seekTo(e.clientX); };
  const onPointerUp   = (e: React.PointerEvent) => { if (dragging) { seekTo(e.clientX); setDragging(false); } };

  /* ── Styles ─────────────────────────────────────────────────── */
  const gold   = '#C8962E';
  const purple = '#2D1B69';

  const cardBg  = isDark
    ? 'linear-gradient(135deg, rgba(27,10,60,0.92), rgba(45,27,105,0.75))'
    : 'linear-gradient(135deg, rgba(27,10,60,0.88), rgba(61,31,128,0.72))';

  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'rgba(255,255,255,0.75)', padding: '8px', borderRadius: '6px',
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <div
      style={{
        background: cardBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(200,150,46,0.2)`,
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'inherit',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, letterSpacing: '0.3px', lineHeight: 1.3 }}>
          {title}
        </p>
        {author && (
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '3px' }}>{author}</p>
        )}
      </div>

      {/* Progress row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', minWidth: '32px', textAlign: 'right' }}>
          {fmt(current)}
        </span>

        {/* Track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            flex: 1, height: '6px', borderRadius: '6px', cursor: 'pointer', position: 'relative',
            background: 'rgba(255,255,255,0.15)',
          }}
        >
          {/* Fill */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${progress}%`, borderRadius: '6px',
            background: `linear-gradient(90deg, ${gold}, #F5C518)`,
            transition: dragging ? 'none' : 'width 0.1s linear',
          }}/>
          {/* Thumb */}
          <div style={{
            position: 'absolute', top: '50%', left: `${progress}%`,
            transform: 'translate(-50%, -50%)',
            width: '13px', height: '13px', borderRadius: '50%',
            background: '#fff',
            boxShadow: `0 0 6px ${gold}`,
            transition: dragging ? 'none' : 'left 0.1s linear',
          }}/>
        </div>

        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', minWidth: '32px' }}>
          {fmt(duration)}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Shuffle */}
        <button
          style={{ ...btnBase, color: isShuffle ? gold : 'rgba(255,255,255,0.45)' }}
          onClick={() => setIsShuffle(v => !v)}
          title="Shuffle"
        >
          <ShuffleIcon active={isShuffle} />
        </button>

        {/* Prev */}
        <button style={btnBase} title="Previous" onClick={() => {
          if (audioRef.current) { audioRef.current.currentTime = 0; }
        }}>
          <SkipBackIcon />
        </button>

        {/* Play/Pause — main button */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: '48px', height: '48px', borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${gold}, #F5C518)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1B0A3C',
            boxShadow: `0 4px 16px rgba(200,150,46,0.45)`,
            transition: 'transform 0.15s, box-shadow 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Next */}
        <button style={btnBase} title="Next" onClick={() => {
          if (audioRef.current && isFinite(audioRef.current.duration)) {
            audioRef.current.currentTime = audioRef.current.duration;
          }
        }}>
          <SkipForwardIcon />
        </button>

        {/* Repeat */}
        <button
          style={{ ...btnBase, color: isRepeat ? gold : 'rgba(255,255,255,0.45)' }}
          onClick={() => setIsRepeat(v => !v)}
          title="Repeat"
        >
          <RepeatIcon active={isRepeat} />
        </button>
      </div>
    </div>
  );
}
