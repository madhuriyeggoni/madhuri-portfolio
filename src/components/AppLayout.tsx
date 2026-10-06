'use client';
import TitleBar from './TitleBar';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import CopilotPanel from './CopilotPanel';
import Tabs from './Tabs';
import Breadcrumbs from './Breadcrumbs';
import Editor from './Editor';
import StatusBar from './StatusBar';
import Terminal from './Terminal';
import CommandPalette from './CommandPalette';
import { VscSourceControl, VscChromeClose } from 'react-icons/vsc';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export default function AppLayout() {
  const { activeSidebarPanel, isCopilotOpen, zoomLevel, isSourceControlOpen, toggleSourceControl } = useStore();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.setProperty('zoom', zoomLevel.toString());
    }
  }, [zoomLevel]);

  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col overflow-hidden bg-[#1e1e1e] font-sans text-[#cccccc] select-none">
      <TitleBar />

      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar />
        
        {/* Mobile Backdrop for Sidebar */}
        {activeSidebarPanel && (
          <div 
            className="absolute inset-0 z-30 bg-black/50 md:hidden" 
            onClick={() => useStore.getState().setActiveSidebarPanel(null)}
          />
        )}
        
        {/* Dynamic Left Sidebar Outlet */}
        {activeSidebarPanel === 'explorer' && (
          <div className="absolute left-[48px] z-40 h-full shadow-2xl md:relative md:left-0 md:shadow-none">
            <Sidebar />
          </div>
        )}

        
        {/* Main Editor Zone */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative bg-[#1e1e1e]">
          <Tabs />
          <Breadcrumbs />
          
          {/* Split view for Editor and Terminal */}
          <div className="flex flex-1 flex-col overflow-hidden relative">
            <Editor />
            <Terminal />
          </div>
        </div>

        {/* Dynamic Right Copilot Panel */}
        {isCopilotOpen && (
          <>
            <div 
              className="absolute inset-0 z-30 bg-black/50 md:hidden" 
              onClick={() => useStore.getState().toggleCopilot()}
            />
            <div className="absolute right-0 z-40 h-full shadow-2xl md:relative md:shadow-none">
              <CopilotPanel />
            </div>
          </>
        )}
      </div>

      <StatusBar />
      <CommandPalette />

      {/* Floating Left Source Control Modal */}
      {isSourceControlOpen && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => toggleSourceControl()}
          />
          <div className="fixed left-[56px] top-[100px] w-[380px] max-w-[90vw] bg-[#252526] border border-[#454545] rounded-lg shadow-2xl z-[60] p-5 select-none text-[13px] text-[#cccccc] subheading-font">
            {/* Heading */}
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 mb-4">
              <h3 className="text-sm font-semibold text-[#cccccc] flex items-center gap-2">
                <VscSourceControl className="text-[#007acc] text-lg shrink-0" />
                <span>SOURCE CONTROL</span>
              </h3>
              <button 
                onClick={() => toggleSourceControl()} 
                className="text-[#858585] hover:text-[#cccccc] transition-colors focus:outline-none"
              >
                <VscChromeClose className="text-lg" />
              </button>
            </div>

            {/* Branch Row */}
            <div className="flex items-center justify-between py-2.5 border-b border-[#2d2d2d] text-[13px]">
              <div className="flex items-center gap-2 text-[#cccccc]">
                <span className="text-[#858585]">Branch:</span>
                <span className="font-mono text-[#4fc1ff] flex items-center gap-1 font-semibold">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 9.5 3.25zM11 11.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zm-5.75-8.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 3 3.25zM3 11.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0z" />
                  </svg>
                  main
                </span>
              </div>
              <div className="text-[#858585] text-xs text-right">
                Up to date with origin/main
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-col gap-2.5 py-4 border-b border-[#2d2d2d]">
              <div className="text-[#858585] text-[11px] uppercase tracking-wider font-semibold">Repository Status </div>
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="bg-[#2d2d2d] rounded py-2 border border-[#3c3c3c]">
                  <div className="text-[#e2c08d] font-bold text-sm">3</div>
                  <div className="text-[#858585] text-[10px] mt-0.5 uppercase">Modified</div>
                </div>
                <div className="bg-[#2d2d2d] rounded py-2 border border-[#3c3c3c]">
                  <div className="text-[#73c991] font-bold text-sm">1</div>
                  <div className="text-[#858585] text-[10px] mt-0.5 uppercase">Added</div>
                </div>
                <div className="bg-[#2d2d2d] rounded py-2 border border-[#3c3c3c]">
                  <div className="text-[#f14c4c] font-bold text-sm">0</div>
                  <div className="text-[#858585] text-[10px] mt-0.5 uppercase">Deleted</div>
                </div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="pt-4 flex justify-end">
              <a 
                href="https://github.com/madhuriyeggoni" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#007acc] hover:text-[#4fc1ff] hover:underline flex items-center gap-1 text-[13px] font-semibold transition-colors"
              >
                <span>View on GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
