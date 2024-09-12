import * as React from 'react';
import ReactMarkdown from 'react-markdown';

export const renderMarkdown = (markdown: string) => {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};
