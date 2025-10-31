// src/components/ColorConverter/ColorSave.tsx
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "../../style/designToken";
import { useColorStore } from "@/store/colorStore";

export const ColorSave = () => {
  const { color, alpha, addToHistory } = useColorStore();

  const handleSave = () => {
    if (!color.match(/^#[0-9A-Fa-f]{6}$/)) {
      alert("올바른 색상을 먼저 선택해주세요");
      return;
    }

    addToHistory({ color, alpha });
  };

  // HEX를 RGBA로 변환
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const rgbaColor = hexToRgba(color, alpha);
  const isValidColor = color.match(/^#[0-9A-Fa-f]{6}$/);

  return (
    <section
      css={css`
        background: ${DESIGN_TOKEN_COLOR.white};
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        border-radius: 1.2rem;
        padding: 2rem;
      `}
    >
      <h3
        css={css`
          font-size: 1.6rem;
          font-weight: 600;
          color: ${DESIGN_TOKEN_COLOR.gray700};
          margin-bottom: 1.2rem;
        `}
      >
        현재 색상을 저장해보세요
      </h3>

      <p
        css={css`
          font-size: 1.4rem;
          color: ${DESIGN_TOKEN_COLOR.gray500};
          margin-bottom: 1.6rem;
        `}
      >
        색상과 투명도를 설정한 후 저장 버튼을 눌러주세요
      </p>

      {/* 현재 색상 미리보기 */}
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1.5rem;
          background: ${DESIGN_TOKEN_COLOR.gray50};
          border-radius: 0.8rem;
          margin-bottom: 1.5rem;
        `}
      >
        <div
          css={css`
            width: 6rem;
            height: 6rem;
            background: ${isValidColor
              ? rgbaColor
              : DESIGN_TOKEN_COLOR.gray200};
            border: 2px solid ${DESIGN_TOKEN_COLOR.gray200};
            border-radius: 0.8rem;
          `}
        />
        <div
          css={css`
            flex: 1;
          `}
        >
          <div
            css={css`
              font-size: 1.3rem;
              color: ${DESIGN_TOKEN_COLOR.gray500};
              margin-bottom: 0.4rem;
            `}
          >
            저장될 색상
          </div>
          <div
            css={css`
              font-size: 1.6rem;
              font-family: "Monaco", monospace;
              font-weight: 600;
              color: ${isValidColor
                ? DESIGN_TOKEN_COLOR.black
                : DESIGN_TOKEN_COLOR.gray400};
            `}
          >
            {isValidColor ? color : "색상을 선택해주세요"}
          </div>
          <div
            css={css`
              font-size: 1.3rem;
              color: ${DESIGN_TOKEN_COLOR.gray500};
              margin-top: 0.2rem;
            `}
          >
            투명도: {Math.round(alpha * 100)}%
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={!isValidColor}
        css={css`
          width: 100%;
          padding: 1.4rem;
          border: none;
          background: ${isValidColor
            ? DESIGN_TOKEN_COLOR.black
            : DESIGN_TOKEN_COLOR.gray300};
          color: ${DESIGN_TOKEN_COLOR.white};
          border-radius: 0.8rem;
          font-size: 1.6rem;
          font-weight: 600;
          cursor: ${isValidColor ? "pointer" : "not-allowed"};
          transition: all 0.2s;
        `}
      >
        저장하기
      </button>
    </section>
  );
};
