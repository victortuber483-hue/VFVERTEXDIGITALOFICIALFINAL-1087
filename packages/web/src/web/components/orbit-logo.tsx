import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };
type Spark = { x: number; y: number; life: number; size: number; front: boolean; vx: number; vy: number };

/** Project an extruded five-point star onto two transparent canvas layers. */
export function OrbitLogo({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLCanvasElement>(null);
  const front = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = root.current;
    const rear = back.current;
    const fore = front.current;
    if (!el || !rear || !fore) return;
    const a = rear.getContext("2d");
    const b = fore.getContext("2d");
    if (!a || !b) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let raf = 0;
    let last = 0;
    let time = .6;
    let width = 0;
    let height = 0;
    let particles: Spark[] = [];
    const resize = () => {
      const rect = fore.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      [rear, fore].forEach(canvas => { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); });
      [a, b].forEach(ctx => ctx.setTransform(dpr, 0, 0, dpr, 0, 0));
    };
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, scale: number) => {
      const rotate = (p: Point): Point => {
        const spin = angle * 1.5;
        const tilt = .42 + Math.sin(angle * .7) * .25;
        const px = p.x * Math.cos(spin) + p.z * Math.sin(spin);
        const pz = -p.x * Math.sin(spin) + p.z * Math.cos(spin);
        const py = p.y * Math.cos(tilt) - pz * Math.sin(tilt);
        const depth = p.y * Math.sin(tilt) + pz * Math.cos(tilt);
        const roll = angle * .4;
        return { x: (px * Math.cos(roll) - py * Math.sin(roll)) * scale, y: (px * Math.sin(roll) + py * Math.cos(roll)) * scale, z: depth };
      };
      const ring = Array.from({ length: 10 }, (_, i) => {
        const theta = i * Math.PI / 5 - Math.PI / 2;
        const radius = i % 2 ? 13 : 29;
        return { x: Math.cos(theta) * radius, y: Math.sin(theta) * radius };
      });
      const faces: Point[][] = [];
      const upper = ring.map(p => rotate({ ...p, z: 5 }));
      const lower = ring.map(p => rotate({ ...p, z: -5 }));
      const tip = rotate({ x: 0, y: 0, z: 16 });
      const reverseTip = rotate({ x: 0, y: 0, z: -12 });
      for (let i = 0; i < 10; i++) {
        const n = (i + 1) % 10;
        faces.push([tip, upper[i], upper[n]], [reverseTip, lower[n], lower[i]], [upper[i], lower[i], lower[n], upper[n]]);
      }
      faces.sort((one, two) => one.reduce((sum, p) => sum + p.z, 0) / one.length - two.reduce((sum, p) => sum + p.z, 0) / two.length);
      ctx.save(); ctx.translate(x, y);
      const halo = ctx.createRadialGradient(0, 0, 4, 0, 0, 51 * scale);
      halo.addColorStop(0, "#ce8bff80"); halo.addColorStop(.4, "#962fff35"); halo.addColorStop(1, "#962fff00");
      ctx.fillStyle = halo; ctx.fillRect(-65, -65, 130, 130);
      faces.forEach((face, i) => {
        const shade = 35 + Math.max(0, Math.min(45, face.reduce((sum, p) => sum + p.z, 0) / face.length * 2 + 20));
        const gradient = ctx.createLinearGradient(-25, -30, 25, 28);
        gradient.addColorStop(0, i % 4 === 0 ? "#fff0ff" : `hsl(276 92% ${Math.min(90, shade + 23)}%)`);
        gradient.addColorStop(.48, `hsl(274 88% ${shade}%)`);
        gradient.addColorStop(1, "#49137d");
        ctx.beginPath(); face.forEach((p, n) => n ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
        ctx.fillStyle = gradient; ctx.fill(); ctx.strokeStyle = "#e5baff28"; ctx.lineWidth = .6; ctx.stroke();
      });
      ctx.restore();
    };
    const frame = (stamp: number) => {
      const dt = Math.min(.04, (stamp - (last || stamp)) / 1000); last = stamp;
      if (!media.matches) time += dt;
      [a, b].forEach(ctx => ctx.clearRect(0, 0, width, height));
      const angle = media.matches ? .6 : time * .82;
      const radius = Math.min(148, width * .39);
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * 47;
      const inFront = Math.sin(angle) >= 0;
      const scale = .82 + Math.sin(angle) * .16;
      if (!media.matches && dt > 0) particles.push({ x, y, front: inFront, life: 1, size: 1.2 + Math.random() * 1.8, vx: (Math.random() - .5) * 14, vy: 8 + Math.random() * 13 });
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.life -= dt * .85; p.x += p.vx * dt; p.y += p.vy * dt;
        const ctx = p.front ? b : a;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.life * p.life); ctx.fillStyle = "#e7bcff"; ctx.shadowColor = "#af44ff"; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
        if (p.size > 2.4) { ctx.strokeStyle = "#edd5ff"; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(p.x - 4 * p.life, p.y); ctx.lineTo(p.x + 4 * p.life, p.y); ctx.moveTo(p.x, p.y - 4 * p.life); ctx.lineTo(p.x, p.y + 4 * p.life); ctx.stroke(); }
        ctx.restore();
      });
      drawStar(inFront ? b : a, x, y, time * 1.2, scale);
      if (visible && active && !media.matches) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      cancelAnimationFrame(raf); last = 0;
      if (visible && active) raf = requestAnimationFrame(frame);
      else [a, b].forEach(ctx => ctx.clearRect(0, 0, width, height));
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }, { threshold: .1 });
    const sizing = new ResizeObserver(() => { resize(); start(); });
    resize(); observer.observe(el); sizing.observe(el); media.addEventListener("change", start);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); sizing.disconnect(); media.removeEventListener("change", start); particles = []; };
  }, [active]);
  return <div ref={root} className="orbit-logo" data-scroll-reveal="up">
    <canvas ref={back} className="orbit-layer orbit-behind" aria-hidden="true" />
    <img src="/media/logo-transparent.png" alt="VF Vertex Digital" className="bio-logo" />
    <canvas ref={front} className="orbit-layer orbit-front" aria-hidden="true" />
  </div>;
}