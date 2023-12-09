// components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { theme } from '@/themes';

export const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Label>© 2023 Chung Seongjun</Label>
        <P>All rights reserved.</P>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.grayBackground};
  padding: 70px 0;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 1140px;
  padding-left: 70px;

  @media ${theme.device.tablet} {
    padding-left: 0;
  }
`;

const Label = styled.label`
  color: ${theme.colors.textDark};
  font-size: 1.2rem;
`;

const P = styled.p`
  color: ${theme.colors.textLight};
  font-size: 1rem;
`;
