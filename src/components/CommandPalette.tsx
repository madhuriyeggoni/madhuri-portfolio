'use client';
import { useState, useEffect, useRef } from 'react';
import { VscChevronRight, VscTerminalCmd } from 'react-icons/vsc';
import { filesData } from '../data/files';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, openFile } = useStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = filesData.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map(f => ({ ...f, type: 'file' }));
  const results = [...filteredFiles];

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const isP = e.key?.toLowerCase() === 'p' || e.code === 'KeyP';
      const isB = e.key?.toLowerCase() === 'b' || e.code === 'KeyB';
      const isC = e.key?.toLowerCase() === 'c' || e.code === 'KeyC';
      const isT = e.key?.toLowerCase() === 't' || e.code === 'KeyT';
      const isW = e.key?.toLowerCase() === 'w' || e.code === 'KeyW';

      // Toggle terminal on Ctrl+` or Ctrl+~
      if (isCmdOrCtrl && (e.key === '\`' || e.key === '~' || e.code === 'Backquote')) {
        e.preventDefault();
        useStore.getState().toggleTerminal();
      }
      
      // Toggle Command Palette on Ctrl+P
      if (isCmdOrCtrl && isP) {
        e.preventDefault();
        setCommandPaletteOpen(!useStore.getState().commandPaletteOpen);
      }
      
      // Toggle sidebar on Ctrl+B
      if (isCmdOrCtrl && isB) {
        e.preventDefault();
        const state = useStore.getState();
        state.setActiveSidebarPanel(state.activeSidebarPanel ? null : 'explorer');
      }

      // Toggle Copilot on Ctrl+Shift+C
      if (isCmdOrCtrl && e.shiftKey && isC) {
        e.preventDefault();
        useStore.getState().toggleCopilot();
      }
      
      if (e.key === 'Escape' || e.code === 'Escape') {
        setCommandPaletteOpen(false);
      }

      // New Tab (Ctrl+T)
      if (isCmdOrCtrl && isT) {
        e.preventDefault();
        useStore.getState().openFile('home.tsx');
      }

      // Close Tab (Ctrl+W)
      if (isCmdOrCtrl && isW) {
        e.preventDefault();
        const state = useStore.getState();
        if (state.activeFile) {
          state.closeFile(state.activeFile);
        }
      }

      // Zoom In (Ctrl + = or Ctrl + +)
      if (isCmdOrCtrl && (e.key === '=' || e.key === '+' || e.code === 'Equal' || e.code === 'NumpadAdd')) {
        e.preventDefault();
        useStore.getState().zoomIn();
      }

      // Zoom Out (Ctrl + -)
      if (isCmdOrCtrl && (e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract')) {
        e.preventDefault();
        useStore.getState().zoomOut();
      }

      // Reset Zoom (Ctrl + 0)
      if (isCmdOrCtrl && (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0')) {
        e.preventDefault();
        useStore.getState().resetZoom();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleGlobalKeyDown, { capture: true });
  }, [setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setSearch('');
    }
  }, [commandPaletteOpen]);

  const handleSelect = (item: any) => {
    if (item.type === 'file') {
      openFile(item.name);
    }
    setCommandPaletteOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        handleSelect(selected);
      }
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 w-[600px] bg-[#252526] border border-[#454545] rounded-lg shadow-2xl z-[60] flex flex-col overflow-hidden max-w-[90vw]"
          >
            <div className="p-2 border-b border-[#454545]">
              <div className="flex items-center bg-[#3c3c3c] px-3 py-2 rounded border border-[#3c3c3c] focus-within:border-[#007fd4] justify-between">
                <div className="flex items-center w-full">
                  <VscChevronRight className="text-[#858585] mr-2 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="bg-transparent w-full outline-none text-[#cccccc] text-[13px] placeholder-[#858585]"
                    placeholder="Search files by name..."
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[10px] text-[#858585] bg-[#2a2d2e] border border-[#454545] px-1.5 py-0.5 rounded shadow-sm">
                    ESC
                  </span>
                </div>
              </div>
            </div>
            {results.length > 0 && (
              <div className="max-h-[350px] overflow-y-auto py-2 custom-scrollbar">
                {filteredFiles.length > 0 && (
                  <div>
                    <div className="px-4 py-1 text-[11px] text-[#858585] uppercase tracking-wider font-semibold">FILES</div>
                    {filteredFiles.map(file => {
                      const index = results.findIndex(r => r.name === file.name);
                      const isSelected = index === selectedIndex;
                      const Icon = file.icon;
                      return (
                        <div
                          key={file.name}
                          className={`flex items-center px-4 py-[6px] cursor-pointer text-[13px] ${isSelected ? 'bg-[#04395e] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'}`}
                          onClick={() => handleSelect(file)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <Icon className="mr-3 inline text-base" style={{ color: file.color }} />
                          <span>{file.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {results.length === 0 && (
              <div className="p-4 text-center text-[#858585] text-[13px]">
                No matching results found.
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
