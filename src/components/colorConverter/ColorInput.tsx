// src/components/ColorConverter/ColorInput.tsx
import { css } from "@emotion/react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { DESIGN_TOKEN_COLOR } from "../../style/designToken";
import { Icon } from "../common/Icon";
import { useColorStore } from "@/store/colorStore";

export const ColorInput = () => {
  const { color, alpha, setColor, addToHistory } = useColorStore();
  const [showPicker, setShowPicker] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleOpenPicker = () => {
    setShowPicker(!showPicker);
  };

  // 엔터 키로 저장
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (color.match(/^#[0-9A-Fa-f]{6}$/)) {
        addToHistory({ color, alpha });
        e.currentTarget.blur(); // 포커스 해제
      } else {
        alert("올바른 HEX 색상 코드를 입력해주세요 (예: #FF5733)");
      }
    }
  };

  return (
    <div
      css={css`
        background: ${DESIGN_TOKEN_COLOR.white};
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
        border-radius: 1.2rem;
        padding: 2rem;
        position: relative;
      `}
    >
      <h2
        css={css`
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1.6rem;
          color: ${DESIGN_TOKEN_COLOR.gray700};
        `}
      >
        색상을 입력해보세요
      </h2>

      <div
        css={css`
          display: flex;
          gap: 1rem;
          align-items: center;
        `}
      >
        <input
          type="text"
          placeholder="#be4b4b"
          value={color}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          css={css`
            flex: 1;
            padding: 1.2rem;
            border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
            border-radius: 0.8rem;
            font-size: 1.6rem;
            font-family: "Monaco", "Courier New", monospace;

            &:focus {
              outline: none;
              border-color: ${DESIGN_TOKEN_COLOR.black};
            }
          `}
        />

        <div
          css={css`
            position: relative;
            width: 4.8rem;
            height: 4.8rem;
            border: 1px solid ${DESIGN_TOKEN_COLOR.gray300};
            border-radius: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: border-color 0.2s;

            &:hover {
              border-color: ${DESIGN_TOKEN_COLOR.black};
            }
          `}
          onClick={handleOpenPicker}
        >
          <Icon
            icon="ic_color_pick"
            size={2.4}
            color={DESIGN_TOKEN_COLOR.gray600}
          />
        </div>
      </div>

      {/* 컬러피커 */}
      {showPicker && (
        <>
          <div
            css={css`
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 998;
            `}
            onClick={() => setShowPicker(false)}
          />

          <div
            css={css`
              position: absolute;
              top: 100%;
              left: 0;
              margin-top: 1rem;
              background: ${DESIGN_TOKEN_COLOR.white};
              border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
              border-radius: 1.2rem;
              padding: 1.5rem;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
              z-index: 999;

              .react-colorful {
                width: 22rem;
                height: 18rem;
              }

              .react-colorful__saturation {
                border-radius: 0.8rem 0.8rem 0 0;
              }

              .react-colorful__hue {
                height: 1.2rem;
                border-radius: 0.6rem;
                margin-top: 1rem;
              }

              .react-colorful__pointer {
                width: 1.8rem;
                height: 1.8rem;
              }
            `}
          >
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        </>
      )}

      <p
        css={css`
          margin-top: 1rem;
          font-size: 1.3rem;
          color: ${DESIGN_TOKEN_COLOR.gray500};
        `}
      >
        지원 포맷: #FF5733, rgb(255, 87, 51), hsl(9, 100%, 60%)
      </p>
    </div>
  );
};
