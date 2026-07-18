/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import useStyledTheme from '../../hooks/useStyledTheme';
import useCursorStyle from '../../hooks/useCursorStyle';
import { Container } from './styles';

const SiteOfTheDay = () => {
  const theme = useStyledTheme();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <Container onMouseEnter={addCursorBorder} onMouseLeave={removeCursorBorder}>
      <Link
        href="https://github.com/minxnie-hub/25041286-Ngo-Gia-Linh"
        passHref
      >
        <a target="_blank" rel="noreferrer">
          <svg
            width="53.08"
            height="171.358"
            viewBox="0 0 53.08 171.358"
            aria-label="MSSV 25041286"
          >
            <rect fill={theme.text} width="53.08" height="171.358" />
            <text
              fill={theme.background}
              x="26.54"
              y="155"
              textAnchor="middle"
              transform="rotate(-90 26.54 85.679)"
              fontFamily="calibre, sans-serif"
              fontSize="11.5"
              fontWeight="900"
              letterSpacing="1.2"
            >
              25041286 / NGÔ GIA LINH
            </text>
          </svg>
        </a>
      </Link>
    </Container>
  );
};

export default SiteOfTheDay;
