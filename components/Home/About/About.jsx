import React from 'react';
import profile from '../../../data/profile.json';
import useMediaQuery from '../../../hooks/useMediaQuery';
import items from '../../../utils/constants/services-items';
import assetUrl from '../../../utils/assetUrl';
import useCursorStyle from '../../../hooks/useCursorStyle';
import AnimateOnScreen from '../../AnimateOnScreen';
import {
  ContentSection,
  SectionLabel,
  AboutGrid,
  PortraitFigure,
  TextWrapper,
  FacultyFigure,
  DetailsRow,
  CareerStatement,
  ServicesWrapper,
  AccordionToggle,
  AccordionContent,
} from './styles';

const About = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const handleMouseEnter = React.useCallback(
    curr => {
      if (curr === selectedItem) return;

      addCursorBorder();
    },
    [selectedItem, addCursorBorder],
  );

  const handleMouseLeave = React.useCallback(
    curr => {
      if (curr === selectedItem) return;

      removeCursorBorder();
    },
    [selectedItem, removeCursorBorder],
  );

  return (
    <AnimateOnScreen>
      <ContentSection id="about">
        <SectionLabel>Giới thiệu</SectionLabel>
        <AboutGrid>
          <PortraitFigure>
            <img
              src={assetUrl(profile.images.portrait)}
              alt={`Chân dung ${profile.name} trong trang phục mùa đông`}
              loading="lazy"
              decoding="async"
            />
          </PortraitFigure>
          <TextWrapper>
            <h2>
              {profile.name} là sinh viên {profile.cohort}, {profile.faculty},{' '}
              {profile.school}.
            </h2>
            <p>
              Mình thích nghe nhạc và xem phim. Mục tiêu hiện tại là cải thiện
              và phát triển kỹ năng giao tiếp, đồng thời ứng dụng công nghệ trong
              học tập.
            </p>
            <p>
              Sáu bài tập trong portfolio ghi lại quá trình thực hành công nghệ
              số, nghiên cứu ngôn ngữ, cộng tác trực tuyến và sử dụng AI có trách
              nhiệm.
            </p>
          </TextWrapper>
          <FacultyFigure>
            <img
              src={assetUrl(profile.images.facultyEvent)}
              alt="Sự kiện của Khoa Ngôn ngữ và Văn hoá Nga"
              loading="lazy"
              decoding="async"
            />
          </FacultyFigure>
        </AboutGrid>
        <DetailsRow>
          <CareerStatement>
            <span>Định hướng nghề nghiệp</span>
            <strong>{profile.career}</strong>
          </CareerStatement>
          <ServicesWrapper>
            <h3>Hồ sơ</h3>
            {items.map(([item, services], itemIndex) => {
              const isOpen = itemIndex === selectedItem;
              const contentId = `profile-${itemIndex}`;

              return (
                <React.Fragment key={item}>
                  <AccordionToggle
                    aria-controls={contentId}
                    aria-expanded={isOpen}
                    onClick={() => setSelectedItem(itemIndex)}
                    onMouseEnter={() => handleMouseEnter(itemIndex)}
                    onMouseLeave={() => handleMouseLeave(itemIndex)}
                  >
                    {item}
                  </AccordionToggle>
                  <AccordionContent
                    id={contentId}
                    aria-hidden={!isOpen}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    initial={false}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {services.map((service, serviceIndex) => (
                      <p key={`${itemIndex}_${serviceIndex}`}>{service}</p>
                    ))}
                  </AccordionContent>
                </React.Fragment>
              );
            })}
          </ServicesWrapper>
        </DetailsRow>
      </ContentSection>
    </AnimateOnScreen>
  );
};

export default React.memo(About);
