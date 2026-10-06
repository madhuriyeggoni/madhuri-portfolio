'use client';
import { VscChevronRight, VscChevronDown, VscEllipsis, VscCollapseAll } from 'react-icons/vsc';
import { filesData } from '../data/files';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export default function Sidebar() {
  const { activeFile, openFile, setActiveSidebarPanel } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  const handleFileClick = (fileName: string) => {
    openFile(fileName);
    if (window.innerWidth < 768) {
      setActiveSidebarPanel(null);
    }
  };

  return (
    <div className="flex select-none h-full bg-[#252526] text-[#cccccc] w-[calc(100vw-48px)] md:w-[250px] flex-shrink-0 flex-col border-r border-[#2b2b2b] subheading-font">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-3 text-[11px] uppercase tracking-wide text-[#bbbbbb] shrink-0 font-semibold mb-2">
        <span>Explorer</span>
        <VscEllipsis className="cursor-pointer hover:text-white" />
      </div>

      <div className="flex-1 overflow-y-auto w-full pb-4 custom-scrollbar">
        {/* Accordion Context */}
        <div 
          className="flex items-center px-1 py-1 cursor-pointer hover:bg-[#2a2d2e] border-t border-[#3c3c3c] border-opacity-30 group text-[#858585]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <VscChevronDown className="mr-0.5 text-[16px] opacity-70" /> : <VscChevronRight className="mr-0.5 text-[16px] opacity-70" />}
          <span className="text-[11px] font-bold tracking-wide uppercase">Portfolio</span>
        </div>

        {/* Files Tree */}
        {isOpen && (
          <div className="flex flex-col w-full">
            {/* Folder Mock */}
            <div className="flex items-center py-1 pl-[22px] cursor-pointer hover:bg-[#2a2d2e] text-[#858585]">
              <VscChevronDown className="mr-1 text-[16px] opacity-70" />
              <VscCollapseAll className="mr-1.5 text-[16px] text-[#dcb67a] opacity-60 grayscale-[30%]" />
              <span className="text-[13px] tracking-tight">src</span>
            </div>
            
            <div className="flex flex-col w-full relative before:absolute before:left-[30px] before:top-0 before:bottom-0 before:w-[1px] before:bg-[#3c3c3c] before:opacity-50">
              {filesData.map((file) => {
                const Icon = file.icon;
                const isActive = activeFile === file.name;
                
                return (
                  <div
                    key={file.name}
                    onClick={() => handleFileClick(file.name)}
                    className={`flex items-center py-[3px] pl-[44px] pr-2 cursor-pointer text-[13px] transition-colors ${
                      isActive ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-[#858585]'
                    }`}
                  >
                    <Icon className={`mr-2 text-[16px] shrink-0 ${isActive ? '' : 'opacity-60 grayscale-[30%]'}`} style={{ color: file.color }} />
                    <span className="truncate tracking-tight">{file.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
