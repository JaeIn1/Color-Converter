import { create } from "zustand";
import type { ToastType } from "@/types/toast";
import { getRandomID } from "@/utils/etc";

interface ToastState {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    // 중복 메시지 체크
    const isDuplicate = get().toasts.some(
      (existingToast) =>
        existingToast.content === toast.content &&
        existingToast.type === toast.type
    );

    if (!isDuplicate) {
      set((state) => ({
        toasts: [...state.toasts, { ...toast, id: getRandomID() }],
      }));
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
