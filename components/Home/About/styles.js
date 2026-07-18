import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../../styles/shared/container';
import { secondaryFontStyle } from '../../../styles/shared/text';

export const ContentSection = styled(motion.section)`
  ${containerStyles};
  margin-bottom: 200px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 100px;
  `};
`;

export const SectionLabel = styled.p`
  ${secondaryFontStyle};
  margin-left: 8.333%;
  color: ${({ theme }) => theme.accent};

  ${({ theme }) => theme.breakpoints.small`
    margin-left: 0;
  `};
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 32px;
  margin-top: 52px;

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: 1fr;
    gap: 46px;
  `};
`;

export const PortraitFigure = styled.figure`
  grid-column: 2 / span 4;
  grid-row: 1 / span 2;
  margin-top: 76px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};

  & img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: center 28%;
  }

  ${({ theme }) => theme.breakpoints.small`
    grid-column: auto;
    grid-row: auto;
    margin-top: 0;
    width: 72%;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    width: 86%;
  `};
`;

export const TextWrapper = styled.div`
  grid-column: 7 / span 5;

  & h2 {
    margin: 0 0 44px;
    font-size: 2.625rem;
    line-height: 1;
    font-weight: 500;
  }

  & p {
    max-width: 520px;
    margin: 0 0 20px;
    font-size: 1.125rem;
    line-height: 1.35;
  }

  ${({ theme }) => theme.breakpoints.small`
    grid-column: auto;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    & h2 {
      margin-bottom: 30px;
      font-size: 1.75rem;
      line-height: 1.05;
    }
  `};
`;

export const FacultyFigure = styled.figure`
  grid-column: 6 / span 7;
  margin-top: 40px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};

  & img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  ${({ theme }) => theme.breakpoints.small`
    grid-column: auto;
    margin-top: 0;
    width: calc(100% + 64px);
    margin-left: -32px;
  `};
`;

export const DetailsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 32px;
  align-items: start;
  margin-top: 118px;

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: 1fr;
    gap: 74px;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    margin-top: 76px;
  `};
`;

export const CareerStatement = styled.div`
  grid-column: 2 / span 5;

  & span {
    ${secondaryFontStyle};
    display: block;
    margin-bottom: 28px;
    color: ${({ theme }) => theme.accent};
  }

  & strong {
    display: block;
    max-width: 520px;
    color: ${({ theme }) => theme.accent};
    font-size: clamp(4rem, 7vw, 7.5rem);
    font-weight: 900;
    line-height: 0.75;
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }

  ${({ theme }) => theme.breakpoints.small`
    grid-column: auto;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    & strong {
      font-size: clamp(3.5rem, 16vw, 6rem);
    }
  `};
`;

export const ServicesWrapper = styled.div`
  grid-column: 8 / span 4;
  padding-top: 8px;

  & h3 {
    ${secondaryFontStyle};
    margin-bottom: 2px;
  }

  ${({ theme }) => theme.breakpoints.small`
    grid-column: auto;
    width: 100%;
  `};
`;

export const AccordionToggle = styled.button`
  ${secondaryFontStyle};
  position: relative;
  display: block;
  width: 100%;
  padding: 27px 0 0 35px;
  color: ${({ theme }) => theme.accent};
  font-size: 0.875rem;
  line-height: 15px;
  text-align: left;

  &:hover:not([aria-expanded='true']) {
    color: ${({ theme }) => theme.text};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    display: block;
    width: 18px;
    height: 4px;
    margin-top: 11.5px;
    background: ${({ theme }) => theme.accent};
    transition: transform 160ms ease, width 160ms ease, left 160ms ease;
  }

  &::before {
    left: 0;
    transform: rotate(45deg);
  }

  &::after {
    left: 10px;
    transform: rotate(-45deg);
  }

  &[aria-expanded='true']::before,
  &[aria-expanded='true']::after,
  &:hover::before,
  &:hover::after {
    width: 11px;
    transform: rotate(0deg);
  }

  &[aria-expanded='true']::before,
  &:hover::before {
    left: 2px;
  }

  &[aria-expanded='true']::after,
  &:hover::after {
    left: 13px;
  }
`;

export const AccordionContent = styled(motion.div)`
  padding-left: 35px;
  overflow: hidden;
  color: ${({ theme }) => theme.accent};
  font-size: 0.875rem;
  line-height: 1.25;
  letter-spacing: 0.3px;

  & p {
    margin: 7px 0 0;
  }

  & p:last-child {
    padding-bottom: 4px;
  }
`;
