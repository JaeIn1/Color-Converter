import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ColorHistoryItem {
  color: string;
  alpha: number;
}

interface ColorState {
  color: string;
  alpha: number;
  setColor: (color: string) => void;
  setAlpha: (alpha: number) => void;
  history: ColorHistoryItem[];
  addToHistory: (item: ColorHistoryItem) => void;
  clearHistory: () => void;
}

export const useColorStore = create<ColorState>()(
  persist(
    (set) => ({
      color: "#be4b4b",
      alpha: 1,
      history: [],

      setColor: (color) => set({ color }),
      setAlpha: (alpha) => set({ alpha }),

      addToHistory: (item) =>
        set((state) => ({
          history: [
            item,
            ...state.history.filter(
              (h) => !(h.color === item.color && h.alpha === item.alpha)
            ),
          ].slice(0, 20),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "color-converter-storage",
    }
  )
);
