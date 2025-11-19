import { create } from "zustand";

interface DroneControlState {
  isPlaying: boolean;
  progress: number;
  setPlaying: (v: boolean) => void;
  reset: () => void;
  setProgress: (p: number) => void;
}

export const useDroneControls = create<DroneControlState>((set) => ({
  isPlaying: false,
  progress: 0,
  setPlaying: (v) => set({ isPlaying: v }),
  reset: () => set({ progress: 0, isPlaying: false }),
  setProgress: (p) => set({ progress: p }),
}));
