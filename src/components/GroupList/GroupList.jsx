import React, { useState, useEffect } from 'react';
import styles from './GroupList.module.css';
import Modal from '../Modal/Modal';

const GroupList = ({ selectedGroupId, setSelectedGroupId }) => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

const handleCreateGroup = ({ name, color }) => {
  const words = name.trim().split(/\s+/);
  let initials = '';

  if (words.length === 1) {
    initials = words[0][0].toUpperCase();
  } else {
    initials = (words[0][0] + words[1][0]).toUpperCase();
  }

  const newGroup = {
    id: Date.now().toString(),
    name: name.trim(),
    color,
    initials
  };

  const updatedGroups = [...groups, newGroup];
  setGroups(updatedGroups);
  localStorage.setItem('groups', JSON.stringify(updatedGroups));
  setShowModal(false);
};


  const isDuplicate = (name) =>
    groups.some((g) => g.name.toLowerCase() === name.toLowerCase());

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pocket Notes</h2>
        <button className={styles.floatingBtn} onClick={() => setShowModal(true)}>
          + 
        </button>
      </div>

      <ul className={styles.groupList}>
        {groups.map((group) => (
          <li
            key={group.id}
            className={`${styles.groupItem} ${selectedGroupId === group.id ? styles.active : ''}`}
            onClick={() => setSelectedGroupId(group.id)}
          >
            <div
              className={styles.avatar}
              style={{ backgroundColor: group.color || '#3b82f6' }}
            >
              {group.initials}  
            </div>
            <span className={styles.groupName}>{group.name}</span>
          </li>
        ))}
      </ul>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateGroup}
          validateName={(name) =>
            name.trim().length >= 1 && !isDuplicate(name)
          }
        />
      )}
    </div>
  );
};

export default GroupList;
