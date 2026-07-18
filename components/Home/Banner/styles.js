import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BannerSection = styled.section`
  position: relative;
  height: 100vh;
  height: 100dvh;
  min-height: 100dvh;
  width: 100%;
  margin-bottom: 305px;
  background: ${({ theme }) => theme.background};

  & canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    touch-action: pan-y;
  }

  @media (hover: none) and (pointer: coarse),
    (prefers-reduced-motion: reduce) {
    & canvas {
      display: none;
    }
  }

  ${({ theme }) => theme.breakpoints.tablet`
    height: 100svh;
    min-height: 100svh;
    margin-bottom: 90px;

    & canvas {
      display: none;
    }
  `};
`;

export const VideoContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgb(0 48 73 / 0.32) 0%,
      transparent 28%,
      transparent 62%,
      rgb(0 48 73 / 0.18) 100%
    );
  }

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
  }
`;

export const BannerTitle = styled(motion.h1)`
  position: absolute;
  bottom: -82px;
  left: -20px;
  z-index: 2;
  max-width: calc(100% + 20px);
  color: ${({ theme }) => theme.accent};
  font-size: clamp(12rem, 21vw, 26.25rem);
  pointer-events: none;
  line-height: 0.6714285714;
  letter-spacing: -0.055em;
  paint-order: stroke fill;
  -webkit-text-stroke: clamp(1px, 0.12vw, 2px)
    ${({ theme }) => theme.colors.navy};
  text-shadow: 0 3px 0 rgb(0 48 73 / 0.24);

  & span {
    display: block;
  }

  ${({ theme }) => theme.breakpoints.small`
    left: -10px;
    bottom: -63px;
    font-size: clamp(8rem, 20vw, 17.5rem);
    line-height: .6821428571;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    left: -6px;
    bottom: -36px;
    max-width: calc(100% + 6px);
    font-size: clamp(4.7rem, 21vw, 10rem);
    line-height: .68125;
    overflow: hidden;
  `};
`;
