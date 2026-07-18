import React from 'react';
import Link from 'next/link';
import { useThemeContext } from '../../context/theme';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import Logo from '../Icons/Logo';
import MenuButton from '../MenuButton';
import {
  Slider,
  Container,
  BrandArea,
  StyledLink,
  ThemeButton,
  MenuWrapper,
} from './styles';

const getStyles = (direction = '') => {
  if (direction === 'down') return { top: 0 };
  if (direction === 'up') return { bottom: 0 };

  return {};
};

const variants = {
  hidden: { y: -131 },
  show: { y: 0 },
};

const AppBar = props => {
  const {
    direction = 'down',
    offset = 105,
    logoProps = {},
    style: styleProp = {},
    ...rootProps
  } = props;
  const [hidden, setHidden] = React.useState(false);
  const frameRef = React.useRef(null);
  const [{ theme: activeTheme }, dispatch] = useThemeContext();
  const theme = useStyledTheme();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();

  React.useEffect(() => {
    const updateVisibility = () => {
      frameRef.current = null;
      let shouldHide = false;
      let intersection = offset;
      let currentYPosition = 0;

      if (direction === 'down') {
        currentYPosition = window.scrollY;
      } else if (direction === 'up') {
        currentYPosition =
          document.documentElement.scrollTop + window.innerHeight;
        intersection = document.documentElement.scrollHeight - offset;
      }

      shouldHide = currentYPosition > intersection;
      setHidden(previous => (previous === shouldHide ? previous : shouldHide));
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [direction, offset]);

  const handleToggleTheme = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, [dispatch]);

  const styles = getStyles(direction);

  return (
    <Slider
      variants={variants}
      initial="hidden"
      animate={hidden ? 'hidden' : 'show'}
      transition={{
        duration: 1,
        ease: [0.666, 0, 0.237, 1],
      }}
      style={{
        ...styles,
        ...styleProp,
      }}
      {...rootProps}
    >
      <Container>
        <BrandArea>
          <Link href="/" passHref>
            <StyledLink title="Ngô Gia Linh">
              <Logo {...logoProps} />
            </StyledLink>
          </Link>
          <ThemeButton
            type="button"
            aria-label="Đổi giao diện sáng tối"
            aria-pressed={activeTheme === 'light'}
            onClick={handleToggleTheme}
            onMouseEnter={() => {
              addCursorBorder();
              addCursorColor(theme.text);
            }}
            onMouseLeave={() => {
              removeCursorBorder();
              resetCursorColor();
            }}
          />
        </BrandArea>
        <MenuWrapper>
          <MenuButton title="Bài tập" />
        </MenuWrapper>
      </Container>
    </Slider>
  );
};

export default React.memo(AppBar);
