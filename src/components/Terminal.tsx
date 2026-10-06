'use client';
import { useState, useRef, useEffect } from 'react';
import { VscClose, VscChevronUp, VscChevronDown, VscTrash } from 'react-icons/vsc';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Terminal() {
  const { isTerminalOpen, toggleTerminal, terminalHistory, addTerminalHistory } = useStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, isTerminalOpen]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmdString = input.trim();
      addTerminalHistory(`madhuri@kernel:~$ ${cmdString}`);
      
      const args = cmdString.split(' ');
      const cmd = cmdString.toLowerCase();
      const firstWord = args[0].toLowerCase();
      const arg1 = args.slice(1).join(' ');

      if (cmd === 'clear') {
        useStore.setState({ 
          terminalHistory: [`╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        Welcome to Yeggoni Madhuri's Developer Terminal       ║
║                                                              ║
║    Cloud • DevOps • Web Dev | Building the Future with Code  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Type "help" to see all available commands.`] 
        });
      } else if (cmd === 'help') {
        addTerminalHistory(`Available Commands

about            Brief introduction
whoami           Developer profile
skills           Technical skills
stack            Complete technology stack
projects         Featured projects
experience       Professional experience
education        Academic journey
achievements     Hackathons & awards
certifications   Professional certifications
contact          Contact information

github           Open GitHub
linkedin         Open LinkedIn

timeline         Career timeline
stats            Portfolio statistics
roadmap          Current learning roadmap
quote            Personal philosophy
goals            Current goals
services         What I build

neofetch         Developer system information
tree             Portfolio file structure
ls               List files
pwd              Print working directory
cat <file>       Read file
open <file>      Open portfolio section
history          Terminal history
date             Current date
clear            Clear terminal
exit             Exit terminal

Easter Eggs: coffee, matrix, sudo hire-me, fortune`);
      } else if (cmd === 'whoami') {
        addTerminalHistory(`Hi, I'm Yeggoni Madhuri.

B.Tech CSE student at Siddhartha Institute of Science and Technology.

I'm passionate about Cloud Computing, DevOps, and Web Development, with hands-on experience in AWS, Linux, Python, and Quantum ML.

Currently focused on:
• Cloud Computing & AWS
• DevOps & CI/CD
• Web Development
• Quantum Machine Learning

Status:
Building. Learning. Open to Opportunities.`);
      } else if (cmd === 'about') {
        useStore.getState().openFile('about.ts');
        addTerminalHistory(`B.Tech CSE student with 9.5 CGPA, seeking a Cloud Computing / DevOps internship.

Hands-on with AWS (EC2, S3, IAM), Linux, and Python, with a strong foundation in system design and applied ML on cloud-based quantum hardware (IBM 127-qubit).

Experienced in Git/GitHub-based development workflows through a completed web development internship.`);
      } else if (cmd === 'skills') {
        useStore.getState().openFile('skills.json');
        addTerminalHistory(`Languages
──────────────
Python, JavaScript, SQL, Java, HTML5, CSS3, C

Frontend & Web
──────────────
React, HTML/CSS, Tailwind CSS, REST APIs

Backend & APIs
──────────────
Node.js, Django, REST APIs

Cloud & DevOps
──────────────
AWS (EC2, S3, IAM), Linux, Git, GitHub

Databases
──────────────
MySQL, PostgreSQL

AI / ML & Quantum
──────────────
PyTorch, Scikit-learn, Qiskit, Quantum ML, CNN

Core CS
──────────────
DBMS, System Design, Operating Systems, Computer Networks`);
      } else if (cmd === 'stack') {
        addTerminalHistory(`Cloud Computing & AWS
DevOps & CI/CD
Web Development
Quantum Machine Learning
Python & Automation
React
Linux
Git & GitHub
System Design`);
      } else if (cmd === 'projects') {
        useStore.getState().openFile('projects.ts');
        addTerminalHistory(`Featured Projects

1. We Are All Together
   Community support platform for financial, blood donation & education aid
   Demo: https://wealltogether.in/

2. Quantum Anomaly Detection Intelligence System (QADIS)
   Universal Quantum ML platform on IBM 127-qubit cloud hardware
   94% fraud detection, 91% sepsis prediction, 73% zero-day attack detection
   Demo: https://fraudguardai.vercel.app/

3. Smart Sericulture Vision (Kaiko-Ken)
   Computer vision AI for cocoon gender classification (30x efficiency gain)
   Demo: https://kaiko-ken.netlify.app/

Use: click a project card or link to open live demos.`);
      } else if (cmd === 'experience') {
        useStore.getState().openFile('experience.ts');
        addTerminalHistory(`Web Development Intern
Levite Tech Private Limited
Jun 2026 – Aug 2026

Built UI screens & logic modules using React, JavaScript, HTML, CSS, PHP/MySQL.
Followed Git/GitHub workflows, code reviews, and explored Flutter & AI-assisted dev.

────────────────────────

Public Outreach Lead
GeeksforGeeks Student Chapter
Dec 2024 – Dec 2025

Led community initiatives reaching 500+ students.
Organized 'Tech Duo Wars' & delivered Linux and System Design workshops.`);
      } else if (cmd === 'education') {
        useStore.getState().openFile('education.ts');
        addTerminalHistory(`B.Tech in Computer Science and Engineering
Siddartha Institute Of Science And Technology
2023 – 2027 | CGPA: 9.5 / 10

Coursework: Operating Systems, DBMS, Computer Networks, System Design, Machine Learning, Quantum Computing`);
      } else if (cmd === 'achievements' || cmd === 'hackathons') {
        useStore.getState().openFile('achievements.ts');
        addTerminalHistory(`Achievements

🥈 Runner-Up — Amaravati Quantum Valley Hackathon (₹30K Prize)
🥈 Runner-Up — Make for Madanapalle Hackathon
🏆 Class Topper — Academic Excellence (B.Tech 3rd Year)
🥇 First Prize — Tech Charades
🥇 First Prize — Idea Blueprint (CSE Association Event)`);
      } else if (cmd === 'certifications') {
        useStore.getState().openFile('certifications.ts');
        addTerminalHistory(`Certifications

✅ NPTEL — Introduction to Industry 4.0 and Industrial Internet of Things`);
      } else if (cmd === 'timeline') {
        addTerminalHistory(`2019 ──> SSC — Zilla Parishad High School (97.3%)
↓
2021 ──> Intermediate — The Nandyal Junior College (96.5%)
↓
2023 ──> Started B.Tech CSE at Siddhartha Institute
↓
2024 ──> Public Outreach Lead @ GFG Student Chapter
↓
2026 ──> Web Dev Intern @ Levite Tech & Hackathon Runner-Ups
↓
Now  ──> Building. Learning. Growing.`);
      } else if (cmd === 'roadmap') {
        addTerminalHistory(`Completed:
✔ AWS Fundamentals (EC2, S3, IAM)
✔ Linux & Git
✔ Web Development (React, JS)
✔ Quantum ML on IBM Hardware

In Progress:
→ Advanced Cloud Architecture
→ DevOps & CI/CD Pipelines
→ System Design

Future Goals:
→ Cloud Certifications
→ DevOps Engineer Role
→ Open Source Contributions`);
      } else if (cmd === 'goals') {
        addTerminalHistory(`Current Goals:
• Cloud Computing / DevOps Internship
• Master AWS & Cloud Architecture
• Contribute to Open Source
• Build Scalable Cloud Solutions
• Continue Quantum ML Research`);
      } else if (cmd === 'services') {
        addTerminalHistory(`What I Build:
• Cloud Infrastructure & AWS Solutions
• Web Applications (React, JavaScript)
• Quantum ML Pipelines
• AI / Computer Vision Solutions
• DevOps Automation`);
      } else if (cmd === 'stats') {
        addTerminalHistory(`Developer Stats:

CGPA         : 9.5 / 10
Projects     : 2 Featured
Hackathons   : 2 Runner-Up Awards
Internships  : 1 (Levite Tech)
Leadership   : GFG Student Chapter
Certification: NPTEL Industry 4.0
Learning     : [██████████] 100%`);
      } else if (cmd === 'quote') {
        addTerminalHistory(`Hands-on with AWS, Linux, and Python.
Building scalable cloud solutions.`);
      } else if (cmd === 'contact' || cmd === 'website' || cmd === 'portfolio') {
        useStore.getState().openFile('contact.ts');
        addTerminalHistory(`Phone     : 8639492875
Email     : madhuriyeggoni@gmail.com
LinkedIn  : https://linkedin.com/in/Madhuri-yeggoni
GitHub    : https://github.com/madhuriyeggoni
Instagram : https://www.instagram.com/madhuriiiiii_royal/`);
      } else if (cmd === 'github') {
        window.open('https://github.com/madhuriyeggoni', '_blank');
        addTerminalHistory('Opened GitHub in a new tab.');
      } else if (cmd === 'linkedin') {
        window.open('https://linkedin.com/in/Madhuri-yeggoni', '_blank');
        addTerminalHistory('Opened LinkedIn in a new tab.');
      } else if (cmd === 'instagram') {
        window.open('https://www.instagram.com/madhuriiiiii_royal/', '_blank');
        addTerminalHistory('Opened Instagram in a new tab.');
      } else if (cmd === 'neofetch') {
        addTerminalHistory(`                   .--.
                .-(    ).
               (___.__)__)

────────────────────────────────────────
User        : Yeggoni Madhuri
Role        : Cloud • DevOps • Web Dev
Education   : B.Tech CSE
Institute   : Siddhartha Institute of
              Science and Technology
CGPA        : 9.5 / 10
Editor      : VS Code Portfolio
Shell       : zsh / bash
OS          : Portfolio Linux
Languages   : Python, C, JavaScript
Cloud       : AWS (EC2, S3, IAM), Linux
Frameworks  : React, Qiskit, CNN
Strengths   : Analytical Thinking, System Design
Git Branch  : main
Status      : Building. Learning. Open to Opportunities.`);
      } else if (cmd === 'tree' || cmd === 'ls') {
        addTerminalHistory(`.
├── home.tsx
├── about.ts
├── skills.json
├── experience.ts
├── education.ts
├── projects.ts
├── achievements.ts
├── certifications.ts
└── contact.ts`);
      } else if (cmd === 'pwd') {
        addTerminalHistory('/home/madhuri/portfolio');
      } else if (cmd === 'history') {
        addTerminalHistory(terminalHistory.join('\n'));
      } else if (cmd === 'date') {
        addTerminalHistory(new Date().toString());
      } else if (cmd === 'coffee') {
        addTerminalHistory(`☕

Coffee Level
[███████████████████] 100%

Ready to Build.`);
      } else if (cmd === 'matrix') {
        addTerminalHistory(`Initializing Matrix...
Loading...
[██████████████████████] 100%

Welcome back, Madhuri.`);
      } else if (cmd === 'sudo hire-me' || cmd === 'hire-me') {
        useStore.getState().openFile('contact.ts');
        addTerminalHistory(`[sudo] password for recruiter:
********
Permission Granted.

Opening contact page...
Let's build something amazing together.`);
      } else if (cmd === 'fortune') {
        addTerminalHistory(`Every expert was once a beginner.

Keep building.
Keep learning.`);
      } else if (cmd === 'exit') {
        toggleTerminal();
      } else if (firstWord === 'cat' || firstWord === 'open') {
        if (!arg1) {
          addTerminalHistory(`${firstWord}: missing file operand`);
        } else {
          const target = arg1.toLowerCase();
          if (target.includes('home')) useStore.getState().openFile('home.tsx');
          else if (target.includes('about')) useStore.getState().openFile('about.ts');
          else if (target.includes('skill')) useStore.getState().openFile('skills.json');
          else if (target.includes('project')) useStore.getState().openFile('projects.ts');
          else if (target.includes('exp')) useStore.getState().openFile('experience.ts');
          else if (target.includes('edu')) useStore.getState().openFile('education.ts');
          else if (target.includes('achiev') || target.includes('hack')) useStore.getState().openFile('achievements.ts');
          else if (target.includes('cert')) useStore.getState().openFile('certifications.ts');
          else if (target.includes('contact')) useStore.getState().openFile('contact.ts');
          else addTerminalHistory(`${firstWord}: ${arg1}: No such file or directory`);
        }
      } else if (cmd !== '') {
        addTerminalHistory(`bash: ${cmd}: command not found. Type 'help' for available commands.`);
      }
      
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 280, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="border-t border-[#3c3c3c] bg-[#1e1e1e] flex flex-col shrink-0 overflow-hidden w-full z-10"
        >
          <div className="flex items-center justify-between px-4 py-2 text-[11px] text-[#cccccc] border-b border-[#2b2b2b] bg-[#1e1e1e] overflow-x-auto hide-scrollbar">
            <div className="flex space-x-6 uppercase tracking-widest font-semibold text-[#858585] whitespace-nowrap">
              <span className="cursor-pointer hover:text-[#cccccc]">Problems <span className="opacity-60 font-normal">0</span></span>
              <span className="cursor-pointer hover:text-[#cccccc]">Output</span>
              <span className="cursor-pointer hover:text-[#cccccc]">Debug Console</span>
              <span className="cursor-pointer text-[#cccccc] border-b-[1px] cursor-default border-[#007acc] pb-1">Terminal</span>
              <span className="cursor-pointer hover:text-[#cccccc]">Ports</span>
            </div>
            <div className="flex items-center space-x-3 text-base text-[#858585] ml-4 shrink-0">
              <VscTrash className="cursor-pointer hover:text-[#cccccc] transition-colors" onClick={() => useStore.setState({ terminalHistory: [] })} />
              <VscChevronUp className="cursor-pointer hover:text-[#cccccc] transition-colors" />
              <VscChevronDown className="cursor-pointer hover:text-[#cccccc] transition-colors" />
              <VscClose className="cursor-pointer hover:text-[#cccccc] transition-colors" onClick={toggleTerminal} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 text-[13px] font-mono text-[#cccccc] leading-relaxed custom-scrollbar">
            {terminalHistory.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap leading-[1.4] mb-0.5">{line}</div>
            ))}
            <div className="flex flex-wrap items-center mt-0.5">
              <span className="text-[#4af626] mr-2">madhuri@kernel:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none border-none text-[#cccccc] min-w-[200px]"
                autoFocus
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} className="h-4" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
