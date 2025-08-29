import React, { useState } from 'react';
import styles from './NoteEditor.module.css';

const NoteEditor = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div className={styles.editor}>
      <input
        type="text"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={text.trim() ? styles.active : styles.disabled}
        onClick={handleSendClick}
      >
        ➤
      </button>
    </div>
  );
};

export default NoteEditor;
