import { VscCode, VscJson, VscFileMedia, VscTerminalCmd, VscBook, VscVerified, VscMail, VscFileCode } from "react-icons/vsc";
import { SiTypescript, SiJavascript, SiReact, SiCss, SiHtml5, SiPython } from "react-icons/si";
import { IconType } from "react-icons";

export interface FileType {
  name: string;
  language: string;
  content: string;
  icon: IconType;
  color: string;
}

export const filesData: FileType[] = [
  {
    name: "home.tsx",
    language: "typescript",
    icon: SiReact,
    color: "#61dafb",
    content: `// Welcome to my portfolio!
// I'm Madhuri Yeggoni — Web Dev, Quantum ML & Cloud Enthusiast.

const developer = {
  name: "YEGGONI MADHURI",
  roles: ["Web Dev", "Quantum ML", "Hackathon Winner", "Cloud Computing"],
  status: "Open to Opportunities / Student",
  tagline: "Curious to learn. Driven to build.",
  greeting: () => "Hello, World!"
};

export default function Home() {
  return (
    <div className="hero">
      <h1>{developer.greeting()}</h1>
      <p>I am {developer.name} — {developer.status}</p>
    </div>
  );
}
`
  },
  {
    name: "about.ts",
    language: "typescript",
    icon: SiTypescript,
    color: "#3178c6",
    content: `/**
 * ABOUT ME
 * 
 * Hi, I'm Madhuri. Computer Science student specializing in
 * Cloud Computing, Web Development, and Quantum Machine Learning.
 */

export const aboutMe = {
  name: "Madhuri Yeggoni",
  title: "B.Tech CSE Student",
  institution: "Siddhartha Institute of Science and Technology",
  philosophy: "Building intelligent solutions, one line of code at a time.",
  summary: "Hi, I'm Madhuri. I'm a Computer Science student specializing in Cloud Computing, Web Development, and Quantum Machine Learning. I enjoy building responsive web applications, exploring cloud architectures, and solving real-world problems through applied ML on quantum hardware. Every project from hackathons to internships is an opportunity to learn, innovate, and grow as a developer.",
  focusAreas: [
    "Cloud Architecture (AWS)",
    "Web Development (React)",
    "Quantum Machine Learning",
    "Database Design (MySQL)",
    "Team Leadership & Outreach",
    "Problem Solving"
  ]
};
`
  },
  {
    name: "skills.json",
    language: "json",
    icon: VscJson,
    color: "#cbcb41",
    content: `{
  "languages": ["Python", "JavaScript", "SQL", "Java", "HTML5", "CSS3", "C"],
  "frontend": ["React", "HTML/CSS", "Tailwind CSS"],
  "backend": ["Node.js", "Django", "REST APIs"],
  "cloudAndDevOps": ["AWS (EC2, S3, IAM)", "Linux", "Git", "GitHub"],
  "databases": ["MySQL", "PostgreSQL"],
  "aiAndQuantum": ["PyTorch", "Scikit-learn", "Qiskit", "Quantum ML", "CNN"],
  "coreCS": ["DBMS", "System Design", "Operating Systems", "Computer Networks"],
  "tools": ["VS Code", "Figma", "Postman", "Docker"]
}
`
  },
  {
    name: "projects.ts",
    language: "typescript",
    icon: SiTypescript,
    color: "#3178c6",
    content: `// Featured Projects by Yeggoni Madhuri

export const projects = [
  {
    name: "We Are All Together",
    tag: "FULL STACK • REACT • NODE.JS",
    description: "A community support platform connecting people needing assistance with volunteers across financial support, blood donation, and education.",
    techStack: ["React", "Node.js", "JavaScript", "HTML", "CSS", "Git", "GitHub"],
    live: "https://wealltogether.in/"
  },
  {
    name: "Quantum Anomaly Detection Intelligence System (QADIS)",
    tag: "QUANTUM COMPUTING • MACHINE LEARNING",
    description: "A universal quantum machine learning platform for multi-domain anomaly detection, achieving 94% fraud detection, 91% sepsis prediction, and 73% zero-day attack detection using Fidelity Quantum Kernels and QSVM deployed on IBM's 127-qubit cloud hardware.",
    techStack: ["Python", "Qiskit", "IBM Quantum", "QSVM", "Scikit-learn", "Gradio"],
    live: "https://fraudguardai.vercel.app/"
  },
  {
    name: "Smart Sericulture Vision (Kaiko-Ken)",
    tag: "AI • COMPUTER VISION • AGRICULTURE",
    description: "Computer vision AI pipeline for automated silkworm cocoon gender classification, achieving a 30x efficiency gain over traditional manual inspection methods with Central Silk Board collaboration.",
    techStack: ["Python", "OpenCV", "Machine Learning", "CNN", "IoT Sensors"],
    live: "https://kaiko-ken.netlify.app/"
  }
];
`
  },
  {
    name: "experience.ts",
    language: "typescript",
    icon: SiTypescript,
    color: "#3178c6",
    content: `// Work & Leadership Experience

export const experiences = [
  {
    role: "Web Development Intern",
    organization: "Levite Tech Private Limited",
    period: "Jun 2026 – Aug 2026",
    description: "Worked as a Web Development Intern, building UI screens and features using React, JavaScript, HTML, CSS, and PHP/MySQL. Improved responsive components and app logic, following Git/GitHub workflows and code review practices. Gained hands-on exposure to Flutter development basics and AI-assisted development.",
    tags: ["React", "JavaScript", "PHP", "MySQL", "Git", "GitHub", "Teamwork"]
  },
  {
    role: "Public Outreach Lead",
    organization: "GeeksforGeeks Student Chapter",
    period: "Dec 2024 – Dec 2025",
    description: "Led technical community initiatives connecting 500+ students with coding and learning opportunities. Organized the 'Tech Duo Wars' event, driving public outreach and student participation. Delivered workshops on Linux fundamentals and System Design in collaboration with GeeksforGeeks mentors.",
    tags: ["Community Leadership", "Public Speaking", "Linux", "System Design", "Networking", "Branding"]
  }
];
`
  },
  {
    name: "education.ts",
    language: "typescript",
    icon: SiTypescript,
    color: "#3178c6",
    content: `// Academic Background

export const education = [
  {
    institution: "Siddhartha Institute of Science and Technology",
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Computer Science & Engineering",
    period: "2023 – 2027",
    score: "CGPA 9.5 / 10"
  },
  {
    institution: "The Nandyal Junior College",
    degree: "Board of Intermediate Education",
    period: "2021 – 2023",
    score: "96.5%"
  },
  {
    institution: "Zilla Parishad High School",
    degree: "SSC (APSSC)",
    period: "2019 – 2021",
    score: "97.3%"
  }
];
`
  },
  {
    name: "achievements.ts",
    language: "typescript",
    icon: VscVerified,
    color: "#fbbf24",
    content: `// Achievements & Honors

export const achievements = [
  {
    event: "Amaravati Quantum Valley Hackathon",
    award: "Runner-Up 🥈 (₹30K Prize)",
    description: "Built QADIS — Quantum Anomaly Detection Intelligence System using Qiskit and IBM Quantum."
  },
  {
    event: "Make for Madanapalle Hackathon",
    award: "Runner-Up 🥈",
    description: "Built Kaiko-Ken — Silkworm Gender Classification AI with computer vision."
  },
  {
    event: "Academic Excellence – B.Tech 3rd Year",
    award: "Class Topper 🏆",
    description: "Awarded academic topper certificate for outstanding academic performance in the 3rd year, 1st semester at Siddhartha Institute of Science & Technology."
  },
  {
    event: "Tech Charades",
    award: "First Prize 🥇",
    description: "Won first prize in Tech Charades competition."
  },
  {
    event: "Idea Blueprint (CSE Association Event)",
    award: "First Prize 🥇",
    description: "Won first prize in Idea Blueprint at CSE Association Event."
  }
];
`
  },
  {
    name: "certifications.ts",
    language: "typescript",
    icon: VscVerified,
    color: "#a855f7",
    content: `// Professional Certifications

export const certifications = [
  {
    name: "Introduction to Industry 4.0 and Industrial Internet of Things",
    provider: "NPTEL",
    status: "Completed ✅"
  }
];
`
  },
  {
    name: "contact.ts",
    language: "typescript",
    icon: VscMail,
    color: "#e1306c",
    content: `// Contact Information & Links

export const contactDetails = {
  email: "madhuriyeggoni@gmail.com",
  linkedin: "https://linkedin.com/in/Madhuri-yeggoni",
  github: "https://github.com/madhuriyeggoni",
  instagram: "https://www.instagram.com/madhuriiiiii_royal/",
  phone: "8639492875"
};
`
  }
];
