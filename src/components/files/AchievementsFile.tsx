'use client';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Code } from 'lucide-react';

const hackathons = [
  {
    project: "Quantum Anomaly Detection System (QADS)",
    name: "Quantum Valley Hackathon 2026",
    badge: "Runner-Up 🥈 & Top Project ⭐",
    description: "Developed QADS, a hybrid quantum-classical machine learning platform exploring anomaly detection across healthcare, finance, and cybersecurity using Qiskit and IBM Quantum.",
    colorTheme: {
      bg: "bg-[#fbbf24]/10",
      text: "text-[#fbbf24]",
      border: "border-[#fbbf24]/50",
      hoverBorder: "hover:border-[#fbbf24]/50"
    }
  },
  {
    project: "Smart Sericulture Management System",
    name: "Make for Madanapalle Hackathon",
    badge: "Runner-Up 🥈",
    description: "Designed a Smart Sericulture solution leveraging technology to support silk farmers through intelligent environmental monitoring and decision support.",
    colorTheme: {
      bg: "bg-[#D97706]/10",
      text: "text-[#fbbf24]",
      border: "border-[#D97706]/50",
      hoverBorder: "hover:border-[#D97706]/50"
    }
  },
  {
    project: "Quantum Anomaly Detection Engine",
    name: "Amaravati Quantum Valley Hackathon",
    badge: "Semi-Finalist 💻",
    description: "Selected among top-performing teams at the state-level hackathon, presenting an innovative Quantum ML solution for real-world anomaly detection.",
    colorTheme: {
      bg: "bg-[#4fc1ff]/10",
      text: "text-[#4fc1ff]",
      border: "border-[#4fc1ff]/50",
      hoverBorder: "hover:border-[#4fc1ff]/50"
    }
  },
  {
    project: "Academic Excellence – B.Tech 3rd Year",
    name: "Siddhartha Institute of Science & Technology",
    badge: "Class Topper 🏆",
    description: "Awarded academic topper certificate for outstanding academic performance in the 3rd year, 1st semester at Siddhartha Institute of Science & Technology.",
    colorTheme: {
      bg: "bg-[#9333EA]/10",
      text: "text-[#d8b4fe]",
      border: "border-[#9333EA]/50",
      hoverBorder: "hover:border-[#9333EA]/50"
    }
  }
];

export default function AchievementsFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const dly = (n: number) => (hasBeenOpened ? 0 : n);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="achievements-page font-mono text-[#d4d4d4] text-[14px] leading-[24px] p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="achievements-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{'// achievements.ts -- hackathons, awards & honors'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">Achievements</h1>
        <p className="subtitle text-[#858585] mt-1">Hackathons, Competitions & Key Milestones</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hackathons.map((h, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: dly(0.2 + idx * 0.1) }}
            className={`bg-[#252526] border border-[#333] p-5 rounded-lg ${h.colorTheme.hoverBorder} hover:bg-[#2a2d2e] transition-all duration-300 relative group flex flex-col justify-between shadow-lg`}
          >
            <div>
              <div className="flex justify-between items-start mb-2 gap-3">
                <h4 className="subheading-font text-lg font-bold text-[#e0e0e0] leading-tight group-hover:text-white transition-colors">
                  {h.project}
                </h4>
                <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold ${h.colorTheme.bg} ${h.colorTheme.text} border ${h.colorTheme.border} whitespace-nowrap shrink-0`}>
                  {h.badge}
                </span>
              </div>
              <div className="text-[#4fc1ff] font-medium text-xs mb-3">{h.name}</div>
              <p className="text-[#cccccc] text-sm leading-relaxed">{h.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
