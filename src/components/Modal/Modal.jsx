import React, { useRef, useEffect, useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ onClose, onSubmit, validateName }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6'); 
  const [error, setError] = useState('');
  const modalRef = useRef();

  const colors = [
    '#a855f7', 
    '#ec4899', 
    '#06b6d4', 
    '#f97316', 
    '#3b82f6', 
    '#6366f1'  
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleSubmit = () => {
    if (!validateName(groupName)) {
      setError('Invalid or duplicate group name');
      return;
    }
    onSubmit({ name: groupName.trim(), color: selectedColor });
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} ref={modalRef}>
        <h3 className={styles.title}>Create New group</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
              setError('');
            }}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Choose colour</label>
          <div className={styles.colorPicker}>
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`${styles.colorOption} ${
                  selectedColor === color ? styles.selected : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        
        <div className={styles.actions}>
          <button 
            onClick={handleSubmit} 
            className={styles.createButton}
            disabled={!groupName.trim()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;