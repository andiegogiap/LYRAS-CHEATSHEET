
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { ContentDisplay } from './components/ContentDisplay.tsx';
import { CONTENT_DATA } from './constants.tsx';

const App = () => {
  const [activeSectionId, setActiveSectionId] = useState(CONTENT_DATA[0].id);

  const activeSection = CONTENT_DATA.find(section => section.id === activeSectionId) || CONTENT_DATA[0];

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar 
        sections={CONTENT_DATA} 
        activeSectionId={activeSectionId} 
        setActiveSectionId={setActiveSectionId} 
      />
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <ContentDisplay section={activeSection} />
      </main>
    </div>
  );
};

export default App;