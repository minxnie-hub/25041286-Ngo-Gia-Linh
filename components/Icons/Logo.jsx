import React from 'react';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import assetUrl from '../../utils/assetUrl';

const Logo = props => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const theme = useStyledTheme();
  const logoPath =
    theme.mode === 'light'
      ? '/brand/ngo-gia-linh-logo-on-light.svg'
      : '/brand/ngo-gia-linh-logo.svg';

  return (
    <img
      src={assetUrl(logoPath)}
      alt="Ngô Gia Linh"
      onMouseEnter={addCursorBorder}
      onMouseLeave={removeCursorBorder}
      {...props}
    />
  );
};

export default Logo;
