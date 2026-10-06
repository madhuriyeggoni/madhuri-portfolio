import { create } from 'zustand';

interface StoreState {
  openedFiles: string[];
  activeFile: string | null;
  activeSidebarPanel: 'explorer' | 'search' | 'sourceControl' | null;
  isTerminalOpen: boolean;
  isCopilotOpen: boolean;
  commandPaletteOpen: boolean;
  terminalHistory: string[];
  openedHistory: string[];
  
  // Actions
  openFile: (fileName: string) => void;
  closeFile: (fileName: string) => void;
  closeAllFiles: () => void;
  setActiveFile: (fileName: string) => void;
  setActiveSidebarPanel: (panel: 'explorer' | 'search' | 'sourceControl' | null) => void;
  toggleTerminal: () => void;
  toggleCopilot: () => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  addTerminalHistory: (entry: string) => void;
  markAsOpened: (fileName: string) => void;
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  isSourceControlOpen: boolean;
  toggleSourceControl: () => void;
}

const welcomeBanner = `╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        Welcome to Yeggoni Madhuri's Developer Terminal       ║
║                                                              ║
║    Cloud • DevOps • Web Dev | Building the Future with Code  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Type "help" to see all available commands.`;

export const useStore = create<StoreState>((set) => ({
  openedFiles: ['home.tsx'],
  activeFile: 'home.tsx',
  activeSidebarPanel: 'explorer',
  isTerminalOpen: false,
  isCopilotOpen: false,
  commandPaletteOpen: false,
  terminalHistory: [welcomeBanner],
  openedHistory: [],
  zoomLevel: 1.0,
  isSourceControlOpen: false,

  openFile: (fileName) => set((state) => {
    const newHistory = state.openedHistory.includes(fileName) 
      ? state.openedHistory 
      : [...state.openedHistory, fileName];

    if (!state.openedFiles.includes(fileName)) {
      return { 
        openedFiles: [...state.openedFiles, fileName],
        activeFile: fileName,
        openedHistory: newHistory
      };
    }
    return { activeFile: fileName, openedHistory: newHistory };
  }),

  closeFile: (fileName) => set((state) => {
    const newOpened = state.openedFiles.filter(f => f !== fileName);
    let newActive = state.activeFile;
    
    if (state.activeFile === fileName) {
      if (newOpened.length > 0) {
        const index = state.openedFiles.indexOf(fileName);
        newActive = newOpened[index - 1] || newOpened[0];
      } else {
        newActive = null;
      }
    }
    return { openedFiles: newOpened, activeFile: newActive };
  }),

  closeAllFiles: () => set({ openedFiles: [], activeFile: null }),

  setActiveFile: (fileName) => set({ activeFile: fileName }),
  setActiveSidebarPanel: (panel) => set({ activeSidebarPanel: panel }),
  
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  toggleCopilot: () => set((state) => ({ isCopilotOpen: !state.isCopilotOpen })),
  
  setCommandPaletteOpen: (isOpen) => set({ commandPaletteOpen: isOpen }),

  addTerminalHistory: (entry) => set((state) => ({ 
    terminalHistory: [...state.terminalHistory, entry] 
  })),

  markAsOpened: (fileName) => set((state) => {
    if (!state.openedHistory.includes(fileName)) {
      return { openedHistory: [...state.openedHistory, fileName] };
    }
    return state;
  }),

  zoomIn: () => set((state) => ({ zoomLevel: Math.min(2.0, state.zoomLevel + 0.1) })),
  zoomOut: () => set((state) => ({ zoomLevel: Math.max(0.5, state.zoomLevel - 0.1) })),
  resetZoom: () => set({ zoomLevel: 1.0 }),
  toggleSourceControl: () => set((state) => ({ isSourceControlOpen: !state.isSourceControlOpen }))
}));
