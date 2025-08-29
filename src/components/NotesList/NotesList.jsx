import React, { useEffect, useState } from "react";
import styles from "./NotesList.module.css";
import NoteEditor from "./NoteEditor";
import {formatDateTime } from "../../utils/formatDate";

const NotesList = ({ groupId, onBack,
            isMobile }) => {
  const [notes, setNotes] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    if (!groupId) return;
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setNotes(storedNotes[groupId] || []);
    const storeGroup = JSON.parse(localStorage.getItem("groups")) || {};
    setGroup(storeGroup.find((group) => group.id === groupId) || []);
  }, [groupId]);

  const handleAddNote = (text) => {
    const now = new Date().toISOString();
    const newNote = {
      id: Date.now().toString(),
      text,
      createdAt: now,
      updatedAt: now,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    const allNotes = JSON.parse(localStorage.getItem("notes")) || {};
    allNotes[groupId] = updatedNotes;
    localStorage.setItem("notes", JSON.stringify(allNotes));
  };

  if (!groupId) {
    return (
      <div className={styles.emptyState}>Select a group to view notes.</div>
    );
  }

  return (
    <div className={styles.notesContainer}>
      <div className={styles.header}>
        <span className={styles.backButton} onClick={onBack} > 
            ← 
        </span>
        <div
          className={styles.avatar}
          style={{ backgroundColor: group.color || "#3b82f6" }}
        >
          {group.initials}
        </div>
        <span className={styles.groupName}>{group.name}</span>
      </div>
      <div className={styles.notesList}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className={styles.noteCard}>
              <p className={styles.noteText}>{note.text}</p>
              <div className={styles.meta}>
                <span>{formatDateTime(note.createdAt)}</span>
                
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>Add Notes...</div>
        )}
        {}
      </div>

      <NoteEditor onSend={handleAddNote} />
    </div>
  );
};

export default NotesList;
