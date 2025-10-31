// src/components/ColorConverter/ColorHistory.tsx
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "../../style/designToken";
import { useColorStore } from "@/store/colorStore";
import { Icon } from "@/components/common/Icon";

export const ColorHistory = () => {
  const { history, setColor, setAlpha, clearHistory } = useColorStore();

  if (history.length === 0) {
    return (
      <section
        css={css`
          background: ${DESIGN_TOKEN_COLOR.white};
          border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
          border-radius: 1.2rem;
          padding: 2rem;
          text-align: center;
          color: ${DESIGN_TOKEN_COLOR.gray500};
        `}
      >
        <p
          css={css`
            font-size: 1.6rem;
            margin-bottom: 1rem;
          `}
        >
          저장된 색상이 없습니다
        </p>
        <p
          css={css`
            font-size: 1.4rem;
          `}
        >
          색상을 저장하면 여기에 표시됩니다
        </p>
      </section>
    );
  }

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
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        `}
      >
        <h3
          css={css`
            font-size: 1.6rem;
            font-weight: 600;
            color: ${DESIGN_TOKEN_COLOR.gray700};
          `}
        >
          최근 사용 색상
          <span
            css={css`
              font-size: 1.3rem;
              color: ${DESIGN_TOKEN_COLOR.gray500};
              font-weight: 400;
              margin-left: 0.8rem;
            `}
          >
            {history.length}/20
          </span>
        </h3>

        <button
          onClick={clearHistory}
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1rem;
            font-size: 1.3rem;
            color: ${DESIGN_TOKEN_COLOR.gray600};
            background: transparent;
            border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
            border-radius: 0.6rem;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background: ${DESIGN_TOKEN_COLOR.gray100};
              color: ${DESIGN_TOKEN_COLOR.black};
              border-color: ${DESIGN_TOKEN_COLOR.black};
            }

            &:hover svg {
              color: ${DESIGN_TOKEN_COLOR.black};
            }
          `}
        >
          <Icon icon="ic_delete_color" size={1.6} />
          전체 삭제
        </button>
      </div>

      {/* 그리드 - 더 작은 칩들 */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
          gap: 0.8rem;
        `}
      >
        {history.map((item, index) => {
          const hexToRgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          };

          return (
            <div
              key={`${item.color}-${item.alpha}-${index}`}
              onClick={() => {
                setColor(item.color);
                setAlpha(item.alpha);
              }}
              css={css`
                aspect-ratio: 1;
                background: ${hexToRgba(item.color, item.alpha)};
                border: 2px solid ${DESIGN_TOKEN_COLOR.gray200};
                border-radius: 0.6rem;
                cursor: pointer;
                transition: all 0.2s;
              `}
              title={`${item.color} (${Math.round(item.alpha * 100)}%)`}
            />
          );
        })}
      </div>
    </section>
  );
};
