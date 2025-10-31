import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "../../style/designToken";
import { useColorStore } from "@/store/colorStore";
import { Icon } from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";

export const ConvertedColorList = () => {
  const { color, alpha } = useColorStore();
  const { toast } = useToast();

  // HEX를 RGB로 변환
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  // RGB를 HSL로 변환
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Alpha를 HEX8로 변환
  const alphaToHex = (alpha: number) => {
    const hex = Math.round(alpha * 255)
      .toString(16)
      .toUpperCase();
    return hex.padStart(2, "0");
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const colorFormats = [
    { label: "HEX", value: color.toUpperCase() },
    {
      label: "HEX8 (Alpha)",
      value: `${color.toUpperCase()}${alphaToHex(alpha)}`,
    },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    {
      label: "RGBA",
      value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`,
    },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    {
      label: "HSLA",
      value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha.toFixed(2)})`,
    },
    { label: "CSS 변수", value: `--primary-color: ${color};` },
  ];

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${value} 복사 완료!`);
    } catch {
      toast.error("복사에 실패했습니다");
    }
  };

  return (
    <section
      css={css`
        background: ${DESIGN_TOKEN_COLOR.white};
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        border-radius: 1.2rem;
        padding: 2rem;
      `}
    >
      <h2
        css={css`
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: ${DESIGN_TOKEN_COLOR.gray700};
        `}
      >
        변환된 색상 코드
      </h2>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        {colorFormats.map((format) => (
          <div
            key={format.label}
            onClick={() => handleCopy(format.value)}
            css={css`
              border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
              border-radius: 0.8rem;
              padding: 1.6rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              transition: all 0.2s;

              &:hover {
                background: ${DESIGN_TOKEN_COLOR.gray50};
                border-color: ${DESIGN_TOKEN_COLOR.black};
              }
            `}
          >
            <div
              css={css`
                flex: 1;
                min-width: 0;
              `}
            >
              <p
                css={css`
                  font-size: 1.3rem;
                  color: ${DESIGN_TOKEN_COLOR.gray500};
                  margin-bottom: 0.4rem;
                `}
              >
                {format.label}
              </p>
              <p
                css={css`
                  font-size: 1.6rem;
                  font-family: "Monaco", "Courier New", monospace;
                  color: ${DESIGN_TOKEN_COLOR.black};
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {format.value}
              </p>
            </div>

            {/* 복사 아이콘 */}
            <div
              css={css`
                margin-left: 1rem;
                flex-shrink: 0;
              `}
            >
              <Icon
                icon="ic_copy"
                size={2}
                color={DESIGN_TOKEN_COLOR.gray600}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
