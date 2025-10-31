import { css } from "@emotion/react";
import { ToastItem } from "./ToastItem";
import { Portal } from "../Portal";
import { useToastStore } from "@/store/toastAtom";

export function Toast() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <Portal id="toast-root">
      <div
        css={css`
          position: fixed;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          row-gap: 0.5rem;
          top: 2rem;
          left: 50%;
          transform: translate(-50%, 0);
          z-index: 1000000;
        `}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </div>
    </Portal>
  );
}
