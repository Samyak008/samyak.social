"use client";
import { useEffect, useRef } from "react";

export default function CursorLight() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let renderX = targetX;
    let renderY = targetY;
    let raf = 0;
    let lastMove = performance.now();

    function onPointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMove = performance.now();
      canvas.style.opacity = "1";
    }

    function onLeave() {
      // mark lastMove far in the past so it fades out quickly
      lastMove = performance.now() - 2000;
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    function render() {
      raf = requestAnimationFrame(render);

      // smooth follow
      renderX += (targetX - renderX) * 0.16;
      renderY += (targetY - renderY) * 0.16;

      // clear
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // compute idle fade (start fading after ~350ms)
      const idleMs = performance.now() - lastMove;
      const fadeStart = 350;
      const fadeDuration = 900;
      let t = 1;
      if (idleMs > fadeStart) {
        t = Math.max(0, 1 - (idleMs - fadeStart) / fadeDuration);
      }

      if (t <= 0.01) {
        // almost invisible — early out to save cycles
        canvas.style.opacity = "0";
        return;
      } else {
        // reduced overall max opacity for a gentler effect
        canvas.style.opacity = `${Math.min(1, 0.75)}`;
      }

      // draw radial glow
      const maxDim = Math.max(window.innerWidth, window.innerHeight);
      const radius = Math.max(360, Math.round(maxDim * 0.55)); // increased from 0.45 to 0.55

      const g = ctx.createRadialGradient(renderX, renderY, 0, renderX, renderY, radius);
      // slight intensity boost: 0.18 → 0.24, 0.06 → 0.09, 0.015 → 0.025
      g.addColorStop(0, `rgba(96,165,250,${0.24 * t})`);
      g.addColorStop(0.28, `rgba(96,165,250,${0.09 * t})`);
      g.addColorStop(0.65, `rgba(96,165,250,${0.025 * t})`);
      g.addColorStop(1, `rgba(0,0,0,0)`);

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-canvas"
      aria-hidden
    />
  );
}