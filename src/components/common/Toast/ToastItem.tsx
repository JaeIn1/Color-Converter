import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";
import type { ToastType } from "@/types/toast";
import { DESIGN_TOKEN_COLOR } from "@/style/designToken";
import { Icon } from "../Icon";
import { useToastStore } from "@/store/toastAtom";

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export function ToastItem({ id, type, content }: ToastType) {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 1.3rem 2rem;
        background: ${type === "success"
          ? DESIGN_TOKEN_COLOR.black
          : "#EF4444"};
        color: white;
        border-radius: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: ${slideIn} 0.3s ease-out;
        white-space: nowrap;
        cursor: pointer;
      `}
      onClick={() => removeToast(id)}
    >
      {type === "success" && (
        <Icon icon="ic_success" size={2.4} color="white" />
      )}
      {type === "error" && <Icon icon="ic_warning" size={2.4} color="white" />}
      <span
        css={css`
          font-size: 1.4rem;
          font-weight: 500;
        `}
      >
        {content}
      </span>
    </div>
  );
}
