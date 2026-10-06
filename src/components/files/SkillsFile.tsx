'use client';
import { motion, Variants } from 'framer-motion';

const skillsData = [
  {
    title: "Programming Languages",
    items: [
      { name: "HTML & CSS", percent: 90, color: "#e34f26" },
      { name: "Python", percent: 70, color: "#3776ab" },
      { name: "JavaScript", percent: 70, color: "#f7df1e" },
      { name: "SQL", percent: 70, color: "#c586c0" },
      { name: "Java", percent: 50, color: "#f89820" }
    ]
  },
  {
    title: "Frontend & Web Development",
    items: [
      { name: "React", percent: 75, color: "#61dafb" },
      { name: "HTML / CSS", percent: 90, color: "#e34f26" },
      { name: "Tailwind CSS", percent: 65, color: "#38bdf8" },
      { name: "REST APIs", percent: 65, color: "#4fc1ff" }
    ]
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Node.js", percent: 70, color: "#68a063" },
      { name: "Django", percent: 70, color: "#2ba977" },
      { name: "REST APIs", percent: 65, color: "#4fc1ff" }
    ]
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "Git & GitHub", percent: 90, color: "#f05032" },
      { name: "Linux", percent: 80, color: "#d4d4d4" },
      { name: "AWS", percent: 70, color: "#f97316" }
    ]
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", percent: 80, color: "#00758f" },
      { name: "PostgreSQL", percent: 70, color: "#336791" }
    ]
  },
  {
    title: "AI / ML & Quantum",
    items: [
      { name: "PyTorch", percent: 75, color: "#ee4c2c" },
      { name: "Scikit-learn", percent: 70, color: "#f89939" },
      { name: "Qiskit / Quantum ML", percent: 75, color: "#a855f7" }
    ]
  },
  {
    title: "Core CS & Systems",
    items: [
      { name: "DBMS", percent: 80, color: "#c586c0" },
      { name: "System Design", percent: 65, color: "#f97316" },
      { name: "Operating Systems", percent: 60, color: "#4fc1ff" },
      { name: "Computer Networks", percent: 60, color: "#22c55e" }
    ]
  }
];

const familiarTech = [
  "Git",
  "GitHub",
  "Linux",
  "VS Code",
  "Figma",
  "AWS (EC2, S3)",
  "Qiskit",
  "Postman",
  "C",
  "Docker",
  "Tailwind CSS",
  "MySQL"
];

const SkillItem = ({ name, percent, color }: { name: string, percent: number, color: string }) => {
  return (
    <div className="skill-item flex flex-col gap-1 mb-4">
      <div className="skill-row flex justify-between text-[13px] font-mono text-[#d4d4d4]">
        <span className="skill-name">{name}</span>
        <span className="skill-percent text-[#858585]">{percent}%</span>
      </div>
      <div className="progress-bar w-full h-[6px] bg-[#252526] rounded-full overflow-hidden border border-[#3c3c3c]">
        <motion.div
          className="progress-fill h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

const SkillGroup = ({ title, items }: { title: string, items: any[] }) => {
  return (
    <div className="skill-group bg-[#1e1e1e] border border-[#333] rounded-lg p-5 shadow-sm">
      <h3 className="group-title subheading-font text-lg font-bold text-[#e0e0e0] mb-4 border-b border-[#333] pb-2">
        {title}
      </h3>
      <div className="skill-list">
        {items.map((item, idx) => (
          <SkillItem key={idx} name={item.name} percent={item.percent} color={item.color} />
        ))}
      </div>
    </div>
  );
};

export default function SkillsFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const container: Variants = {
    hidden: { opacity: hasBeenOpened ? 1 : 0 },
    visible: { opacity: 1, transition: { staggerChildren: hasBeenOpened ? 0 : 0.1 } }
  };

  const item: Variants = {
    hidden: { opacity: hasBeenOpened ? 1 : 0, y: hasBeenOpened ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const dly = (n: number) => hasBeenOpened ? 0 : n;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="skills-page font-mono flex flex-col gap-6 w-full h-full overflow-y-auto p-6 max-w-4xl mx-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="skills-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{'// skills.ts -- technical proficiencies'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">Skills</h1>
        <p className="subtitle text-[#858585] mt-1">Technologies and tools I use to build systems.</p>
      </motion.div>

      <motion.div
        initial={hasBeenOpened ? "visible" : "hidden"}
        animate="visible"
        variants={container}
        className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skillsData.map((group, idx) => (
          <motion.div key={idx} variants={item}>
            <SkillGroup title={group.title} items={group.items} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.3) }}
        className="familiar-section mt-4 mb-8 bg-[#252526] border border-[#333] rounded-lg p-5 shadow-sm"
      >
        <h3 className="subheading-font text-lg font-bold text-[#e0e0e0] mb-4 border-b border-[#3c3c3c] pb-2">
          Also Familiar With
        </h3>
        <div className="tags flex flex-wrap gap-2">
          {familiarTech.map((tech, i) => (
            <span key={i} className="tag text-xs font-mono text-[#d4d4d4] bg-[#1e1e1e] border border-[#3c3c3c] px-3 py-1.5 rounded-md hover:border-[#4fc1ff]/50 hover:text-[#4fc1ff] transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}