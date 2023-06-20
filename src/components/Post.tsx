import ReactMarkdown from 'react-markdown';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';
import { CodeBlock } from '@/components/CodeBlock';
import { Tag } from '@/components/Tag';
import { theme } from '@/themes';
import { PostData } from '@/types/notion';

type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  const { title, date, tags } = post.metadata;

  return (
    <Container>
      <Wrapper>
        <H2>{title}</H2>
        <SubWrapper>
          <TagsWrapper>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </TagsWrapper>
          <DateSpan>{date}</DateSpan>
        </SubWrapper>
        <MarkdownWrapper
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CodeBlock
                  codeString={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  themeStyle={a11yDark}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </MarkdownWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 70px;
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  color: ${theme.colors.textDark};
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

const DateSpan = styled.span`
  font-size: 1rem;
  color: ${theme.colors.textLight};
`;

const MarkdownWrapper = styled(ReactMarkdown)`
  width: 100%;
  margin-top: 100px;
  font-family: 'Noto Sans KR', sans-serif;
  color: ${theme.colors.textDark};
  font-size: 1.125rem;
`;
