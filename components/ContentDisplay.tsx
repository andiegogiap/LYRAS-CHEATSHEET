
import React from 'react';
import { ContentType } from '../constants.tsx';
import { CodeBlock } from './CodeBlock.tsx';

const renderContentItem = (item, index) => {
  switch (item.type) {
    case ContentType.HEADING:
      return (
        <h2 key={index} className="text-3xl font-bold text-lyra-light mb-2 mt-8 border-b border-gray-700 pb-2">
          {item.content}
        </h2>
      );
    case ContentType.SUBHEADING:
      return (
        <h3 key={index} className="text-2xl font-semibold text-lyra-light mb-4 mt-6">
          {item.content}
        </h3>
      );
    case ContentType.PARAGRAPH:
      return (
        <p key={index} className="text-lyra-text mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }}>
        </p>
      );
    case ContentType.CODE:
      return (
        <CodeBlock
          key={index}
          code={item.content}
          language={item.language}
        />
      );
    case ContentType.LIST:
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-lyra-text pl-4">
          {item.content.map((li, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: li }}></li>
          ))}
        </ul>
      );
    case ContentType.NOTE:
      return (
        <div key={index} className="bg-lyra-dark-secondary border-l-4 border-lyra-accent p-4 my-4 rounded-r-lg">
          <p className="text-lyra-text-secondary italic" dangerouslySetInnerHTML={{ __html: item.content }}></p>
        </div>
      );
    case ContentType.SEPARATOR:
      return <hr key={index} className="border-gray-700 my-8" />;
    default:
      return null;
  }
};

export const ContentDisplay = ({ section }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center mb-2">
            <span className="text-lyra-accent mr-3">{section.icon({ className: "w-8 h-8" })}</span>
            <h1 className="text-4xl font-extrabold text-lyra-light">{section.title}</h1>
        </div>
        <p className="text-lg text-lyra-text-secondary">{section.id === 'api-cheatsheet' ? "Common patterns for API interaction with AI integration." : "A blueprint for building modern, scalable Single Page Applications."}</p>
      </header>
      {section.content.map(renderContentItem)}
    </div>
  );
};