'use client';

import styled from 'styled-components';
import { theme } from '@/themes';

type TagProps = {
  tag: string;
};

export const Tag = (props: TagProps) => {
  const { tag } = props;

  return <Span>{tag}</Span>;
};

const Span = styled.span`
  padding: 3px 5px;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textLight};
`;
