'use client';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function ResearchFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const dly = (n: number) => (hasBeenOpened ? 0 : n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="research-page font-mono text-[#d4d4d4] text-[14px] leading-[24px] p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="research-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{'// research.ts -- academic research & publications'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">Research & Publications</h1>
        <p className="subtitle text-[#858585] mt-1">Interpretable AI for Medical Imaging & Thermal Diagnosis</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.2) }}
        className="bg-[#252526] border border-[#333] p-6 rounded-lg hover:border-[#10b981]/50 hover:bg-[#2a2d2e] transition-all duration-300 relative group shadow-lg"
      >
        <div className="flex justify-between items-start mb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#10b981]" />
            <h3 className="subheading-font text-xl font-bold text-[#e0e0e0] leading-tight group-hover:text-[#34d399] transition-colors">
              PCOS Detection via Thermal Imaging & Deep Learning
            </h3>
          </div>
          <span className="inline-flex items-center px-4 py-1.5 rounded-md text-xs font-bold bg-[#10b981]/10 text-[#6ee7b7] border border-[#10b981]/50 shadow-[0_0_12px_rgba(16,185,129,0.3)] whitespace-nowrap">
            🚧 Research in Progress
          </span>
        </div>

        <div className="text-[#4fc1ff] font-medium mb-1">
          Indian Institute of Technology (ISM) Dhanbad
        </div>
        <div className="text-[#858585] text-xs font-mono mb-4">
          Summer Research Internship | May 2026 – Present
        </div>

        <p className="text-[#cccccc] text-sm leading-relaxed mb-4">
          Currently conducting research in Explainable AI and Thermal Imaging for PCOS Detection under faculty mentorship at IIT (ISM) Dhanbad. Developing machine learning pipelines, preprocessing clinical datasets, engineering thermal features, and evaluating interpretable deep learning models using Grad-CAM to reduce hallucinations in medical diagnostic support.
        </p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#3c3c3c]">
          {["Explainable AI", "Grad-CAM", "Thermal Imaging", "Deep Learning", "PyTorch", "Medical Imaging", "IIT (ISM) Dhanbad"].map((tag, i) => (
            <span key={i} className="text-xs font-mono text-[#dcdcaa] bg-[#1e1e1e] border border-[#3c3c3c] px-3 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
