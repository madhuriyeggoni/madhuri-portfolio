'use client';
import { motion } from 'framer-motion';
import { SiGithub, SiLeetcode, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';

const rolesData = [
  { name: 'Web Dev', color: 'bg-[#16A34A]' },
  { name: 'Quantum ML', color: 'bg-[#8B5CF6]' },
  { name: 'Hackathon Winner', color: 'bg-[#F59E0B]' },
  { name: 'Cloud Computing', color: 'bg-[#0EA5E9]' }
];

interface Props {
  hasBeenOpened: boolean;
}

const Line = ({ num, children, className = "" }: { num: number, children: React.ReactNode, className?: string }) => (
  <div className={`flex w-full group ${className}`}>
    <span className="text-[#858585] min-w-[3.5rem] tracking-wide text-right pr-6 select-none block shrink-0 font-mono">{num}</span>
    <div className="flex-1 shrink-0">{children}</div>
  </div>
);

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const typingSpeed = 60;
  const deletingSpeed = 30;
  const pauseTime = 2000;

  const messages = [
    "Curious to learn. Driven to build. 🚀",
    "Code. Cloud. Curiosity. ☁️",
    "Turning ideas into intelligent software. 🤖",
    "Solving problems. Shipping code. ⚙️"
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentMessage = messages[loopNum % messages.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentMessage.substring(0, text.length - 1));
      }, deletingSpeed);

      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    } else {
      timer = setTimeout(() => {
        setText(currentMessage.substring(0, text.length + 1));
      }, typingSpeed);

      if (text === currentMessage) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <span className="text-[#ce9178] font-mono text-[15px]">
      <span className="text-[#569cd6] font-bold">{'> '}</span>
      {text}
      <span className="animate-pulse text-[#d4d4d4]">_</span>
    </span>
  );
};

export default function HomeFile({ hasBeenOpened }: Props) {
  const { openFile } = useStore();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText("madhuriyeggoni@gmail.com");
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=madhuriyeggoni@gmail.com", "_blank");
  };

  const dly = (n: number) => hasBeenOpened ? 0 : n;

  return (
    <>
      <div className="pt-6 pb-12 w-full h-full overflow-y-auto custom-scrollbar font-mono text-[14px] leading-[24px] flex flex-col text-[#d4d4d4] bg-[#1e1e1e]">

        {/* HEADER */}
        <Line num={1}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(0.2) }} className="text-[#6A9955]">
            {'// hello world !! Welcome to my portfolio'}
          </motion.div>
        </Line>
        <Line num={2}>&nbsp;</Line>

        {/* NAME */}
        <Line num={3}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4, delay: dly(0.4) }}>
            <div className="heading-font text-[45px] md:text-[65px] leading-[0.9] text-white mb-1">
              YEGGONI
            </div>
          </motion.div>
        </Line>

        <Line num={4}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4, delay: dly(0.5) }}>
            <div style={{ display: 'inline-block' }}>
              <div className="heading-font text-[45px] md:text-[65px] leading-[0.9] text-[#00D4FF] mb-1">
                MADHURI
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: dly(0.9), ease: 'easeOut' }}
                style={{
                  height: '2px',
                  background: 'linear-gradient(to right, #0EA5E9, rgba(14,165,233,0))',
                  borderRadius: '2px',
                  width: '100%',
                  marginBottom: '20px',
                  transformOrigin: 'left',
                }}
              />
            </div>
          </motion.div>
        </Line>

        {/* ROLES */}
        <Line num={5}>
          <div className="flex flex-wrap gap-3 py-1">
            {rolesData.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: dly(0.7 + i * 0.1) }}
                className="flex items-center gap-2 border border-[#333] bg-[#252526] hover:border-[#4fc1ff]/50 hover:bg-[#2a2d2e] transition-colors px-3 py-1.5 rounded text-xs select-none cursor-default"
              >
                <div className={`w-2 h-2 rounded-full ${r.color}`}></div>
                <span className="text-[#d4d4d4] font-medium">{r.name}</span>
              </motion.div>
            ))}
          </div>
        </Line>

        {/* TYPEWRITER */}
        <Line num={6}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: dly(1.0) }} 
            className="py-2"
          >
            <TypewriterText />
          </motion.div>
        </Line>

        <Line num={7}>&nbsp;</Line>

        {/* ABOUT */}
        <Line num={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(1.1) }}>
            <span className="text-[#858585]">
              Where <span className="text-[#4fc1ff] font-medium">curiosity</span> meets <span className="text-[#4fc1ff] font-medium">code</span>—that’s where I enjoy turning
            </span>
          </motion.div>
        </Line>

        <Line num={9}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(1.2) }}>
            <span className="text-[#858585]">
              ideas into fast, <span className="text-[#4fc1ff] font-medium">scalable</span>, and <span className="text-[#4fc1ff] font-medium">intelligent software</span>,
            </span>
          </motion.div>
        </Line>

        <Line num={10}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(1.3) }}>
            <span className="text-[#858585]">
              from <span className="text-[#4fc1ff] font-medium">web apps</span> to <span className="text-[#4fc1ff] font-medium">cloud</span> and <span className="text-[#4fc1ff] font-medium">quantum ML</span>.
            </span>
          </motion.div>
        </Line>

        <Line num={11}>&nbsp;</Line>

        {/* BUTTONS */}
        <Line num={12}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(1.4) }} className="flex flex-wrap gap-3 py-2 font-mono">
            <button onClick={() => openFile('projects.ts')} className="flex items-center gap-2 border border-[#007acc] bg-[#007acc] hover:bg-[#005f9e] text-white px-5 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
              📁 Projects
            </button>
            <button onClick={() => openFile('about.ts')} className="flex items-center gap-2 border border-[#333] bg-[#252526] hover:bg-[#2d2d2d] text-[#d4d4d4] px-5 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
              👤 About Me
            </button>
            <button onClick={() => openFile('contact.ts')} className="flex items-center gap-2 border border-[#333] bg-[#252526] hover:bg-[#2d2d2d] text-[#d4d4d4] px-5 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
              ✉ Contact
            </button>
          </motion.div>
        </Line>

        <Line num={13}>&nbsp;</Line>

        {/* STATS */}
        <Line num={14}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(1.6) }} className="grid grid-cols-2 md:grid-cols-4 border border-[#3c3c3c] rounded my-2 bg-[#1c1c1c] text-[#d4d4d4] font-mono shadow-md hover:border-[#4fc1ff]/30 transition-colors">
            <div className="flex flex-col items-center justify-center py-6 border-b md:border-b-0 md:border-r border-[#3c3c3c]">
              <span className="text-white font-black text-2xl">3+</span>
              <span className="text-[#858585] text-[10px] uppercase mt-2 font-bold">Years</span>
            </div>
            <div className="flex flex-col items-center justify-center py-6 border-b md:border-b-0 md:border-r border-[#3c3c3c]">
              <span className="text-white font-black text-2xl">5+</span>
              <span className="text-[#858585] text-[10px] uppercase mt-2 font-bold">Projects</span>
            </div>
            <div className="flex flex-col items-center justify-center py-6 border-r-0 md:border-r border-[#3c3c3c]">
              <span className="text-white font-black text-2xl">∞</span>
              <span className="text-[#858585] text-[10px] uppercase mt-2 font-bold">Curiosity</span>
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              <span className="text-white font-black text-2xl">↑</span>
              <span className="text-[#858585] text-[10px] uppercase mt-2 font-bold">Always Learning</span>
            </div>
          </motion.div>
        </Line>

        <Line num={15}>&nbsp;</Line>

        {/* SOCIAL */}
        <Line num={16}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: dly(1.8) }} className="flex flex-wrap gap-3 py-1 font-mono">
            <a href="https://github.com/madhuriyeggoni" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#333] bg-[#252526] hover:border-[#4fc1ff]/50 hover:bg-[#2a2d2e] transition-colors text-xs text-[#cccccc]">
              <SiGithub size={14} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/madhuri-yeggoni/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#333] bg-[#252526] hover:border-[#4fc1ff]/50 hover:bg-[#2a2d2e] transition-colors text-xs text-[#cccccc]">
              <FaLinkedin size={14} /> LinkedIn
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=madhuriyeggoni@gmail.com" 
              onClick={handleEmailClick}
              target="_blank" 
              rel="noreferrer" 
              title="Click to compose in Gmail & copy email"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#333] bg-[#252526] hover:border-[#4fc1ff]/50 hover:bg-[#2a2d2e] transition-colors text-xs text-[#cccccc] cursor-pointer"
            >
              <FiMail size={14} className={emailCopied ? "text-[#4af626]" : ""} /> 
              {emailCopied ? "Copied: madhuriyeggoni@gmail.com" : "Email"}
            </a>
          </motion.div>
        </Line>

        <Line num={17}>&nbsp;</Line>

      </div>
    </>
  );
}