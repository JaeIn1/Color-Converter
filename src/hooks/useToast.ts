import { useCallback } from "react";
import type { ToastType } from "@/types/toast";
import { useToastStore } from "@/store/toastAtom";

export const useToast = () => {
  const toastDataState = useToastStore((state) => state.toasts);
  const addToast = useToastStore((state) => state.addToast);
  const removeToastFromStore = useToastStore((state) => state.removeToast);

  const removeToast = useCallback(
    (toastID: ToastType["id"]) => {
      removeToastFromStore(toastID);
    },
    [removeToastFromStore]
  );

  const emitToast = useCallback(
    (toast: Omit<ToastType, "id">) => {
      addToast(toast);
    },
    [addToast]
  );

  const toast = {
    success: (content: string) => emitToast({ type: "success", content }),
    error: (content: string) => emitToast({ type: "error", content }),
  };

  return { toast, toastDataState, emitToast, removeToast };
};
