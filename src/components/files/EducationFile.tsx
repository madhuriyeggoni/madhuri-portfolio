'use client';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

export default function EducationFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const dly = (n: number) => (hasBeenOpened ? 0 : n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="education-page font-mono text-[#d4d4d4] text-[14px] leading-[24px] p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="education-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{'// education.ts -- academic journey'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">Education</h1>
        <p className="subtitle text-[#858585] mt-1">Computer Science & Engineering</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.2) }}
        className="education-card bg-[#252526] border border-[#333] rounded-lg p-5 hover:border-[#4fc1ff]/50 transition-colors shadow-lg"
      >
        <div className="education-header flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#3c3c3c] pb-4 mb-4">
          <div className="left flex items-center gap-4">
            <span className="icon bg-[#1e1e1e] p-3 rounded-full border border-[#333] text-[#4fc1ff]">
              <FaGraduationCap size={24} />
            </span>
            <div className="title-group">
              <h3 className="subheading-font text-xl md:text-2xl font-bold text-[#e0e0e0]">Siddartha Institute Of Science And Technology</h3>
              <p className="subtitle text-[#858585] text-sm mt-1">Undergraduate B.Tech Studies</p>
            </div>
          </div>
          <div className="right mt-3 sm:mt-0 shrink-0">
            <span className="year inline-flex items-center text-[#6A9955] font-mono font-bold border border-[#6A9955]/30 bg-[#6A9955]/10 px-3 py-1 rounded text-sm whitespace-nowrap">
              2023 - 2027
            </span>
          </div>
        </div>

        <div className="education-body flex flex-col gap-2">
          <p className="degree text-[#4fc1ff] font-semibold text-[16px]">
            B.Tech in Computer Science and Engineering
          </p>
          <p className="gpa text-[#858585] mt-1 text-base">
            CGPA: <span className="text-[#dcdcaa] font-bold">9.5 / 10</span>
          </p>
          <div className="mt-3 pt-3 border-t border-[#3c3c3c] flex flex-wrap gap-2">
            {[
              "Operating Systems",
              "DBMS",
              "Computer Networks",
              "System Design",
              "Machine Learning",
              "Quantum Computing"
            ].map((course, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs font-mono bg-[#1e1e1e] text-[#ce9178] border border-[#3c3c3c] rounded">
                {course}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
