// AddResource.js
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './AddResource.module.css';

const AddResource = ({ moduleId, addResource, setPdfUrl }) => { // Pass setPdfUrl as prop
  const [resourceName, setResourceName] = useState('');
  const [link, setLink] = useState('');

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    addResource(moduleId, { type: 'link', name: resourceName, url: link });
    setResourceName('');
    setLink('');
  };

  const handleFileDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type === 'application/pdf') { // Check if dropped file is a PDF
        setPdfUrl(URL.createObjectURL(file)); // Set PDF URL
      }
      addResource(moduleId, { type: 'file', name: file.name, file });
    });
  };

  return (
    <div className={styles.addResource}>
      <form onSubmit={handleLinkSubmit} className={styles.addResourceForm}>
        <input
          type="text"
          placeholder="Resource Name"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Link URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">Add Link</button>
      </form>
      <Dropzone onDrop={handleFileDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default AddResource;
