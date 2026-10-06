'use client';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

import HomeFile from './files/HomeFile';
import AboutFile from './files/AboutFile';
import ProjectsFile from './files/ProjectsFile';
import SkillsFile from './files/SkillsFile';
import ExperienceFile from './files/ExperienceFile';
import EducationFile from './files/EducationFile';
import ResearchFile from './files/ResearchFile';
import AchievementsFile from './files/AchievementsFile';
import CertificationsFile from './files/CertificationsFile';
import ContactFile from './files/ContactFile';

export default function Editor() {
  const { activeFile, openedHistory, markAsOpened } = useStore();

  const hasBeenOpened = activeFile ? openedHistory.includes(activeFile) : false;

  useEffect(() => {
    if (activeFile && !hasBeenOpened) {
      const timer = setTimeout(() => {
        markAsOpened(activeFile);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeFile, hasBeenOpened, markAsOpened]);

  if (!activeFile) {
    return (
      <div className="flex flex-1 items-center justify-center bg-vscode-bg h-full w-full">
        <div className="text-4xl md:text-6xl font-bold tracking-widest text-[#2d2d2d] select-none text-center px-4">
          MADHURI YEGGONI PORTFOLIO
        </div>
      </div>
    );
  }

  const renderFileContent = () => {
    switch (activeFile) {
      case 'home.tsx': return <HomeFile hasBeenOpened={hasBeenOpened} />;
      case 'about.ts': return <AboutFile hasBeenOpened={hasBeenOpened} />;
      case 'projects.ts':
      case 'projects.js': return <ProjectsFile hasBeenOpened={hasBeenOpened} />;
      case 'skills.json': return <SkillsFile hasBeenOpened={hasBeenOpened} />;
      case 'experience.ts': return <ExperienceFile hasBeenOpened={hasBeenOpened} />;
      case 'education.ts': return <EducationFile hasBeenOpened={hasBeenOpened} />;
      case 'research.ts': return <ResearchFile hasBeenOpened={hasBeenOpened} />;
      case 'achievements.ts': return <AchievementsFile hasBeenOpened={hasBeenOpened} />;
      case 'certifications.ts': return <CertificationsFile hasBeenOpened={hasBeenOpened} />;
      case 'contact.ts':
      case 'contact.css': return <ContactFile hasBeenOpened={hasBeenOpened} />;
      default: return <div className="p-6 text-[#cccccc]">Unknown file type...</div>;
    }
  };

  return (
    <div id="main-editor-container" className="flex-1 overflow-y-auto bg-vscode-bg relative custom-scrollbar select-text">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFile}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.15 }}
          className="h-full w-full"
        >
          {renderFileContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
