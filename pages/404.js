/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Arrow from '../components/Icons/Arrow';

const Page = styled.main`
  min-height: 100vh;
  padding: 180px 32px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & p {
    color: ${({ theme }) => theme.colors.red};
  }
  & h1 {
    margin: 70px 0;
    font-size: clamp(8rem, 28vw, 25rem);
    line-height: 0.68;
  }
  & a {
    display: inline-flex;
    align-items: center;
    font-weight: 900;
    text-transform: uppercase;
  }
  & svg {
    width: 70px;
    height: 40px;
    margin-left: 18px;
  }
  & svg path {
    fill: ${({ theme }) => theme.text};
  }
`;

const NotFound = () => (
  <Page>
    <p>Trang không tồn tại · Ngô Gia Linh</p>
    <h1>404</h1>
    <Link href="/" passHref>
      <a>
        Quay về portfolio <Arrow />
      </a>
    </Link>
  </Page>
);

export default React.memo(NotFound);
