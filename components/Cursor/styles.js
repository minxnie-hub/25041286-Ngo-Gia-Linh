import styled, { css } from 'styled-components';

export const StyledCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 18px solid ${({ theme }) => theme.text};
  border-radius: 100%;
  transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
  transition: width 0.1s ease-out, height 0.1s ease-out,
    border-width 0.1s ease-out, border-color 0.1s ease-out;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor};

  ${({ color }) => {
    // overrides default theme color
    return (
      color &&
      css`
        border: 18px solid ${color};
      `
    );
  }};

  ${({ bordered, color, theme }) => {
    // create a bordered style when hovering elements
    return (
      bordered &&
      css`
        width: 64px;
        height: 64px;
        border-width: 5px;
        border-color: ${color || theme.text};
      `
    );
  }};

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;
