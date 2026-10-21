import { SlideLink } from "../components/slide-link";
import { KineticText } from "../components/kinetic-text";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CosmicScene } from "../components/cosmic-scene";
import { VertexBio } from "../components/vertex-bio";
import { OrbitLogo } from "../components/orbit-logo";
import { Preloader } from "../components/preloader";
import { FaWhatsapp } from "react-icons/fa";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

const whatsapp = "https://wa.me/5583998352470?text=Ol%C3%A1!%20Quero%20um%20site%20de%20outro%20universo%20para%20minha%20empresa.";
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function Vertex() {
  const journey = useRef<HTMLElement>(null);
  useScrollReveal(journey);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = journey.current;
        if (el) setProgress(clamp(-el.getBoundingClientRect().top / (el.offsetHeight - window.innerHeight)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const goTo = (value: number) => {
    const el = journey.current;
    if (el) window.scrollTo({ top: el.offsetTop + (el.offsetHeight - window.innerHeight) * value, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const introOpacity = 1 - clamp(progress / 0.19);
  const contactOpacity = clamp((progress - 0.77) / 0.15);
  const transitOpacity = clamp((progress - 0.2) / 0.1) * (1 - clamp((progress - 0.65) / 0.09));
  const arrival = progress > 0.82;
  return (
    <main>
      <Preloader progress={loaded} />

      <section ref={journey} className="journey" aria-label="Jornada pelo universo Vertex">
        <div className="stage" style={{ "--progress": progress } as CSSProperties}>
          <CosmicScene progress={progress} onLoad={setLoaded} />
          <div className="cinematic-shade" style={{ opacity: 0.5 + contactOpacity * 0.3 }} />
          <div className="film-grain" />
          <div className="side-note">AGÊNCIA DE MARKETING · JOÃO PESSOA</div>

          <div className="hero-content" data-scroll-reveal="group" data-motion-group style={{ opacity: introOpacity, transform: `translateY(${-progress * 220}px)`, visibility: introOpacity === 0 ? "hidden" : "visible" }}>
            <OrbitLogo active={introOpacity > 0.04} variant="intro" />
            <p className="hero-promise"><KineticText variant="subtitle" active={introOpacity > 0.04}>Transforme visitantes<br className="mobile-break" /> em clientes com um</KineticText></p>
            <h1><KineticText active={introOpacity > 0.04}>Site de outro<br />Universo</KineticText></h1>
            <p className="hero-description"><KineticText variant="subtitle" active={introOpacity > 0.04}>Somos uma agência de marketing em <strong>João Pessoa</strong>. Criamos sites e landing pages de alta conversão, com experiências únicas e imersivas que trazem credibilidade e confiança à sua empresa no mercado digital.</KineticText></p>
            <SlideLink className="hero-client-cta" href={whatsapp} reveal="slide-left">Quero um site que<br className="mobile-break" /> gere clientes</SlideLink>
          </div>

          <div className="transit-caption" style={{ opacity: transitOpacity }} aria-hidden="true"><span><KineticText active={transitOpacity > 0.04}>DEIXE O COMUM PARA TRÁS</KineticText></span><p><KineticText active={transitOpacity > 0.04}>O extraordinário<br />está do outro lado.</KineticText></p></div>

          <div className="journey-bottom"><div className="journey-status"><span className="status-dot" /><span>{loaded < 1 ? `PREPARANDO O UNIVERSO · ${Math.round(loaded * 100)}%` : arrival ? "VOCÊ CHEGOU AO EXTRAORDINÁRIO" : progress > 0.2 ? "ATRAVESSANDO O UNIVERSO" : "ROLE PARA ATRAVESSAR"}</span></div><div className="scroll-indicator"><span>{String(Math.round(progress * 100)).padStart(2, "0")}</span><div><i style={{ width: `${Math.max(3, progress * 100)}%` }} /></div><span>100</span></div></div>
        </div>
      </section>
      <VertexBio opacity={clamp((progress - 0.73) / 0.26)} onRestart={() => goTo(0)} />
      {progress >= 0.99 && <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a VF pelo WhatsApp"><FaWhatsapp /></a>}
    </main>
  );
}