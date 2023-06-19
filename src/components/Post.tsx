'use client';

import ReactMarkdown from 'react-markdown';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeBlock } from '@/components/CodeBlock';
import { PostData } from '@/types/notion';

type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  return (
    <section>
      <h2>{post.metadata.title}</h2>
      <span>{post.metadata.date}</span>
      <p>{post.metadata.tags.join(', ')}</p>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CodeBlock
                codeString={String(children).replace(/\n$/, '')}
                language={match[1]}
                themeStyle={tomorrow}
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
      </ReactMarkdown>
    </section>
  );
};
