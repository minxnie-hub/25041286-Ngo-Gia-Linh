/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuContext } from '../../context/menu';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import useMediaQuery from '../../hooks/useMediaQuery';
import routes from '../../utils/constants/routes';
import assetUrl from '../../utils/assetUrl';
import Arrow from '../Icons/Arrow';
import {
  listVariants,
  listItemsVariants,
  linkVariants,
  videoRevealVariants,
  videoVariants,
  transition,
} from './variants';
import {
  Backdrop,
  Container,
  CloseButton,
  Header,
  UtilityNavigation,
  UtilityLink,
  Navigation,
  List,
  Link,
  ArrowContainer,
  Footer,
  FooterText,
  VideoContainer,
  VideoReveal,
  Video,
  Address,
} from './styles';

const Menu = () => {
  const containerRef = React.useRef(null);
  const videoContainerRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const previouslyFocusedRef = React.useRef(null);
  const [revealVideo, setRevealVideo] = React.useState(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const theme = useStyledTheme();
  const [{ isMenuOpen }, dispatch] = useMenuContext();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();
  const isMobile = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.small}px)`,
  );

  const handleAnimationComplete = React.useCallback(() => {
    addCursorColor(theme.onAccent);
  }, [addCursorColor, theme.onAccent]);

  const handleExitComplete = React.useCallback(() => {
    resetCursorColor();
  }, [resetCursorColor]);

  const handleHoverStart = React.useCallback(
    event => {
      addCursorBorder();
      setRevealVideo(event.currentTarget.name);
    },
    [addCursorBorder],
  );

  const handleHoverEnd = React.useCallback(() => {
    removeCursorBorder();
    setRevealVideo(null);
  }, [removeCursorBorder]);

  const handleClose = React.useCallback(() => {
    removeCursorBorder();
    setRevealVideo(null);
    dispatch({ type: 'CLOSE_MENU' });
  }, [dispatch, removeCursorBorder]);

  React.useEffect(() => {
    if (!isMenuOpen) return undefined;

    previouslyFocusedRef.current = document.activeElement;

    const getFocusableElements = () =>
      Array.from(
        containerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) || [],
      );

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const focusFrame = window.requestAnimationFrame(() => {
      if (closeButtonRef.current) closeButtonRef.current.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.cancelAnimationFrame(focusFrame);

      const previousElement = previouslyFocusedRef.current;
      if (previousElement && document.contains(previousElement)) {
        previousElement.focus();
      }
    };
  }, [handleClose, isMenuOpen]);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && containerRef.current && videoContainerRef.current) {
        const offset = 256;
        const { width } = containerRef.current.getBoundingClientRect();
        const left = (window.innerWidth - width) / 2 + offset;

        videoContainerRef.current.style.left = `${left}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isMenuOpen && (
        <Backdrop
          role="dialog"
          aria-modal="true"
          aria-label="Điều hướng portfolio"
          onAnimationComplete={handleAnimationComplete}
        >
          <Container ref={containerRef}>
            <Header>
              <UtilityNavigation aria-label="Điều hướng nhanh">
                <NextLink href="/#about" passHref>
                  <UtilityLink onClick={handleClose}>Giới thiệu</UtilityLink>
                </NextLink>
                <NextLink href="/#projects" passHref>
                  <UtilityLink onClick={handleClose}>6 bài tập</UtilityLink>
                </NextLink>
                <NextLink href="/#contact" passHref>
                  <UtilityLink onClick={handleClose}>Liên hệ</UtilityLink>
                </NextLink>
              </UtilityNavigation>
              <CloseButton
                ref={closeButtonRef}
                title="Đóng"
                onClick={handleClose}
              />
            </Header>
            <Navigation>
              <List
                variants={listVariants}
                initial="hidden"
                animate="show"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {routes.map(route => (
                  <motion.li
                    key={route.id}
                    variants={listItemsVariants}
                    transition={{
                      duration: 0.9,
                      ease: transition.ease,
                    }}
                  >
                    <NextLink href={route.path} passHref>
                      <Link
                        key={`${route.id}_${isMobile}`}
                        name={route.id}
                        onMouseEnter={handleHoverStart}
                        onMouseLeave={handleHoverEnd}
                        onClick={handleClose}
                        custom={{ isMobile, color: theme.onAccent }}
                        initial="initial"
                        whileHover="hover"
                        variants={linkVariants}
                        transition={transition}
                      >
                        <ArrowContainer>
                          <Arrow fillColor={theme.onAccent} />
                        </ArrowContainer>
                        {route.title}
                      </Link>
                    </NextLink>
                  </motion.li>
                ))}
              </List>
            </Navigation>
            <Footer>
              <FooterText
                className="link"
                as="a"
                href="https://github.com/minxnie-hub/25041286-Ngo-Gia-Linh"
                onMouseEnter={addCursorBorder}
                onMouseLeave={removeCursorBorder}
              >
                GitHub / Portfolio
              </FooterText>
              <FooterText className="link" as="span">
                MSSV 25041286
              </FooterText>
              <FooterText className="copyright">© Ngô Gia Linh 2026</FooterText>
              {isMobile && (
                <Address>
                  <FooterText>
                    Khoa Ngôn ngữ và Văn hoá Nga
                    <br /> ULIS - VNU
                  </FooterText>
                </Address>
              )}
            </Footer>
          </Container>
          {!isMobile && (
            <VideoContainer ref={videoContainerRef}>
              <VideoReveal
                variants={videoRevealVariants}
                transition={transition}
                initial="show"
                animate={isHovering ? 'hidden' : 'show'}
              />
              {routes.map(route => (
                <Video
                  key={route.id}
                  src={assetUrl(route.image)}
                  alt=""
                  decoding="async"
                  variants={videoVariants}
                  initial="hidden"
                  animate={route.id === revealVideo ? 'show' : 'hidden'}
                  transition={transition}
                />
              ))}
            </VideoContainer>
          )}
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Menu);
