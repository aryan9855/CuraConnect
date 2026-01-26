'use client';
import { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

// Hook to get responsive values based on screen size
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 640;
  const isTablet = screenSize.width >= 640 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;

  return { isMobile, isTablet, isDesktop, screenSize };
};

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const { isMobile, isTablet } = useResponsive();
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  // Responsive adjustments
  const responsiveDotSize = useMemo(() => {
    if (isMobile) return dotSize * 0.6;
    if (isTablet) return dotSize * 0.8;
    return dotSize;
  }, [dotSize, isMobile, isTablet]);

  const responsiveGap = useMemo(() => {
    if (isMobile) return gap * 0.7;
    if (isTablet) return gap * 0.85;
    return gap;
  }, [gap, isMobile, isTablet]);

  const responsiveProximity = useMemo(() => {
    if (isMobile) return proximity * 0.6;
    if (isTablet) return proximity * 0.8;
    return proximity;
  }, [proximity, isMobile, isTablet]);

  const responsiveShockRadius = useMemo(() => {
    if (isMobile) return shockRadius * 0.6;
    if (isTablet) return shockRadius * 0.8;
    return shockRadius;
  }, [shockRadius, isMobile, isTablet]);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  // Removed circlePath - we'll draw directly in the draw function for better control

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      // Enable image smoothing for better rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    const cols = Math.floor((width + responsiveGap) / (responsiveDotSize + responsiveGap));
    const rows = Math.floor((height + responsiveGap) / (responsiveDotSize + responsiveGap));
    const cell = responsiveDotSize + responsiveGap;

    const gridW = cell * cols - responsiveGap;
    const gridH = cell * rows - responsiveGap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + responsiveDotSize / 2;
    const startY = extraY / 2 + responsiveDotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [responsiveDotSize, responsiveGap]);

  useEffect(() => {
    let rafId;
    const proxSq = responsiveProximity * responsiveProximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Get logical dimensions (not device pixel dimensions)
      const wrap = wrapperRef.current;
      if (!wrap) return;
      const { width, height } = wrap.getBoundingClientRect();
      
      // Clear using logical dimensions
      ctx.clearRect(0, 0, width, height);

      const { x: px, y: py } = pointerRef.current;

      const halfDotSize = responsiveDotSize / 2;
      const maxX = width + halfDotSize;
      const maxY = height + halfDotSize;
      const minX = -halfDotSize;
      const minY = -halfDotSize;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        
        // Skip rendering if dot is completely outside bounds
        if (ox < minX || ox > maxX || oy < minY || oy > maxY) {
          continue;
        }
        
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / responsiveProximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        // Use beginPath to ensure clean rendering
        ctx.beginPath();
        ctx.arc(0, 0, halfDotSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [responsiveProximity, baseColor, activeRgb, baseRgb, responsiveDotSize]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = e => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < responsiveProximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = e => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < responsiveShockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / responsiveShockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    // Touch event handlers for mobile
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true
        });
        throttledMove(mouseEvent);
      }
    };

    const onTouchEnd = (e) => {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const mouseEvent = new MouseEvent('click', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true
        });
        onClick(mouseEvent);
      }
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [maxSpeed, speedTrigger, responsiveProximity, resistance, returnDuration, responsiveShockRadius, shockStrength]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};

export default DotGrid;
