'use client';
import { VscClose } from 'react-icons/vsc';
import { filesData } from '../data/files';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tabs() {
  const { openedFiles, activeFile, openFile, closeFile } = useStore();

  return (
    <div className="flex h-10 w-full overflow-x-auto bg-vscode-tabBar shrink-0 select-none hide-scrollbar">
      <AnimatePresence initial={false}>
        {openedFiles.map((fileName) => {
          const file = filesData.find((f) => f.name === fileName);
          if (!file) return null;
          
          const isActive = activeFile === fileName;
          const Icon = file.icon;

          return (
            <motion.div
              layout
              key={fileName}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, width: 0, padding: 0, margin: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => openFile(fileName)}
              className={`group flex min-w-[120px] max-w-[200px] cursor-pointer items-center justify-between border-r border-vscode-border px-3 py-2 text-[13px] ${
                isActive
                  ? 'bg-vscode-bg text-white border-t-[1px] border-t-vscode-accent'
                  : 'bg-vscode-tabInactive text-vscode-textDark hover:bg-vscode-bg hover:text-vscode-text border-t-[1px] border-t-transparent'
              }`}
            >
              <div className="flex items-center overflow-hidden">
                <Icon className="mr-2 shrink-0 text-base" style={{ color: file.color }} />
                <span className="truncate">{fileName}</span>
              </div>
              <button
                className={`ml-2 flex h-5 w-5 items-center justify-center rounded p-1 hover:bg-vscode-hover ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(fileName);
                }}
              >
                <VscClose size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
