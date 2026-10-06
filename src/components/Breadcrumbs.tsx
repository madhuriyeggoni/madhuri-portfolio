'use client';
import { VscChevronRight } from 'react-icons/vsc';
import { filesData } from '../data/files';
import { useStore } from '../store/useStore';

export default function Breadcrumbs() {
  const { activeFile } = useStore();
  const file = filesData.find(f => f.name === activeFile);

  if (!file) return <div className="h-[22px]" />;

  const Icon = file.icon;

  return (
    <div className="flex h-[22px] w-full shrink-0 select-none items-center px-4 bg-vscode-bg text-[11px] text-[#cccccc] opacity-50 z-10 border-b border-transparent shadow-[0_4px_4px_-4px_rgba(0,0,0,0.1)] overflow-x-auto hide-scrollbar whitespace-nowrap">
      <div className="flex items-center cursor-pointer hover:text-[#cccccc] transition-colors shrink-0">
        <span>portfolio</span>
      </div>
      <VscChevronRight className="mx-1 text-[14px] text-[#858585]" />
      <div className="flex items-center cursor-pointer hover:text-[#cccccc] transition-colors">
        <span>src</span>
      </div>
      <VscChevronRight className="mx-1 text-[14px] text-[#858585]" />
      <div className="flex items-center cursor-pointer hover:text-[#cccccc] transition-colors">
        <Icon className="mr-1.5 text-[14px]" style={{ color: file.color }} />
        <span className="text-[#cccccc]">{file.name}</span>
      </div>
    </div>
  );
}
