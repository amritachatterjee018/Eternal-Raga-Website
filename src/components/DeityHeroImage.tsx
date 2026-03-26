'use client';

/**
 * DeityHeroImage
 * A visually polished container used in:
 *   - Sahasranama landing cards (height 200)
 *   - Sahasranama detail page heroes (height 280)
 *
 * Behaviour:
 *   1. Always renders a gradient-placeholder background (radial, accent → #1B0A3C).
 *   2. Overlays a Next.js <Image> that starts invisible and fades in on load.
 *   3. On error (file missing) the image stays hidden — gradient shows.
 *   4. Children are rendered in absolute position at the bottom for text overlays.
 */

import React, { useState } from 'react';
import Image from 'next/image';

export interface DeityHeroImageProps {
  src?: string;              // e.g. /images/sahasranama/vishnu_sahasranama.jpg
  altEn?: string;
  altHi?: string;
  placeholderColor: string;  // accent color, e.g. '#5BA3CF'
  devanagariName: string;    // e.g. 'विष्णु'
  height: number;            // 200 for cards, 280 for hero
  className?: string;
  style?: React.CSSProperties;
  /** Content rendered at the BOTTOM of the container (text overlay) */
  children?: React.ReactNode;
}

export default function DeityHeroImage({
  src,
  altEn = '',
  altHi = '',
  placeholderColor,
  devanagariName,
  height,
  className = '',
  style,
  children,
}: DeityHeroImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  /** Lighten the accent color slightly for the radial centre */
  const centerColor = placeholderColor + 'AA'; // ~67% opacity for a lighter feel

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        borderRadius: 16,
        ...style,
      }}
    >
      {/* ── 1. Gradient placeholder (always visible beneath real image) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${centerColor} 0%, ${placeholderColor}44 45%, #1B0A3C 100%)`,
          zIndex: 0,
        }}
      />

      {/* ── 2. Devanagari name + ॐ (only shown when image is NOT loaded) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          zIndex: 1,
          opacity: imgLoaded ? 0 : 1,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
          border: '1px solid rgba(212,168,67,0.2)',
          borderRadius: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Sans Devanagari', Georgia, serif",
            fontSize: 48,
            fontWeight: 700,
            color: '#D4A843',
            lineHeight: 1.1,
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            userSelect: 'none',
          }}
        >
          {devanagariName}
        </span>
        <span
          style={{
            fontSize: 32,
            color: '#B8A88A',
            opacity: 0.5,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          ॐ
        </span>
      </div>

      {/* ── 3. Real image (fades in on load, stays hidden on error) ── */}
      {src && !imgError && (
        <Image
          src={src}
          alt={`${altEn} · ${altHi}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            zIndex: 2,
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 500ms ease-in-out',
          }}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          priority={false}
        />
      )}

      {/* ── 4. Children (text overlay — sits at bottom, z-index 3) ── */}
      {children && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
