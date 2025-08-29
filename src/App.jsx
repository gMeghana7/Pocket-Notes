import React, { useState, useEffect } from 'react';
import GroupList from './components/GroupList/GroupList';
import NotesList from './components/NotesList/NotesList';
import './App.css';

function App() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotes, setShowNotes] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
    if (isMobile) {
      setShowNotes(true);
    }
  };


  const handleBackToGroups = () => {
    setShowNotes(false);
    setSelectedGroupId(null);
  };

  return (
    <div className="app">
      {}
      {!isMobile && (
        <>
          <GroupList
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={handleGroupSelect}
          />
          <NotesList 
            groupId={selectedGroupId} 
            onBack={handleBackToGroups}
            isMobile={isMobile}
          />
        </>
      )}

      {}
      {isMobile && (
        <>
          {!showNotes ? (
            <GroupList
              selectedGroupId={selectedGroupId}
              setSelectedGroupId={handleGroupSelect}
              isMobile={isMobile}
            />
          ) : (
            <NotesList 
              groupId={selectedGroupId} 
              onBack={handleBackToGroups}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;