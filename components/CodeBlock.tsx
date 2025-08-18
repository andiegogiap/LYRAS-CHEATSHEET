
import React, { useState } from 'react';

const LanguageBadge = ({ language }) => {
    if (!language) return null;

    let langName = '';
    let bgColor = 'bg-gray-600';
    let textColor = 'text-white';

    switch (language) {
        case 'python':
            langName = 'Python';
            bgColor = 'bg-blue-800';
            break;
        case 'javascript':
            langName = 'JavaScript';
            bgColor = 'bg-yellow-600';
            break;
        case 'json':
            langName = 'JSON';
            bgColor = 'bg-green-700';
            break;
        case 'bash':
            langName = 'Shell';
            bgColor = 'bg-gray-700';
            break;
        case 'html':
            langName = 'HTML';
            bgColor = 'bg-orange-600';
            break;
        default:
            langName = language;
    }

    return (
        <span className={`absolute top-3 left-4 text-xs font-semibold px-2 py-1 rounded-md ${bgColor} ${textColor}`}>
            {langName}
        </span>
    );
};


export const CodeBlock = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="bg-lyra-dark-secondary rounded-lg my-4 relative shadow-lg">
      <LanguageBadge language={language} />
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-lyra-text-secondary hover:text-lyra-light transition-all duration-200"
        aria-label="Copy code"
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre className="p-4 pt-10 text-sm overflow-x-auto">
        <code className="font-mono text-lyra-text">
          {code}
        </code>
      </pre>
    </div>
  );
};