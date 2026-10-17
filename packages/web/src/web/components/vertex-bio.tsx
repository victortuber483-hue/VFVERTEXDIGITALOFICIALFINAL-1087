import { SlideLink } from "./slide-link";
import { OrbitLogo } from "./orbit-logo";
import { KineticText } from "./kinetic-text";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUp, ArrowUpRight, Instagram, MessageCircle, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PortfolioGallery } from "./portfolio-gallery";
import { FounderSection } from "./founder-section";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

const whatsapp = "https://wa.me/5583998352470?text=Ol%C3%A1!%20Quero%20um%20site%20de%20outro%20universo%20para%20minha%20empresa.";

export function VertexBio({ opacity, onRestart }: { opacity: number; onRestart: () => void }) {
  const [about, setAbout] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const section = useRef<HTMLElement>(null);
  useScrollReveal(section);
  useEffect(() => {
    if (about) dialog.current?.showModal();
    else dialog.current?.close();
  }, [about]);
  return (
    <section ref={section} id="contatos" className="vertex-bio" aria-label="Links e portfólio da VF Vertex Digital" style={{ opacity: opacity * opacity * (3 - 2 * opacity), "--entry": opacity, visibility: opacity === 0 ? "hidden" : "visible" } as CSSProperties}>
      <div className="bio-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="bio-column">
        <div className="bio-welcome" data-scroll-reveal="group" data-motion-group><OrbitLogo active={opacity > .9} /><h2><KineticText>Seja Bem Vindo</KineticText></h2><p><KineticText variant="subtitle">Sites de outro universo</KineticText></p></div>
        <div className="bio-links">
          <div className="bio-card-reveal" data-scroll-reveal="flip"><a className="bio-link-card" href={whatsapp} target="_blank" rel="noopener noreferrer"><span className="bio-icon"><FaWhatsapp /></span><div><h3>WhatsApp</h3><p>Entre em contato para<br />orçamentos e dúvidas.</p><span className="bio-link-label">Clique para acessar</span></div></a></div>
          <div className="bio-card-reveal" data-scroll-reveal="flip"><button className="bio-link-card" onClick={() => setAbout(true)}><span className="bio-icon bio-vf-icon">VF</span><div><h3>Sobre Nós</h3><p>Conheça o que criamos<br />para elevar sua marca.</p><span className="bio-link-label">Clique para acessar</span></div></button></div>
          <div className="bio-card-reveal" data-scroll-reveal="flip"><a className="bio-link-card" href="https://www.instagram.com/vfsites/" target="_blank" rel="noopener noreferrer"><span className="bio-icon"><Instagram strokeWidth={1.8} /></span><div><h3>Instagram</h3><p>Explore nosso universo<br />de design e criação.</p><span className="bio-link-label">Clique para acessar</span></div></a></div>
        </div>
        <PortfolioGallery />
        <SlideLink className="bio-main-cta" href={whatsapp} reveal="slide-left">Quero um site que gere clientes</SlideLink>
        <FounderSection />
        <footer className="bio-footer" data-scroll-reveal="up"><img src="/media/logo-transparent.png" alt="VF Vertex Digital" /><div className="bio-footer-links"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> (83) 99835-2470</a><a href="https://www.instagram.com/vfsites/" target="_blank" rel="noopener noreferrer"><Instagram size={17} /> @vfsites</a></div><p>VF VERTEX DIGITAL<br />Sites de outro universo</p><small>© {new Date().getFullYear()} VF Vertex Digital.<br />Todos os direitos reservados.</small><button className="bio-restart" onClick={onRestart}>Reviver a experiência <ArrowUp size={15} /></button></footer>
      </div>
      <dialog ref={dialog} className="bio-about-dialog" onCancel={() => setAbout(false)}><button className="bio-dialog-close" aria-label="Fechar Sobre Nós" onClick={() => setAbout(false)}><X size={22} /></button><img src="/media/logo-transparent.png" alt="VF Vertex Digital" /><p className="eyebrow">SITES DE OUTRO UNIVERSO</p><h2><KineticText active={about}>Experiências únicas.<br />Marcas que inspiram confiança.</KineticText></h2><p>Somos a VF Vertex Digital, uma agência de marketing em João Pessoa. Criamos sites e landing pages de alta conversão, com uma experiência única e imersiva para transmitir credibilidade e confiança à sua empresa no mercado digital.</p><p>Fundada por Victor Ferreira, a VF une estratégia, design e navegação para atrair leads qualificados e transformar visitas em oportunidades de negócio.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bio-dialog-cta">Vamos conversar <ArrowUpRight size={17} /></a></dialog>
    </section>
  );
}