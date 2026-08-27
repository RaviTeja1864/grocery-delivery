import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  entryComplete: boolean;
  zone: string;
  area: string;
  completeEntry: (zone: string, area: string) => void;
  signIn: () => void;
}

export const useSessionStore = create<SessionState>()(persist((set) => ({
  entryComplete: false,
  zone: '',
  area: '',
  completeEntry: (zone, area) => set({ entryComplete: true, zone, area }),
  signIn: () => set({ entryComplete: true }),
}), { name: 'nectar-session-storage' }));
