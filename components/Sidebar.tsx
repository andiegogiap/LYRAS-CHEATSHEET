import React from 'react';

export const Sidebar = ({ sections, activeSectionId, setActiveSectionId }) => {
  return (
    <aside className="w-64 bg-lyra-dark-secondary flex-shrink-0 p-6 border-r border-gray-700/50 hidden md:block">
      <div className="flex items-center mb-10">
        <div className="bg-lyra-accent rounded-lg p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.373 3.373 0 0014 18.469V19a2 2 0 11-4 0v-.531a3.373 3.373 0 00-.823-2.176l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-lyra-light">LYRA</h1>
      </div>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSectionId(section.id);
                }}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  activeSectionId === section.id
                    ? 'bg-lyra-accent text-white shadow-lg'
                    : 'text-lyra-text-secondary hover:bg-gray-700/50 hover:text-lyra-light'
                }`}
              >
                {section.icon({ className: 'h-5 w-5 mr-3' })}
                <span>{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-6 left-6 text-lyra-text-secondary text-xs">
        <p>AI Cheatsheet & Blueprint</p>
        <p>&copy; 2024 LYRA Industries</p>
      </div>
    </aside>
  );
};
