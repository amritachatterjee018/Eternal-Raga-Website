'use client';
import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

/* ─── Purple/Gold colour scheme for Eternal Raga ─────────────────────────
   Color 1  #1B0A3C  – Deep Purple
   Color 2  #C8962E  – Gold
   Color 3  #2D1B69  – Mid Purple
   Color 4  #F5C518  – Bright Gold
   Color 5  #3D1F80  – Violet Purple
   Color 6  #A07424  – Muted Gold
───────────────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
    _liquidGradientCleanup?: () => void;
  }
}

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function LiquidGradientHero({ children, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scriptLoaded = useRef(false);

  function initGradient() {
    if (!containerRef.current || !window.THREE) return;

    // Clean up any previous instance
    if (window._liquidGradientCleanup) {
      window._liquidGradientCleanup();
    }

    const THREE = window.THREE;
    const container = containerRef.current;
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    /* ── Renderer ─────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      stencil: false,
      depth: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;';
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

    /* ── Scene / Camera ───────────────────────────────────────── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1b0a3c);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 10000);
    camera.position.z = 50;

    /* ── Touch/mouse texture ─────────────────────────────────── */
    const SIZE = 64;
    const ttCanvas = document.createElement('canvas');
    ttCanvas.width = ttCanvas.height = SIZE;
    const ttCtx = ttCanvas.getContext('2d')!;
    ttCtx.fillStyle = 'black';
    ttCtx.fillRect(0, 0, SIZE, SIZE);
    const touchTexture = new THREE.Texture(ttCanvas);

    let trail: Array<{ x: number; y: number; age: number; force: number; vx: number; vy: number }> = [];
    let lastTouch: { x: number; y: number } | null = null;
    const maxAge = 64;
    const radius = 0.25 * SIZE;

    function addTouch(nx: number, ny: number) {
      let force = 0, vx = 0, vy = 0;
      if (lastTouch) {
        const dx = nx - lastTouch.x, dy = ny - lastTouch.y;
        if (dx === 0 && dy === 0) return;
        const d = Math.sqrt(dx * dx + dy * dy);
        vx = dx / d; vy = dy / d;
        force = Math.min((dx * dx + dy * dy) * 20000, 2.0);
      }
      lastTouch = { x: nx, y: ny };
      trail.push({ x: nx, y: ny, age: 0, force, vx, vy });
    }

    function updateTouchTexture() {
      ttCtx.fillStyle = 'black';
      ttCtx.fillRect(0, 0, SIZE, SIZE);
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const progress = p.age / maxAge;
        let intensity = progress < 0.3
          ? Math.sin((progress / 0.3) * (Math.PI / 2))
          : -(1 - (progress - 0.3) / 0.7) * ((1 - (progress - 0.3) / 0.7) - 2);
        intensity *= p.force;
        const px = { x: p.x * SIZE, y: (1 - p.y) * SIZE };
        const color = `${((p.vx + 1) / 2) * 255},${((p.vy + 1) / 2) * 255},${intensity * 255}`;
        const offset = SIZE * 5;
        ttCtx.shadowOffsetX = offset;
        ttCtx.shadowOffsetY = offset;
        ttCtx.shadowBlur = radius;
        ttCtx.shadowColor = `rgba(${color},${0.2 * intensity})`;
        ttCtx.beginPath();
        ttCtx.fillStyle = 'rgba(255,0,0,1)';
        ttCtx.arc(px.x - offset, px.y - offset, radius, 0, Math.PI * 2);
        ttCtx.fill();
        p.age++;
        if (p.age > maxAge) trail.splice(i, 1);
      }
      touchTexture.needsUpdate = true;
    }

    /* ── Gradient mesh ───────────────────────────────────────── */
    const fovRad = (camera.fov * Math.PI) / 180;
    function getViewSize(w: number, h: number) {
      const vh = Math.abs(camera.position.z * Math.tan(fovRad / 2) * 2);
      return { width: vh * (w / h), height: vh };
    }
    let vs = getViewSize(W, H);

    const uniforms = {
      uTime:         { value: 0 },
      uResolution:   { value: new THREE.Vector2(W, H) },
      // Purple-blue dominant palette — gold as accent
      uColor1: { value: new THREE.Vector3(0.106, 0.039, 0.235) }, // #1B0A3C Deep Purple
      uColor2: { value: new THREE.Vector3(0.784, 0.588, 0.180) }, // #C8962E Gold (accent)
      uColor3: { value: new THREE.Vector3(0.102, 0.063, 0.376) }, // #1A1060 Blue-Indigo
      uColor4: { value: new THREE.Vector3(0.239, 0.122, 0.502) }, // #3D1F80 Violet
      uColor5: { value: new THREE.Vector3(0.176, 0.106, 0.412) }, // #2D1B69 Mid Purple
      uColor6: { value: new THREE.Vector3(0.961, 0.773, 0.094) }, // #F5C518 Bright Gold (accent)
      uSpeed:        { value: 1.3 },
      uIntensity:    { value: 1.7 },
      uTouchTexture: { value: touchTexture },
      uGrainIntensity: { value: 0.05 },
      uDarkBase:     { value: new THREE.Vector3(0.067, 0.024, 0.157) }, // #110628 very dark purple
      uGradientSize: { value: 0.5 },
      uGradientCount:{ value: 12.0 },
      uC1Weight:     { value: 1.4 },  // purple/blue weight — dominant
      uC2Weight:     { value: 0.5 },  // gold weight — accent only
    };

    const geo = new THREE.PlaneGeometry(vs.width, vs.height, 1, 1);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2  uResolution;
        uniform vec3  uColor1, uColor2, uColor3, uColor4, uColor5, uColor6;
        uniform float uSpeed, uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity;
        uniform vec3  uDarkBase;
        uniform float uGradientSize, uGradientCount;
        uniform float uC1Weight, uC2Weight;
        varying vec2 vUv;
        #define PI 3.14159265359

        float grain(vec2 uv, float t) {
          vec2 g = uv * uResolution * 0.5;
          return fract(sin(dot(g + t, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
        }

        vec3 gradientColor(vec2 uv, float t) {
          float r = uGradientSize;
          float s = uSpeed;

          vec2 c[12];
          c[0]  = vec2(0.5 + sin(t*s*0.40)*0.40, 0.5 + cos(t*s*0.50)*0.40);
          c[1]  = vec2(0.5 + cos(t*s*0.60)*0.50, 0.5 + sin(t*s*0.45)*0.50);
          c[2]  = vec2(0.5 + sin(t*s*0.35)*0.45, 0.5 + cos(t*s*0.55)*0.45);
          c[3]  = vec2(0.5 + cos(t*s*0.50)*0.40, 0.5 + sin(t*s*0.40)*0.40);
          c[4]  = vec2(0.5 + sin(t*s*0.70)*0.35, 0.5 + cos(t*s*0.60)*0.35);
          c[5]  = vec2(0.5 + cos(t*s*0.45)*0.50, 0.5 + sin(t*s*0.65)*0.50);
          c[6]  = vec2(0.5 + sin(t*s*0.55)*0.38, 0.5 + cos(t*s*0.48)*0.42);
          c[7]  = vec2(0.5 + cos(t*s*0.65)*0.36, 0.5 + sin(t*s*0.52)*0.44);
          c[8]  = vec2(0.5 + sin(t*s*0.42)*0.41, 0.5 + cos(t*s*0.58)*0.39);
          c[9]  = vec2(0.5 + cos(t*s*0.48)*0.37, 0.5 + sin(t*s*0.62)*0.43);
          c[10] = vec2(0.5 + sin(t*s*0.68)*0.33, 0.5 + cos(t*s*0.44)*0.46);
          c[11] = vec2(0.5 + cos(t*s*0.38)*0.39, 0.5 + sin(t*s*0.56)*0.41);

          vec3 colors[6];
          colors[0] = uColor1; colors[1] = uColor2; colors[2] = uColor3;
          colors[3] = uColor4; colors[4] = uColor5; colors[5] = uColor6;

          float weights[6];
          weights[0] = uC1Weight; weights[1] = uC2Weight; weights[2] = uC1Weight;
          weights[3] = uC2Weight; weights[4] = uC1Weight; weights[5] = uC2Weight;

          vec3 col = vec3(0.0);
          for (int i = 0; i < 12; i++) {
            float d = length(uv - c[i]);
            float inf = 1.0 - smoothstep(0.0, r, d);
            float w = weights[int(mod(float(i), 6.0))];
            vec3  baseCol = colors[int(mod(float(i), 6.0))];
            float pulse = 0.55 + 0.45 * sin(t * s + float(i) * 0.9);
            col += baseCol * inf * pulse * w;
          }

          // Rotation layers
          vec2 r1 = uv - 0.5;
          float a1 = t * s * 0.15;
          r1 = vec2(r1.x*cos(a1) - r1.y*sin(a1), r1.x*sin(a1) + r1.y*cos(a1)) + 0.5;
          vec2 r2 = uv - 0.5;
          float a2 = -t * s * 0.12;
          r2 = vec2(r2.x*cos(a2) - r2.y*sin(a2), r2.x*sin(a2) + r2.y*cos(a2)) + 0.5;

          float ri1 = 1.0 - smoothstep(0.0, 0.8, length(r1 - 0.5));
          float ri2 = 1.0 - smoothstep(0.0, 0.8, length(r2 - 0.5));
          col += mix(uColor1, uColor3, ri1) * 0.3 * uC1Weight;
          col += mix(uColor2, uColor4, ri2) * 0.35 * uC2Weight;

          col = clamp(col, vec3(0.0), vec3(1.0)) * uIntensity;
          float lum = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(lum), col, 1.3);       // saturation boost
          col = pow(col, vec3(0.92));             // gamma
          float br = length(col);
          col = mix(uDarkBase, col, max(br * 1.1, 0.12));
          float mb = 1.0;
          float b2 = length(col);
          if (b2 > mb) col = col * (mb / b2);
          return col;
        }

        void main() {
          vec2 uv = vUv;

          // Mouse ripple distortion
          vec4 tt = texture2D(uTouchTexture, uv);
          float vx = -(tt.r * 2.0 - 1.0);
          float vy = -(tt.g * 2.0 - 1.0);
          float it = tt.b;
          uv.x += vx * 0.7 * it;
          uv.y += vy * 0.7 * it;
          vec2 cen = vec2(0.5);
          float d = length(uv - cen);
          uv += vec2(sin(d * 20.0 - uTime * 3.0) * 0.035 * it
                   + sin(d * 15.0 - uTime * 2.0) * 0.025 * it);

          vec3 color = gradientColor(uv, uTime);
          color += grain(uv, uTime) * uGrainIntensity;

          // Subtle colour breathing
          float ts = uTime * 0.5;
          color.r += sin(ts)       * 0.015;
          color.g += cos(ts * 1.4) * 0.010;
          color.b += sin(ts * 1.2) * 0.020;

          float br2 = length(color);
          color = mix(uDarkBase, color, max(br2 * 1.1, 0.12));
          color = clamp(color, vec3(0.0), vec3(1.0));
          float mb2 = 1.0;
          float b3 = length(color);
          if (b3 > mb2) color = color * (mb2 / b3);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    /* ── Animation loop ──────────────────────────────────────── */
    let rafId = 0;
    let lastTime = performance.now();
    function tick() {
      rafId = requestAnimationFrame(tick);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      uniforms.uTime.value += delta;
      updateTouchTexture();
      renderer.render(scene, camera);
    }
    tick();

    /* ── Pointer interaction ─────────────────────────────────── */
    function onMove(e: MouseEvent | TouchEvent) {
      const rect = container.getBoundingClientRect();
      const cx = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const cy = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      addTouch(
        (cx - rect.left) / rect.width,
        1 - (cy - rect.top) / rect.height,
      );
    }
    container.addEventListener('mousemove', onMove);
    container.addEventListener('touchmove', onMove, { passive: true });

    /* ── Resize ──────────────────────────────────────────────── */
    const ro = new ResizeObserver(() => {
      const nw = container.offsetWidth;
      const nh = container.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      uniforms.uResolution.value.set(nw, nh);
      const nvs = getViewSize(nw, nh);
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(nvs.width, nvs.height, 1, 1);
    });
    ro.observe(container);

    /* ── Cleanup ─────────────────────────────────────────────── */
    window._liquidGradientCleanup = () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('touchmove', onMove);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      touchTexture.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      window._liquidGradientCleanup = undefined;
    };
  }

  useEffect(() => {
    // If THREE already loaded (hot-reload), init immediately
    if (window.THREE && !scriptLoaded.current) {
      scriptLoaded.current = true;
      initGradient();
    }
    return () => {
      window._liquidGradientCleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Load Three.js from CDN — strategy="beforeInteractive" keeps it out of SSR */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (!scriptLoaded.current) {
            scriptLoaded.current = true;
            initGradient();
          }
        }}
      />

      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={{ isolation: 'isolate' }}
      >
        {/* WebGL canvas is injected here by Three.js */}

        {/* Page content sits above the canvas */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}
