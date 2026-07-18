import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';

export const Slider = styled(({ renderAs, ...props }) => {
  const Component = motion[renderAs] || 'div';
  return <Component {...props} />;
})`
  position: fixed;
  right: 0;
  left: 0;
  will-change: transform;
  z-index: ${({ theme }) => theme.zIndex.slider};
`;

export const Container = styled.div`
  ${containerStyles};
  position: relative;
`;

export const BrandArea = styled.div`
  position: absolute;
  top: 34px;
  left: 32px;
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.breakpoints.tablet`
    top: 17px;
    gap: 4px;
  `};
`;

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  width: 250px;
  height: 44px;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: left center;
    filter: drop-shadow(0 2px 0 rgb(0 48 73 / 0.35));
  }

  ${({ theme }) => theme.breakpoints.tablet`
    width: 184px;
    height: 40px;
  `};
`;

export const ThemeButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 14px;
    border: 2px solid ${({ theme }) => theme.colors.navy};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.red};
    transform: translate(-50%, -50%);
    transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover::before,
  &:focus-visible::before {
    transform: translate(-50%, -50%) scale(1.25);
  }

  ${({ theme }) => theme.breakpoints.tablet`
    width: 40px;
    height: 40px;
    flex-basis: 40px;
  `};
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 54px;
  right: 32px;
  margin: -20px;

  ${({ theme }) => theme.breakpoints.tablet`
    top: 29px;
  `};
`;
