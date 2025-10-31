// src/pages/ColorConvertPage.tsx
import { AlphaSlider } from "@/components/colorConverter/AlphaSlider";
import { ColorHistory } from "@/components/colorConverter/ColorHistory";
import { ColorInput } from "@/components/colorConverter/ColorInput";
import { ColorPreview } from "@/components/colorConverter/ColorPreview";
import { ColorSave } from "@/components/colorConverter/ColorSave";
import { ConvertedColorList } from "@/components/colorConverter/ConvertedColorList";
import { Header } from "@/components/common/Header";
import { DESIGN_TOKEN_COLOR } from "@/style/designToken";
import { css } from "@emotion/react";

function ColorConvertPage() {
  return (
    <div
      css={css`
        min-height: 100vh;
        padding-top: 10rem;
        background: ${DESIGN_TOKEN_COLOR.gray50};
      `}
    >
      <Header
        title="컬러 코드 변환 & 복사 도구"
        description="색상 코드를 다양한 포맷으로 변환하고 원클릭으로 복사하세요"
      />

      <main
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        {/* 왼쪽 */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 2rem;
          `}
        >
          <ColorInput />
          <ColorPreview />
          <AlphaSlider />
          <ColorSave /> {/* 투명도 바로 아래 */}
          <ColorHistory /> {/* 맨 아래 */}
        </div>

        {/* 오른쪽 */}
        <ConvertedColorList />
      </main>
    </div>
  );
}

export default ColorConvertPage;
