import React from 'react';
import profile from '../../../data/profile.json';
import useCursorStyle from '../../../hooks/useCursorStyle';
import AnimateOnScreen from '../../AnimateOnScreen';
import { ContactSection } from './styles';

const Contact = () => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <AnimateOnScreen>
      <ContactSection id="contact">
        <div className="column">
          <p className="contact-text">{profile.name}</p>
          <br />
          <p className="contact-text">MSSV {profile.studentId}</p>
        </div>
        <address className="column contact-text">
          {profile.faculty}
          <br /> {profile.schoolShort}
        </address>
        <div className="column">
          <a
            className="contact-text"
            href="https://github.com/minxnie-hub/25041286-Ngo-Gia-Linh"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={addCursorBorder}
            onMouseLeave={removeCursorBorder}
          >
            GitHub / Portfolio
          </a>
        </div>
      </ContactSection>
    </AnimateOnScreen>
  );
};

export default React.memo(Contact);
