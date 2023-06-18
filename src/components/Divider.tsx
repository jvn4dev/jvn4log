import styled from 'styled-components';
import { theme } from '@/themes';

export const Divider = () => {
  return <Div />;
};

const Div = styled.div`
  width: 100px;
  height: 2px;
  margin: 40px 0;
  background-color: ${theme.colors.border};
`;
