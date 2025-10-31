import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "../../../style/designToken";
import { ANIIMATION } from "../../../style/animation"; // import 추가!

interface HeaderProps {
  title: string;
  description?: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <header
      css={css`
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
      `}
    >
      <h1
        css={css`
          font-size: 3rem;
          line-height: 3.4rem;
          font-weight: 700;
          color: ${DESIGN_TOKEN_COLOR.gray700};
          animation: ${ANIIMATION.FADE_IN_UP} 0.6s ease-in-out;
        `}
      >
        {title}
      </h1>
      <p
        css={css`
          font-size: 2rem;
          line-height: 2.4rem;
          color: ${DESIGN_TOKEN_COLOR.gray400};
          margin-top: 0.5rem;
          animation: ${ANIIMATION.FADE_IN_UP} 0.6s ease-in-out 0.2s both;
        `}
      >
        {description}
      </p>
    </header>
  );
};
