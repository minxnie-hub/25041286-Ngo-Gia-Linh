import React from 'react';
import { motion } from 'framer-motion';
import profile from '../../../data/profile.json';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useStyledTheme from '../../../hooks/useStyledTheme';
import CanvasEraser from '../../CanvasEraser';
import { BannerSection, BannerTitle, VideoContainer } from './styles';
import assetUrl from '../../../utils/assetUrl';

const titleAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemTitleAnimation = {
  initial: { y: '100vh' },
  animate: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Banner = () => {
  const canvasRef = React.useRef(null);
  const theme = useStyledTheme();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <BannerSection>
      <VideoContainer>
        <img
          src={assetUrl(profile.images.hero)}
          alt={`Chân dung ${profile.name}`}
          decoding="async"
        />
      </VideoContainer>
      <CanvasEraser
        ref={canvasRef}
        size={132}
        background={theme.background}
        onMouseEnter={addCursorBorder}
        onMouseLeave={removeCursorBorder}
      />
      <BannerTitle
        variants={titleAnimation}
        initial={reduceMotion ? false : 'initial'}
        animate="animate"
      >
        <motion.span variants={itemTitleAnimation}>NGÔ GIA</motion.span>
        <motion.span variants={itemTitleAnimation}>LINH</motion.span>
      </BannerTitle>
    </BannerSection>
  );
};

export default React.memo(Banner);
