'use client';
import { VscRemote, VscError, VscWarning, VscBell, VscCheckAll, VscSourceControl } from 'react-icons/vsc';
import { useStore } from '../store/useStore';
import { filesData } from '../data/files';

export default function StatusBar() {
  const { activeFile } = useStore();
  const file = filesData.find(f => f.name === activeFile);

  return (
    <div className="flex h-[22px] w-full items-center justify-between bg-[#007acc] text-[12px] text-white select-none shrink-0 z-50">
      <div className="flex h-full items-center">
        <div className="flex h-full px-2 cursor-pointer hover:bg-white/20 bg-[#16825D] items-center justify-center transition-colors">
          <VscRemote className="text-[14px]" />
        </div>
        <div className="flex items-center cursor-pointer hover:bg-white/20 px-2 h-full transition-colors space-x-1">
          <VscSourceControl className="text-[14px]" /> 
          <span className="text-[12px] pt-[1px] font-medium tracking-wide">main*</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-2 h-full transition-colors">
          <VscError className="text-[14px]" /> <span className="pt-[1px]">0</span>
          <VscWarning className="text-[14px] ml-1" /> <span className="pt-[1px]">0</span>
        </div>
      </div>
      
      <div className="flex h-full items-center pr-2">
        <div className="hidden md:flex cursor-pointer hover:bg-white/20 px-2 items-center h-full transition-colors pt-[1px]">
          Ln 1, Col 1
        </div>
        <div className="hidden md:flex cursor-pointer hover:bg-white/20 px-2 items-center h-full transition-colors pt-[1px]">
          Spaces: 2
        </div>
        <div className="hidden md:flex cursor-pointer hover:bg-white/20 px-2 items-center h-full transition-colors pt-[1px]">
          UTF-8
        </div>
        <div className="hidden md:flex cursor-pointer hover:bg-white/20 px-2 items-center h-full transition-colors pt-[1px]">
          CRLF
        </div>
        <div className="cursor-pointer hover:bg-white/20 px-2 flex items-center h-full transition-colors pt-[1px]">
          {file ? ('{' + file.language + '}') : '{typescriptreact}'}
        </div>
        <div className="hidden md:flex cursor-pointer hover:bg-white/20 px-2 items-center h-full space-x-1 transition-colors">
          <VscCheckAll className="text-[14px]" /> <span className="pt-[1px]">Prettier</span>
        </div>
        <div className="cursor-pointer hover:bg-white/20 px-2 flex items-center h-full transition-colors">
          <VscBell className="text-[14px]" />
        </div>
      </div>
    </div>
  );
}
