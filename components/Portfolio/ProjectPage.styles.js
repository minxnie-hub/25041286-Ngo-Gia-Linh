import styled from 'styled-components';
import containerStyles from '../../styles/shared/container';
import { secondaryFontStyle } from '../../styles/shared/text';

export const ProjectHero = styled.section`
  padding-top: 190px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  ${({ theme }) => theme.breakpoints.tablet`
    padding-top: 116px;
  `};
`;

export const HeroInner = styled.div`
  ${containerStyles};
`;

export const BackLink = styled.div`
  margin-left: 8.333%;
  margin-bottom: 70px;

  & a {
    ${secondaryFontStyle};
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.accent};
  }

  & svg {
    width: 42px;
    height: 24px;
    margin-right: 14px;
    transform: rotate(180deg);
  }

  & svg path {
    fill: ${({ theme }) => theme.accent};
  }

  ${({ theme }) => theme.breakpoints.small`
    margin-left: 0;
    margin-bottom: 44px;
  `};
`;

export const ProjectMeta = styled.div`
  ${secondaryFontStyle};
  display: flex;
  justify-content: space-between;
  width: 83.333%;
  margin-left: 8.333%;
  color: ${({ theme }) => theme.accent};

  ${({ theme }) => theme.breakpoints.small`
    width: 100%;
    margin-left: 0;
    font-size: 0.75rem;
  `};
`;

export const HeroTitle = styled.h1`
  width: 91.666%;
  margin: 88px 0 74px -6px;
  font-size: clamp(5rem, 11vw, 10.5rem);
  line-height: 0.72;
  letter-spacing: -0.045em;
  text-transform: uppercase;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-top: 54px;
    margin-bottom: 46px;
    font-size: clamp(3.25rem, 14vw, 6rem);
  `};
`;

export const HeroDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 83.333%;
  margin-left: 8.333%;

  & p,
  & blockquote {
    width: 41.666%;
    font-size: 1.25rem;
    line-height: 1.25;
  }

  & blockquote {
    color: ${({ theme }) => theme.accent};
  }

  ${({ theme }) => theme.breakpoints.small`
    display: block;
    width: 100%;
    margin-left: 0;

    & p,
    & blockquote { width: 100%; }
    & blockquote { margin-top: 28px; }
  `};
`;

export const HeroArtwork = styled.figure`
  width: 100%;
  height: min(72vh, 760px);
  margin: 125px 0 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.type-only {
    display: grid;
    place-items: center;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    height: 44vh;
    margin-top: 70px;
  `};
`;

export const TypeArtwork = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: end;
  gap: 0 26px;
  color: ${({ theme }) => theme.colors.white};

  & b {
    grid-row: span 2;
    font-size: clamp(8rem, 22vw, 20rem);
    line-height: 0.7;
  }
  & span {
    font-size: clamp(2.5rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 0.8;
  }
  & small {
    max-width: 280px;
    color: ${({ theme }) => theme.accent};
  }
`;

export const ArticleSection = styled.section`
  ${containerStyles};
  padding-top: 190px;
  padding-bottom: 220px;

  ${({ theme }) => theme.breakpoints.tablet`
    padding-top: 95px;
    padding-bottom: 120px;
  `};
`;

export const Article = styled.div`
  display: flex;
  align-items: flex-start;

  ${({ theme }) => theme.breakpoints.small`
    display: block;
  `};
`;

export const ProjectAside = styled.aside`
  width: 25%;
  padding-right: 32px;
  color: ${({ theme }) => theme.accent};

  & > div + div {
    margin-top: 64px;
  }
  & span {
    ${secondaryFontStyle};
    display: block;
    margin-bottom: 22px;
  }

  ${({ theme }) => theme.breakpoints.small`
    width: 100%;
    padding-right: 0;
    margin-bottom: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    & > div + div { margin-top: 0; }
  `};
`;

export const ToolList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.45;
`;

export const DownloadLink = styled.a`
  ${secondaryFontStyle};
  display: inline-flex;
  align-items: center;

  & svg {
    width: 34px;
    height: 20px;
    margin-left: 10px;
  }
  & svg path {
    fill: ${({ theme }) => theme.accent};
  }
`;

export const ArticleBody = styled.article`
  width: 58.333%;
  margin-left: 8.333%;

  & h2 {
    margin: 120px 0 38px;
    font-size: 2.625rem;
    line-height: 1;
    font-weight: 500;
  }

  & h3 {
    margin: 76px 0 24px;
    font-size: 1.75rem;
    line-height: 1.05;
  }

  ${({ theme }) => theme.breakpoints.small`
    width: 100%;
    margin-left: 0;

    & h2 { margin-top: 82px; font-size: 2rem; }
    & h3 { margin-top: 56px; font-size: 1.5rem; }
  `};
`;

export const ArticleIntro = styled.div`
  padding-bottom: 74px;
  border-bottom: 1px solid currentColor;

  & span {
    ${secondaryFontStyle};
    color: ${({ theme }) => theme.accent};
  }
  & p {
    margin-top: 28px;
    font-size: 2rem;
    line-height: 1.05;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    & p { font-size: 1.5rem; }
  `};
`;

export const BodyCopy = styled.p`
  margin: 0 0 22px;
  line-height: 1.42;
  white-space: pre-line;
`;

export const ListItem = styled.li`
  margin: 0 0 14px 22px;
  padding-left: 8px;
  line-height: 1.42;
`;

export const EvidenceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin: 46px 0 72px;

  &.single {
    grid-template-columns: 1fr;
  }
  & figure {
    margin: 0;
    background: ${({ theme }) => theme.colors.black};
  }
  & img {
    width: 100%;
    height: auto;
  }

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: 1fr;
    gap: 16px;
    margin: 34px 0 52px;
  `};
`;

export const TableFrame = styled.div`
  width: 100%;
  margin: 48px 0 72px;
  overflow-x: auto;
  border-top: 4px solid ${({ theme }) => theme.accent};

  & table {
    width: 100%;
    min-width: 620px;
    border-collapse: collapse;
  }
  & th,
  & td {
    padding: 16px;
    border-bottom: 1px solid currentColor;
    text-align: left;
    vertical-align: top;
  }
  & th {
    color: ${({ theme }) => theme.accent};
    font-size: 0.875rem;
    text-transform: uppercase;
  }
`;

export const NextProject = styled.section`
  ${containerStyles};
  padding-top: 115px;
  padding-bottom: 130px;
  color: ${({ theme }) => theme.onAccent};
  background: ${({ theme }) => theme.colors.red};

  & > p {
    ${secondaryFontStyle};
  }
`;

export const NextLink = styled.a`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 48px;
  font-size: clamp(3.4rem, 8vw, 8.5rem);
  font-weight: 900;
  line-height: 0.72;
  letter-spacing: -0.04em;
  text-transform: uppercase;

  & span {
    max-width: 82%;
  }
  & svg {
    width: 101px;
    height: 57px;
    flex: 0 0 auto;
  }
  & svg path {
    fill: ${({ theme }) => theme.onAccent};
  }

  ${({ theme }) => theme.breakpoints.tablet`
    align-items: center;
    & svg { width: 60px; height: 34px; }
  `};
`;
