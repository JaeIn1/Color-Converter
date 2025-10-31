// src/components/ColorConverter/AlphaSlider.tsx
import { css } from "@emotion/react";
import { Range } from "react-range";
import { DESIGN_TOKEN_COLOR } from "../../style/designToken";
import { useColorStore } from "@/store/colorStore";

export const AlphaSlider = () => {
  const { alpha, setAlpha } = useColorStore();

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
          투명도 (Alpha)
        </h3>
        <div
          css={css`
            display: flex;
            gap: 1rem;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 1.6rem;
            `}
          >
            {alpha.toFixed(2)}
          </span>
          <span
            css={css`
              font-size: 1.4rem;
              color: ${DESIGN_TOKEN_COLOR.gray500};
            `}
          >
            ({Math.round(alpha * 100)}%)
          </span>
        </div>
      </div>

      <Range
        step={0.01}
        min={0}
        max={1}
        values={[alpha]}
        onChange={(values) => setAlpha(values[0])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            css={css`
              width: 100%;
              height: 0.6rem;
              background: ${DESIGN_TOKEN_COLOR.gray200};
              border-radius: 0.3rem;
              position: relative;
            `}
          >
            {/* 채워진 부분 (검은색) */}
            <div
              css={css`
                position: absolute;
                height: 100%;
                background: ${DESIGN_TOKEN_COLOR.black};
                border-radius: 0.3rem;
                width: ${alpha * 100}%;
              `}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;

          return (
            <div
              key={key}
              {...rest}
              css={css`
                width: 2rem;
                height: 2rem;
                background: ${DESIGN_TOKEN_COLOR.white};
                border: 2px solid ${DESIGN_TOKEN_COLOR.black};
                border-radius: 50%;
                cursor: pointer;
                outline: none;

                &:hover {
                  transform: scale(1.1);
                }
              `}
            />
          );
        }}
      />
    </section>
  );
};
