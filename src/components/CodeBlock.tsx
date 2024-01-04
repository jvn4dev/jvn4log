'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

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
