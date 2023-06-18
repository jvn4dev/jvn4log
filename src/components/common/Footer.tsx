// components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { theme } from '@/themes';

export const Footer = () => {
  return (
    <Container>
      <Label>© 2023 Chung Seongjun</Label>
      <P>All rights reserved.</P>
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
  margin-top: 70px;
`;

const Label = styled.label`
  width: 90%;
  max-width: 1140px;
  padding-left: 70px;
  color: ${theme.colors.textDark};
  font-size: 1.2rem;
`;

const P = styled.p`
  width: 90%;
  max-width: 1140px;
  padding-left: 70px;
  color: ${theme.colors.textLight};
  font-size: 1rem;
`;
