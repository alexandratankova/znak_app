import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterData } from '../types';

interface TimelineProps {
  data: LetterData;
}

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col p-8 md:p-12 overflow-y-auto bg-white border-l border-[#111111]/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col space-y-12 pb-20"
        >
          {/* Header Section */}
          <div>
            <div className="flex items-baseline space-x-4 mb-2">
              <span className="text-sm font-black uppercase tracking-widest text-[#D62828]">
                {data.phonetic}
              </span>
              <span className="h-[1px] flex-1 bg-[#111111]/20"></span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#111111] tracking-tight mb-4">
              {data.name}
            </h2>
            <p className="text-2xl md:text-3xl font-display italic text-[#111111]/80 leading-relaxed">
              "{data.soundDescription}"
            </p>
          </div>

          {/* Origin Card */}
          <div className="bg-[#F2F2F2] p-6 border border-[#111111]/5">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-[#111111]/50">Invenzione</h3>
            <p className="font-serif text-lg text-[#111111]">
              {data.origin}
            </p>
            <div className="mt-4 flex items-center space-x-2 text-[#D62828]">
               <span className="font-glagolitic text-4xl">{data.glagolitic}</span>
               <span className="text-sm font-mono opacity-50">⟶ {data.char}</span>
            </div>
          </div>

          {/* Timeline List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-8 text-[#111111]/50 border-b border-[#111111]/10 pb-2">
              Evoluzione Storica
            </h3>
            <div className="space-y-8">
              {data.timeline.map((event, idx) => (
                <div key={idx} className="group relative pl-8 border-l border-[#111111]/20">
                  <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-white border-2 border-[#111111] rounded-full group-hover:bg-[#D62828] group-hover:border-[#D62828] transition-colors"></div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-mono font-bold text-[#D62828] mb-1">
                      {event.year}
                    </span>
                    <h4 className="font-bold text-lg mb-2">{event.period}</h4>
                    <p className="text-[#111111]/70 leading-relaxed mb-3">
                      {event.description}
                    </p>
                    <p className="font-display italic text-[#111111]/60 text-lg border-l-2 border-[#111111]/5 pl-3">
                      {event.poeticText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Timeline;