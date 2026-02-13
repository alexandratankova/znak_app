import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData } from '../types';

interface HistoryIdentityProps {
  data: LetterData;
}

// Interactive Glossary Data
const GLOSSARY: Record<string, { desc: string, img?: string }> = {
  "Glagolitico": { desc: "Il primo alfabeto slavo creato dai santi Cirillo e Metodio nel IX secolo. Forme complesse e sacre." },
  "Cirillo": { desc: "San Cirillo, monaco bizantino, creatore dell'alfabeto glagolitico per evangelizzare gli Slavi." },
  "Metodio": { desc: "Fratello di Cirillo, co-patrono d'Europa, continuò l'opera di traduzione biblica." },
  "Greco": { desc: "L'alfabeto greco fu la base strutturale per il cirillico, fornendo la maggior parte delle forme delle lettere." },
  "Ebraico": { desc: "Fonte delle lettere per suoni non greci (come Ш, Ц, Ч) nel sistema cirillico." },
  "Pietro il Grande": { desc: "Zar riformatore (1708) che modernizzò l'alfabeto, eliminando lettere arcaiche e semplificando le forme (Alfabeto Civile)." },
  "Latina": { desc: "L'alfabeto romano, che influenzò fortemente la riforma petrina del 1708 per avvicinare la Russia all'Occidente." },
  "Lomonosov": { desc: "Mikhail Lomonosov (1711–1765), polimatico russo che codificò la grammatica russa moderna." },
  "Russo": { desc: "La lingua slava più diffusa, che ha mantenuto e adattato l'alfabeto cirillico nei secoli." },
  "Bulgaro": { desc: "La Bulgaria fu la culla culturale dove il cirillico fu perfezionato dai discepoli di Cirillo e Metodio." },
  "Serbo": { desc: "Variante che usa un cirillico riformato da Vuk Karadžić nel XIX secolo, perfettamente fonetico." }
};

const TOOLTIP_WIDTH = 192;
const TOOLTIP_GAP = 8;

const GlossaryTerm: React.FC<{ term: string, originalText: string }> = ({ term, originalText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, arrowUp: true });
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // Prefer above, else below
    const spaceAbove = rect.top;
    const spaceBelow = viewportH - rect.bottom;
    const arrowUp = spaceAbove >= spaceBelow;

    let top: number;
    if (arrowUp) {
      top = rect.top - TOOLTIP_GAP;
    } else {
      top = rect.bottom + TOOLTIP_GAP;
    }

    // Horizontal: center on trigger, clamp to viewport
    let left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
    const minLeft = 8;
    const maxLeft = viewportW - TOOLTIP_WIDTH - 8;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    // Keep vertical within viewport
    const minTop = 8;
    const maxTop = viewportH - 120;
    top = Math.max(minTop, Math.min(maxTop, top));

    setPosition({ top, left, arrowUp });
  }, [isOpen]);

  return (
    <span
      ref={triggerRef}
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="border-b border-[var(--accent-primary)]/40 group-hover:border-[var(--accent-primary)] group-hover:text-[var(--accent-primary)] transition-colors font-medium">
        {originalText}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: position.arrowUp ? 5 : -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position.arrowUp ? 5 : -5, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: TOOLTIP_WIDTH,
            }}
            className="bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs p-3 rounded shadow-xl z-[100] pointer-events-none border border-[var(--border-subtle)]"
          >
            <div className="font-bold mb-1 text-[var(--accent-primary)] uppercase tracking-wider">{term}</div>
            <div className="font-display leading-relaxed opacity-90">{GLOSSARY[term].desc}</div>
            {/* Arrow: sopra = punta giù, sotto = punta su */}
            {position.arrowUp ? (
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[var(--bg-elevated)]" />
            ) : (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-[var(--bg-elevated)]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// Helper to parse text and replace keywords
const InteractiveText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  
  const parts = text.split(/(\s+|[.,;!?])/g); 
  
  return (
    <span>
      {parts.map((part, i) => {
        const cleanPart = part.replace(/[.,;!?]/g, '');
        const foundKey = Object.keys(GLOSSARY).find(k => 
          cleanPart.toLowerCase() === k.toLowerCase() || 
          cleanPart.toLowerCase() === k.toLowerCase() + 'o' || 
          cleanPart.toLowerCase().includes(k.toLowerCase()) && k.length > 4
        );

        if (foundKey && /^[a-zA-ZÀ-ÿ]+$/.test(cleanPart)) {
           return <GlossaryTerm key={i} term={foundKey} originalText={part} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const HistoryIdentity: React.FC<HistoryIdentityProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] overflow-y-auto no-scrollbar">
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Elegant easing
          className="flex flex-col min-h-full"
        >
          {/* Editorial Header */}
          <div className="p-8 md:p-12 pb-6">
             <div className="mb-4">
                <span className="font-display text-[32px] font-bold text-[var(--text-muted)] leading-[1.1] block">
                  Storia e identità
                </span>
             </div>
             
             <h2 className="text-6xl md:text-7xl font-display font-black tracking-tighter text-[var(--text-primary)] leading-none">
               {data.name}
             </h2>
          </div>

          {/* Narrative Sections */}
          <div className="px-8 md:px-12 pb-20 space-y-12">
            
            {/* ORIGINS */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
               <h3 className="font-display text-[20px] font-bold text-[var(--accent-primary)] mb-4 border-b border-[var(--accent-primary)]/20 pb-2 inline-block">
                 Le origini
               </h3>
               <p className="font-display text-base leading-relaxed text-[var(--text-primary)]">
                 <InteractiveText text={data.story.origins} />
               </p>
            </motion.section>

            {/* EVOLUTION - Vertical Layout */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[var(--bg-elevated)] -mx-8 md:-mx-12 px-8 md:px-12 py-10 flex flex-col"
            >
               <h3 className="font-display text-[20px] font-bold text-[var(--text-muted)] mb-6">
                 L'evoluzione
               </h3>

               {/* 1. Timeline Years (Horizontal Row) */}
               <div className="flex flex-wrap gap-8 mb-6 pb-6 border-b border-[var(--border-subtle)] w-full">
                  {data.timeline.map((t, i) => (
                    <div key={i} className="flex flex-col min-w-[80px]">
                      <span className="text-xs font-bold text-[var(--accent-primary)] mb-1">{t.year}</span>
                      <span className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">{t.period}</span>
                    </div>
                  ))}
               </div>

               {/* 2. Description Text */}
               <div className="font-display text-base leading-relaxed text-[var(--text-primary)] w-full">
                  <InteractiveText text={data.story.evolution} />
               </div>
            </motion.section>

            {/* CURIOSITY */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
               <h3 className="font-display text-[20px] font-bold text-[var(--text-muted)] mb-4">
                 Curiosità
               </h3>
               <p className="font-display text-base leading-relaxed text-[var(--text-primary)]">
                 <InteractiveText text={data.story.curiosity} />
               </p>
            </motion.section>

            {/* VARIAZIONI PER LE VARIE NAZIONI */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[var(--bg-elevated)] -mx-8 md:-mx-12 px-8 md:px-12 py-10"
            >
               <h3 className="font-display text-[20px] font-bold text-[var(--text-muted)] mb-4">
                 Variazioni per le varie nazioni
               </h3>
               <p className="font-display text-base leading-relaxed text-[var(--text-primary)]">
                 <InteractiveText text={data.variantDescription} />
               </p>
            </motion.section>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HistoryIdentity;