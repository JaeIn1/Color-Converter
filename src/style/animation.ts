import { keyframes } from "@emotion/react";

export const ANIIMATION = {
  FADE_IN: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,

  FADE_IN_UP: keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
};
