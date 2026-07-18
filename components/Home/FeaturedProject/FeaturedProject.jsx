import React from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useMenuContext } from '../../../context/menu';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useStyledTheme from '../../../hooks/useStyledTheme';
import assetUrl from '../../../utils/assetUrl';
import projects from '../../../data/projects.json';
import AnimateOnScreen from '../../AnimateOnScreen';
import Arrow from '../../Icons/Arrow';
import {
  ContentSection,
  ProjectAnchor,
  ProjectInfo,
  ProjectTitle,
  VideoPreview,
  MenuContainer,
  MenuButton,
} from './styles';

const transition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1],
};

const ProjectItem = ({ project }) => {
  const controlsInfo = useAnimation();
  const controlsArrow = useAnimation();
  const [{ isMenuOpen }] = useMenuContext();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const isTabletView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.tablet}px)`,
  );

  const handleAnchorHoverStart = React.useCallback(() => {
    addCursorBorder();
    controlsInfo.start({ opacity: 1 });
    controlsArrow.start({ x: 0 });
  }, [addCursorBorder, controlsInfo, controlsArrow]);

  const handleAnchorHoverEnd = React.useCallback(() => {
    if (!isMenuOpen) removeCursorBorder();
    controlsInfo.start({ opacity: 0 });
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [
    removeCursorBorder,
    controlsInfo,
    controlsArrow,
    isTabletView,
    isMenuOpen,
  ]);

  React.useEffect(() => {
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [controlsArrow, isTabletView]);

  const [firstWord, ...remainingWords] = project.shortTitle.split(' ');

  return (
    <AnimateOnScreen>
      <motion.div>
        <Link href={`/projects/${project.slug}`} passHref>
          <ProjectAnchor
            onHoverStart={handleAnchorHoverStart}
            onHoverEnd={handleAnchorHoverEnd}
          >
            <ProjectInfo>
              <h3>Bài tập {project.number}</h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={controlsInfo}
                transition={transition}
                className="project-info"
              >
                <h4>{project.eyebrow}</h4>
                <h4>{project.year}</h4>
              </motion.div>
              <ProjectTitle>
                {firstWord}
                {remainingWords.length > 0 && (
                  <>
                    <br /> {remainingWords.join(' ')}
                  </>
                )}
                <span className="arrow">
                  <Arrow animate={controlsArrow} transition={transition} />
                </span>
              </ProjectTitle>
            </ProjectInfo>
            <VideoPreview>
              {project.cover ? (
                <img
                  src={assetUrl(project.cover)}
                  alt={`Ảnh minh chứng cho ${project.title}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <img
                  src={assetUrl('/profile/from-hanoi-to-moscow.webp')}
                  alt="Minh hoạ hành trình ngôn ngữ từ Hà Nội đến Moskva"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </VideoPreview>
          </ProjectAnchor>
        </Link>
      </motion.div>
    </AnimateOnScreen>
  );
};

const FeaturedProject = () => {
  const theme = useStyledTheme();
  const {
    addCursorColor,
    resetCursorColor,
    addCursorBorder,
    removeCursorBorder,
  } = useCursorStyle();

  const handleMouseEnter = React.useCallback(() => {
    addCursorBorder();
    addCursorColor(theme.onAccent);
  }, [addCursorColor, addCursorBorder, theme.onAccent]);

  const handleMouseLeave = React.useCallback(() => {
    removeCursorBorder();
    resetCursorColor();
  }, [removeCursorBorder, resetCursorColor]);

  return (
    <ContentSection id="projects">
      {projects.map(project => (
        <ProjectItem project={project} key={project.slug} />
      ))}
      <AnimateOnScreen>
        <MenuContainer>
          <MenuButton
            sticky={false}
            title="6 bài tập"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </MenuContainer>
      </AnimateOnScreen>
    </ContentSection>
  );
};

export default FeaturedProject;
