import { FadeLoader } from 'react-spinners';
import styled from 'styled-components';
import { theme } from '@/themes';

export const LoadingScreen = () => {
  return (
    <LoadingWrapper>
      <FadeLoader color={theme.colors.textDark} />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.main`
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: ${theme.colors.grayBackground};
  opacity: 0.8;
`;
