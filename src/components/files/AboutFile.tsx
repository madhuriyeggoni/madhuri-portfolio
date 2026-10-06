'use client';
import { motion } from 'framer-motion';
import { FaBrain, FaCloud, FaDatabase, FaCode, FaGraduationCap, FaPuzzlePiece, FaUsers } from 'react-icons/fa';

export default function AboutFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const dly = (n: number) => hasBeenOpened ? 0 : n;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="about-page font-mono text-[#d4d4d4] text-[14px] leading-[24px] p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full h-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]"
    >
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: dly(0.1) }} className="about-header flex flex-col gap-2">
        <div className="code-line text-[#6A9955] text-sm">{'// about.ts -- details about the developer'}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">About Me</h1>
        <p className="subtitle text-[#858585] mt-1">Building intelligent solutions, one line of code at a time.</p>
      </motion.div>

      {/* Intro Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: dly(0.2) }} className="about-card bg-[#252526] border border-[#333] rounded-lg p-5 shadow-lg">
        <p className="text-[#cccccc]">
          Hi, I&apos;m <span className="highlight-name text-[#4fc1ff] font-bold">Madhuri</span>. I&apos;m a Computer Science student specializing in <span className="highlight-keyword text-[#ce9178]">Cloud Computing</span>, <span className="highlight-keyword text-[#ce9178]">Web Development</span>, and <span className="highlight-keyword text-[#ce9178]">Quantum Machine Learning</span>. I enjoy building responsive web applications, exploring cloud architectures, and solving real-world problems through applied ML on quantum hardware. Every project from hackathons to internships is an opportunity to learn, innovate, and grow as a developer.
        </p>
      </motion.div>

      {/* Current Focus Section */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: dly(0.3) }} className="focus-section flex flex-col gap-4">
        <h2 className="subheading-font text-2xl font-bold text-white border-b border-[#333] pb-2 uppercase tracking-wider">CURRENT FOCUS</h2>

        <div className="focus-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="focus-item flex items-center gap-4 bg-[#1e1e1e] border border-[#3c3c3c] rounded-md p-4 hover:border-[#00D4FF] transition-colors cursor-default">
            <span className="icon text-xl text-[#00D4FF]"><FaCloud /></span>
            <p className="font-medium text-[#d4d4d4]">Cloud Architecture (AWS)</p>
          </div>

          <div className="focus-item flex items-center gap-4 bg-[#1e1e1e] border border-[#3c3c3c] rounded-md p-4 hover:border-[#16A34A] transition-colors cursor-default">
            <span className="icon text-xl text-[#16A34A]"><FaCode /></span>
            <p className="font-medium text-[#d4d4d4]">Web Development (React)</p>
          </div>

          <div className="focus-item flex items-center gap-4 bg-[#1e1e1e] border border-[#3c3c3c] rounded-md p-4 hover:border-[#c586c0] transition-colors cursor-default">
            <span className="icon text-xl text-[#c586c0]"><FaBrain /></span>
            <p className="font-medium text-[#d4d4d4]">Quantum Machine Learning</p>
          </div>

          <div className="focus-item flex items-center gap-4 bg-[#1e1e1e] border border-[#3c3c3c] rounded-md p-4 hover:border-[#dcdcaa] transition-colors cursor-default">
            <span className="icon text-xl text-[#dcdcaa]"><FaDatabase /></span>
            <p className="font-medium text-[#d4d4d4]">Database Design (MySQL)</p>
          </div>

          <div className="focus-item flex items-center gap-4 bg-[#1e1e1e] border border-[#3c3c3c] rounded-md p-4 hover:border-[#F59E0B] transition-colors cursor-default">
            <span className="icon text-xl text-[#F59E0B]"><FaUsers /></span>
            <p className="font-medium text-[#d4d4d4]">Team Leadership & Outreach</p>
          </div>

          <div className="focus-item flex items-center gap-4 bg-[#1e1e1e] border border-[#3c3c3c] rounded-md p-4 hover:border-[#4fc1ff] transition-colors cursor-default">
            <span className="icon text-xl text-[#4fc1ff]"><FaPuzzlePiece /></span>
            <p className="font-medium text-[#d4d4d4]">Problem Solving</p>
          </div>
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: dly(0.4) }} className="education-section flex flex-col gap-4">
        <h2 className="subheading-font text-2xl font-bold text-white border-b border-[#333] pb-2 uppercase tracking-wider">EDUCATION</h2>

        <div className="education-card bg-[#252526] border border-[#333] rounded-lg p-5 hover:border-[#4fc1ff]/50 transition-colors">
          <div className="education-header flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#3c3c3c] pb-4 mb-4">
            <div className="left flex items-center gap-4">
              <span className="icon bg-[#1e1e1e] p-3 rounded-full border border-[#333] text-[#4fc1ff]">
                <FaGraduationCap size={22} />
              </span>
              <div className="title-group">
              <h3 className="subheading-font text-xl font-bold text-[#e0e0e0]">Siddartha Institute Of Science And Technology</h3>
              <p className="subtitle text-[#858585] text-sm mt-1">Undergraduate Studies</p>
            </div>
          </div>
          <div className="right mt-3 sm:mt-0 shrink-0">
            <span className="year inline-flex items-center text-[#6A9955] font-mono font-bold border border-[#6A9955]/30 bg-[#6A9955]/10 px-3 py-1 rounded text-sm whitespace-nowrap">
              2023 - 2027
            </span>
          </div>
          </div>

          <div className="education-body flex flex-col gap-1">
            <p className="degree text-[#4fc1ff] font-semibold text-[15px]">
              B.Tech in Computer Science and Engineering
            </p>
            <p className="gpa text-[#858585] mt-1">CGPA: <span className="text-[#dcdcaa] font-bold">9.5 / 10</span></p>
          </div>
        </div>
      </motion.div>

      <div className="pb-8"></div>
    </motion.div>
  );
}
