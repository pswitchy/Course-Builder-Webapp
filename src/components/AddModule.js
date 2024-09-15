// src/components/AddModule.js
import React, { useState } from 'react';
import styles from './AddModule.module.css';

const AddModule = ({ addModule }) => {
  const [moduleName, setModuleName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addModule(moduleName);
    setModuleName('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addModuleForm}>
      <input
        type="text"
        placeholder="New Module Name"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        required
      />
      <button type="submit">Add Module</button>
    </form>
  );
};

export default AddModule;
