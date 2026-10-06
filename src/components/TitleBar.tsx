'use client';
import { useState, useRef, useEffect } from 'react';
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose, VscChevronRight } from 'react-icons/vsc';
import { useStore } from '../store/useStore';

export default function TitleBar() {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isRunMenuOpen, setIsRunMenuOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const editMenuRef = useRef<HTMLDivElement>(null);
  const runMenuRef = useRef<HTMLDivElement>(null);
  const helpMenuRef = useRef<HTMLDivElement>(null);
  const viewMenuRef = useRef<HTMLDivElement>(null);
  
  const { openFile, closeFile, closeAllFiles, activeFile, setCommandPaletteOpen, openedHistory, toggleCopilot, zoomIn, zoomOut, resetZoom } = useStore();

  const menus = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help", "Copilot"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setIsFileMenuOpen(false);
      }
      if (editMenuRef.current && !editMenuRef.current.contains(event.target as Node)) {
        setIsEditMenuOpen(false);
      }
      if (runMenuRef.current && !runMenuRef.current.contains(event.target as Node)) {
        setIsRunMenuOpen(false);
      }
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
        setIsHelpMenuOpen(false);
      }
      if (viewMenuRef.current && !viewMenuRef.current.contains(event.target as Node)) {
        setIsViewMenuOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFileMenuOpen(false);
        setIsEditMenuOpen(false);
        setIsRunMenuOpen(false);
        setIsHelpMenuOpen(false);
        setIsViewMenuOpen(false);
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'a') {
        const tagName = document.activeElement?.tagName.toLowerCase();
        if (tagName !== 'input' && tagName !== 'textarea') {
          event.preventDefault();
          const editorContainer = document.getElementById('main-editor-container');
          if (editorContainer) {
            const range = document.createRange();
            range.selectNodeContents(editorContainer);
            const selection = window.getSelection();
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFileMenuClick = (action: string, arg?: any) => {
    setIsFileMenuOpen(false);
    switch (action) {
      case 'newTab':
        openFile('home.tsx');
        break;
      case 'openFile':
        setCommandPaletteOpen(true);
        break;
      case 'closeTab':
        if (activeFile) closeFile(activeFile);
        break;
      case 'closeAllTabs':
        closeAllFiles();
        break;
      case 'openRecent':
        if (arg) openFile(arg);
        break;
    }
  };

  const handleEditMenuClick = (action: string) => {
    setIsEditMenuOpen(false);
    switch (action) {
      case 'find':
        setCommandPaletteOpen(true);
        break;
      case 'selectAll':
        const editorContainer = document.getElementById('main-editor-container');
        if (editorContainer) {
          const range = document.createRange();
          range.selectNodeContents(editorContainer);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
        break;
      case 'copy':
        const selectedText = window.getSelection()?.toString();
        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
        } else {
          document.execCommand('copy');
        }
        break;
    }
  };

  const recentFiles = openedHistory.slice(-4).reverse();
  const displayRecent = recentFiles.length > 0 ? recentFiles : ['home.tsx', 'about.ts', 'projects.ts', 'skills.json'];

  return (
    <div className="relative flex h-[28px] w-full shrink-0 select-none items-center justify-between bg-[#181818] text-[#cccccc] text-[13px] border-b border-[#2b2b2b]">
      {/* Left Menu Section */}
      <div className="flex h-full items-center pl-1">
        <div className="hidden md:flex h-full items-center subheading-font">
          {menus.map((menu) => (
            <div 
              key={menu} 
              ref={menu === 'File' ? fileMenuRef : menu === 'Edit' ? editMenuRef : menu === 'Run' ? runMenuRef : menu === 'Help' ? helpMenuRef : menu === 'View' ? viewMenuRef : null}
              className={`flex h-full items-center px-2 cursor-pointer hover:bg-white/10 rounded-md transition-colors my-[2px] relative ${(menu === 'File' && isFileMenuOpen) || (menu === 'Edit' && isEditMenuOpen) || (menu === 'Run' && isRunMenuOpen) || (menu === 'Help' && isHelpMenuOpen) || (menu === 'View' && isViewMenuOpen) ? 'bg-white/10' : ''}`}
              onClick={() => {
                setIsFileMenuOpen(menu === 'File' ? !isFileMenuOpen : false);
                setIsEditMenuOpen(menu === 'Edit' ? !isEditMenuOpen : false);
                setIsRunMenuOpen(menu === 'Run' ? !isRunMenuOpen : false);
                setIsHelpMenuOpen(menu === 'Help' ? !isHelpMenuOpen : false);
                setIsViewMenuOpen(menu === 'View' ? !isViewMenuOpen : false);

                if (menu === 'Copilot') {
                  toggleCopilot();
                } else if (menu === 'Go') {
                  setCommandPaletteOpen(true);
                } else if (menu === 'Terminal') {
                  useStore.getState().toggleTerminal();
                }
              }}
            >
              {menu}
              
              {/* File Menu Dropdown */}
              {menu === 'File' && isFileMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-[#252526] border border-[#454545] rounded-md shadow-2xl py-1 z-50 text-[13px] text-[#cccccc] flex flex-col cursor-default" 
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => handleFileMenuClick('newTab')}>
                    <span>New Tab</span>
                    <span className="text-[#858585] text-xs">Ctrl+T</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => handleFileMenuClick('openFile')}>
                    <span>Open File...</span>
                    <span className="text-[#858585] text-xs">Ctrl+P</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => handleFileMenuClick('closeTab')}>
                    <span>Close Tab</span>
                    <span className="text-[#858585] text-xs">Ctrl+W</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer transition-colors" onClick={() => handleFileMenuClick('closeAllTabs')}>
                    Close All Tabs
                  </div>
                  
                  <div className="h-[1px] bg-[#454545] my-1 mx-2"></div>
                  
                  <div className="px-6 py-1.5 hover:bg-[#2a2d2e] cursor-pointer flex items-center justify-between group relative transition-colors">
                    <span>Open Recent</span>
                    <VscChevronRight className="text-[#858585]" />
                    <div className="absolute top-0 left-[99%] w-48 bg-[#252526] border border-[#454545] rounded-md shadow-2xl py-1 hidden group-hover:block">
                      {displayRecent.map(file => (
                        <div key={file} className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer text-[#cccccc] transition-colors" onClick={() => handleFileMenuClick('openRecent', file)}>
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-[1px] bg-[#454545] my-1 mx-2"></div>
                  
                  <a href="#" className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer block text-inherit no-underline transition-colors" onClick={() => setIsFileMenuOpen(false)}>
                    Download Resume
                  </a>
                </div>
              )}

              {/* Edit Menu Dropdown */}
              {menu === 'Edit' && isEditMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-[#252526] border border-[#333] rounded-md shadow-lg py-1 z-50 text-[13px] text-[#cccccc] flex flex-col cursor-default" 
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-6 py-1.5 hover:bg-[#2a2d2e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => handleEditMenuClick('find')}>
                    <span>Find...</span>
                    <span className="text-[#858585] text-xs">Ctrl+P</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#2a2d2e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => handleEditMenuClick('selectAll')}>
                    <span>Select All</span>
                    <span className="text-[#858585] text-xs">Ctrl+A</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#2a2d2e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => handleEditMenuClick('copy')}>
                    <span>Copy</span>
                    <span className="text-[#858585] text-xs">Ctrl+C</span>
                  </div>
                </div>
              )}

              {/* View Menu Dropdown */}
              {menu === 'View' && isViewMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-[290px] bg-[#252526] border border-[#454545] rounded-md shadow-2xl py-1 z-50 text-[13px] text-[#cccccc] flex flex-col cursor-default" 
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { setCommandPaletteOpen(true); setIsViewMenuOpen(false); }}>
                    <span>Command Palette</span>
                    <span className="text-[#858585] text-xs">Ctrl+P</span>
                  </div>
                  
                  <div className="h-[1px] bg-[#454545] my-1 mx-2"></div>
                  
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { 
                    const state = useStore.getState();
                    state.setActiveSidebarPanel(state.activeSidebarPanel ? null : 'explorer');
                    setIsViewMenuOpen(false); 
                  }}>
                    <span>Toggle Sidebar</span>
                    <span className="text-[#858585] text-xs">Ctrl+B</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { useStore.getState().toggleTerminal(); setIsViewMenuOpen(false); }}>
                    <span>Toggle Terminal</span>
                    <span className="text-[#858585] text-xs">Ctrl+`</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors text-[#c586c0] whitespace-nowrap gap-4" onClick={() => { toggleCopilot(); setIsViewMenuOpen(false); }}>
                    <span className="whitespace-nowrap">✨ Madhuri's Copilot</span>
                    <span className="text-[#858585] text-xs whitespace-nowrap">Ctrl+Shift+C</span>
                  </div>
                  
                  <div className="h-[1px] bg-[#454545] my-1 mx-2"></div>
                  
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { 
                    if (!document.fullscreenElement) {
                      document.documentElement.requestFullscreen().catch(err => console.error(err));
                    } else {
                      if (document.exitFullscreen) {
                        document.exitFullscreen();
                      }
                    }
                    setIsViewMenuOpen(false); 
                  }}>
                    <span>Enter Full Screen</span>
                    <span className="text-[#858585] text-xs">F11</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { zoomIn(); setIsViewMenuOpen(false); }}>
                    <span>Zoom In</span>
                    <span className="text-[#858585] text-xs">Ctrl++</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { zoomOut(); setIsViewMenuOpen(false); }}>
                    <span>Zoom Out</span>
                    <span className="text-[#858585] text-xs">Ctrl+-</span>
                  </div>
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer transition-colors" onClick={() => { resetZoom(); setIsViewMenuOpen(false); }}>
                    Reset Zoom
                  </div>
                </div>
              )}

              {/* Run Menu Dropdown */}
              {menu === 'Run' && isRunMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-[#252526] border border-[#454545] rounded-md shadow-2xl py-1 z-50 text-[13px] text-[#cccccc] flex flex-col cursor-default" 
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { useStore.getState().toggleTerminal(); setIsRunMenuOpen(false); }}>
                    <span>Start Terminal</span>
                    <span className="text-[#858585] text-xs">Ctrl+`</span>
                  </div>
                </div>
              )}

              {/* Help Menu Dropdown */}
              {menu === 'Help' && isHelpMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-72 bg-[#252526] border border-[#454545] rounded-md shadow-2xl py-1 z-50 text-[13px] text-[#cccccc] flex flex-col cursor-default" 
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer flex justify-between items-center transition-colors" onClick={() => { setCommandPaletteOpen(true); setIsHelpMenuOpen(false); }}>
                    <span>Command Palette</span>
                    <span className="text-[#858585] text-xs">Ctrl+P</span>
                  </div>
                  
                  <div className="h-[1px] bg-[#454545] my-1 mx-2"></div>
                  
                  <div className="px-6 py-1 text-[10px] text-[#858585] uppercase tracking-wider font-semibold">KEYBOARD SHORTCUTS</div>
                  
                  <div className="px-6 py-1.5 flex justify-start items-center">
                    <span className="bg-[#3c3c3c] border border-[#454545] rounded px-1.5 py-0.5 text-[#cccccc] text-[11px] min-w-[45px] text-center mr-3 font-mono shadow-sm">Ctrl+P</span>
                    <span className="text-[#858585]">Go to file</span>
                  </div>
                  <div className="px-6 py-1.5 flex justify-start items-center">
                    <span className="bg-[#3c3c3c] border border-[#454545] rounded px-1.5 py-0.5 text-[#cccccc] text-[11px] min-w-[45px] text-center mr-3 font-mono shadow-sm">Ctrl+B</span>
                    <span className="text-[#858585]">Toggle sidebar</span>
                  </div>
                  <div className="px-6 py-1.5 flex justify-start items-center">
                    <span className="bg-[#3c3c3c] border border-[#454545] rounded px-1.5 py-0.5 text-[#cccccc] text-[11px] min-w-[45px] text-center mr-3 font-mono shadow-sm">Ctrl+`</span>
                    <span className="text-[#858585]">Toggle terminal</span>
                  </div>
                  <div className="px-6 py-1.5 flex justify-start items-center">
                    <span className="bg-[#3c3c3c] border border-[#454545] rounded px-1.5 py-0.5 text-[#cccccc] text-[11px] text-center mr-3 font-mono whitespace-nowrap shadow-sm">Ctrl+Shift+C</span>
                    <span className="text-[#858585]">Toggle Copilot ✨</span>
                  </div>
                  
                  <div className="h-[1px] bg-[#454545] my-1 mx-2"></div>
                  
                  <div className="px-6 py-1.5 hover:bg-[#04395e] cursor-pointer transition-colors" onClick={() => { useStore.getState().openFile('about.ts'); setIsHelpMenuOpen(false); }}>
                    About
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center Search / Title */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto w-[60%] sm:w-auto">
        <div className="flex items-center bg-[#2d2d2d] border border-[#3c3c3c] hover:border-[#555555] rounded-md px-4 sm:px-16 md:px-32 py-[2px] transition-colors cursor-text w-full sm:w-auto max-w-full md:max-w-[40vw] justify-center">
          <span className="text-[#858585] truncate text-[12px]">Yeggoni Madhuri | Portfolio</span>
        </div>
      </div>

      {/* Right Windows Controls */}
      <div className="flex h-full items-center">
        <div className="flex h-full w-[46px] items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          <VscChromeMinimize className="text-[14px]" />
        </div>
        <div className="flex h-full w-[46px] items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          <VscChromeMaximize className="text-[14px]" />
        </div>
        <div className="flex h-full w-[46px] items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
          <VscChromeClose className="text-[14px]" />
        </div>
      </div>
    </div>
  );
}
