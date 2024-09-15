// src/components/CourseBuilder.js
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddModule from './AddModule';
import Module from './Module';
import styles from './CourseBuilder.module.css';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  const addModule = (name) => {
    setModules([...modules, { id: `module-${Date.now()}`, name, resources: [] }]);
  };

  const renameModule = (moduleId, newName) => {
    setModules(modules.map(m => (m.id === moduleId ? { ...m, name: newName } : m)));
  };

  const deleteModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const addResource = (moduleId, resource) => {
    setModules(modules.map(m => (m.id === moduleId ? { ...m, resources: [...m.resources, { id: `resource-${Date.now()}`, ...resource }] } : m)));
  };

  const renameResource = (moduleId, resourceId) => {
    const newName = prompt('Rename resource:');
    if (newName) {
      setModules(modules.map(m =>
        m.id === moduleId
          ? { ...m, resources: m.resources.map(r => (r.id === resourceId ? { ...r, name: newName } : r)) }
          : m
      ));
    }
  };

  const deleteResource = (moduleId, resourceId) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, resources: m.resources.filter(r => r.id !== resourceId) }
        : m
    ));
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'module') {
      const reorderedModules = Array.from(modules);
      const [movedModule] = reorderedModules.splice(source.index, 1);
      reorderedModules.splice(destination.index, 0, movedModule);
      setModules(reorderedModules);
    } else if (type === 'resource') {
      const sourceModule = modules.find(m => m.id === source.droppableId);
      const destinationModule = modules.find(m => m.id === destination.droppableId);

      const sourceResources = Array.from(sourceModule.resources);
      const [movedResource] = sourceResources.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceResources.splice(destination.index, 0, movedResource);
        setModules(modules.map(m => (m.id === source.droppableId ? { ...m, resources: sourceResources } : m)));
      } else {
        const destinationResources = Array.from(destinationModule.resources);
        destinationResources.splice(destination.index, 0, movedResource);
        setModules(modules.map(m => {
          if (m.id === source.droppableId) {
            return { ...m, resources: sourceResources };
          } else if (m.id === destination.droppableId) {
            return { ...m, resources: destinationResources };
          } else {
            return m;
          }
        }));
      }
    }
  };

  return (
    <div className={styles.CourseBuilder}>
    
            <h2>Create a New Course</h2>
            <AddModule addModule={addModule} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-modules" type="module">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                    {modules.map((module, index) => (
                        <Module
                        key={module.id}
                        module={module}
                        index={index}
                        renameModule={renameModule}
                        deleteModule={deleteModule}
                        addResource={addResource}
                        renameResource={renameResource}
                        deleteResource={deleteResource}
                        />
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
    
    </div>
      
  );
};

export default CourseBuilder;
