'use client';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    period: "Jun 2026 – Aug 2026",
    role: "Web Development Intern",
    organization: "Levite Tech Private Limited",
    description:
      "Worked as a Web Development Intern, building UI screens and features using React, JavaScript, HTML, CSS, and PHP/MySQL. Improved responsive components and app logic, following Git/GitHub workflows and code review practices. Gained hands-on exposure to Flutter development basics and AI-assisted development.",
    tags: [
      "React",
      "JavaScript",
      "PHP",
      "MySQL",
      "Git",
      "GitHub",
      "Teamwork"
    ]
  },
  {
    period: "Dec 2024 – Dec 2025",
    role: "Public Outreach Lead",
    organization: "GeeksforGeeks Student Chapter",
    description:
      "Led technical community initiatives connecting 500+ students with coding and learning opportunities. Organized the 'Tech Duo Wars' event, driving public outreach and student participation. Delivered workshops on Linux fundamentals and System Design in collaboration with GeeksforGeeks mentors.",
    tags: [
      "Community Leadership",
      "Public Speaking",
      "Linux",
      "System Design",
      "Networking",
      "Branding"
    ]
  }
];

export default function ExperienceFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const dly = (n: number) => hasBeenOpened ? 0 : n;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="experience-page font-mono text-[#d4d4d4] text-[14px] leading-[24px] p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="experience-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{'// experience.ts -- career journey and roles'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">Experience</h1>
        <p className="subtitle text-[#858585] mt-1 font-mono text-sm">{'<Timeline />'}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.2) }}
        className="timeline-section relative border-l border-[#3c3c3c] ml-3 md:ml-4 mt-4"
      >
        {experiences.map((exp, idx) => (
          <div key={idx} className="mb-10 ml-8 relative">
            <div className="absolute -left-[39px] md:-left-[41px] top-1.5 w-3.5 h-3.5 bg-[#4fc1ff] rounded-full ring-4 ring-[#1e1e1e]"></div>

            <div className="bg-[#252526] border border-[#333] rounded-lg p-5 hover:border-[#4fc1ff]/50 hover:bg-[#2a2d2e] transition-colors shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h3 className="subheading-font text-xl font-bold text-[#e0e0e0] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#4fc1ff]" />
                  {exp.role}
                </h3>
                <span className="year text-[#6A9955] font-bold border border-[#6A9955]/30 bg-[#6A9955]/10 px-3 py-1 rounded text-sm mt-2 sm:mt-0 w-fit">
                  {exp.period}
                </span>
              </div>

              <div className="text-[#4fc1ff] font-medium mb-3">{exp.organization}</div>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2.5 py-1 text-xs font-mono bg-[#1e1e1e] text-[#dcdcaa] border border-[#3c3c3c] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}