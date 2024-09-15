// src/components/Module.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddResource from './AddResource';
import styles from './Module.module.css';

const Module = ({ module, index, renameModule, deleteModule, addResource, renameResource, deleteResource }) => {
  const handleRenameModule = () => {
    const newName = prompt('Rename module:', module.name);
    if (newName) {
      renameModule(module.id, newName);
    }
  };

  return (
    <Draggable draggableId={module.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className={styles.moduleHeader}>
            <h3>{module.name}</h3>
            <button onClick={handleRenameModule}>Rename</button>
            <button onClick={() => deleteModule(module.id)}>Delete</button>
          </div>
          <Droppable droppableId={module.id} type="resource">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {module.resources.map((resource, index) => (
                  <Draggable key={resource.id} draggableId={resource.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div>
                          {resource.type === 'link' ? (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a>
                          ) : (
                            <span>{resource.name}</span>
                          )}
                          <button onClick={() => renameResource(module.id, resource.id)}>Rename</button>
                          <button onClick={() => deleteResource(module.id, resource.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddResource addResource={(resource) => addResource(module.id, resource)} />
        </div>
      )}
    </Draggable>
  );
};

export default Module;
