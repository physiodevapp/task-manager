import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Define types for Column and Task
interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// Example initial data
const initialData: Record<string, Column> = {
  ['column-1']: {
    id: 'column-1',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'Task 1' },
      { id: 'task-2', content: 'Task 2' },
    ],
  },
  ['column-2']: {
    id: 'column-2',
    title: 'In Progress',
    tasks: [
      { id: 'task-3', content: 'Task 3' },
      { id: 'task-4', content: 'Task 4' },
    ],
  },
  ['column-3']: {
    id: 'column-3',
    title: 'Review',
    tasks: [
      { id: 'task-5', content: 'Task 5' },
    ],
  },
  ['column-4']: {
    id: 'column-4',
    title: 'Done',
    tasks: [],
  },
};

export const TestComponent = () => {
  const [columns, setColumns] = React.useState(initialData);

  // Function to handle when a task is dragged
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn === destinationColumn) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
      });
    } else {
      destinationTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          tasks: destinationTasks,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ margin: '0 10px', border: '1px solid lightgray', borderRadius: '4px', width: '250px' }}
              >
                {/* <h3 style={{ textAlign: 'center' }}>{column.title}</h3> */}
                {column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: 'none',
                          padding: '16px',
                          margin: '0 0 8px 0',
                          backgroundColor: snapshot.isDragging ? '#e0e0e0' : '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          opacity: snapshot.isDragging ? 0.5 : 1,
                        }}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
