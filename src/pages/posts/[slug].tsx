import { GetStaticProps, NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Notion from '@/lib/notion';
import { PostData } from '@/types/notion';

type PostProps = {
  post: PostData;
};

type CodeBlockProps = {
  language: string;
  codeString: string;
  themeStyle: { [key: string]: React.CSSProperties } | undefined;
};

export const CodeBlock = ({
  language,
  codeString,
  themeStyle,
}: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={themeStyle} PreTag="div">
      {codeString}
    </SyntaxHighlighter>
  );
};

const PostPage: NextPage<PostProps> = (props) => {
  const { post } = props;

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

export const getStaticPaths = async () => {
  const notionInstance = new Notion();
  const posts = await notionInstance.getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as Params;
  const notionInstance = new Notion();
  const post = await notionInstance.getSinglePostBySlug(slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default PostPage;
