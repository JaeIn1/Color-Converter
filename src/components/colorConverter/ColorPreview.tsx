import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "../../style/designToken";
import { useColorStore } from "@/store/colorStore";

export const ColorPreview = () => {
  const { color, alpha } = useColorStore();

  // HEX를 RGBA로 변환
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const rgbaColor = hexToRgba(color, alpha);

  return (
    <section
      css={css`
        background: ${DESIGN_TOKEN_COLOR.white};
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        border-radius: 1.2rem;
        padding: 2rem;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 20rem;
          background: ${rgbaColor};
          border-radius: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.6rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        `}
      >
        <p
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          현재 색상
        </p>
        <p
          css={css`
            font-family: "Monaco", monospace;
          `}
        >
          {rgbaColor}
        </p>
      </div>
    </section>
  );
};
