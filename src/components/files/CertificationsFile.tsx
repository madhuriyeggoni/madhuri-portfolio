'use client';
import { motion } from 'framer-motion';
import { Award, Construction } from 'lucide-react';

export default function CertificationsFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const dly = (n: number) => (hasBeenOpened ? 0 : n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="certifications-page font-mono text-[#d4d4d4] text-[14px] leading-[24px] p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="certifications-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{'// certifications.ts -- professional certifications'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
          Certifications <Construction className="w-8 h-8 text-[#fbbf24] animate-bounce" />
        </h1>
        <p className="subtitle text-[#858585] mt-1">Industry Certifications & Credentials</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.2) }}
        className="bg-[#252526] border border-[#333] rounded-lg p-6 hover:border-[#a855f7]/50 transition-colors shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4 border-b border-[#3c3c3c] pb-3">
          <span className="p-2 bg-[#a855f7]/10 border border-[#a855f7]/40 rounded-full text-[#d8b4fe]">
            <Award className="w-6 h-6" />
          </span>
          <div>
            <h3 className="subheading-font text-xl font-bold text-[#e0e0e0]">🚧 Certifications In Progress</h3>
            <p className="text-xs text-[#858585] font-mono">Actively Expanding Expertise</p>
          </div>
        </div>

        <p className="text-[#cccccc] text-sm leading-relaxed mb-4">
          Professional certifications are currently in progress. I am actively expanding my expertise through industry-recognized programs in <span className="text-[#4fc1ff]">Cloud Computing (AWS / Azure)</span>, <span className="text-[#4fc1ff]">Artificial Intelligence</span>, <span className="text-[#4fc1ff]">Backend Development</span>, and <span className="text-[#4fc1ff]">Software Engineering</span>.
        </p>

        <p className="text-[#6A9955] text-xs font-mono">
          // This section will be updated as new certifications are completed.
        </p>
      </motion.div>
    </motion.div>
  );
}
