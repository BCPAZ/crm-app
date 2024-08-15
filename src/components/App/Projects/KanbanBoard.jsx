import { IoAddSharp } from "react-icons/io5";
import { useState, useCallback, memo } from "react";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    {
      id: "column-1",
      name: "Column 1",
      items: [
        { id: "task-1", content: "Task 1" },
        { id: "task-2", content: "Task 2" },
      ],
    },
    {
      id: "column-2",
      name: "Column 2",
      items: [
        { id: "task-3", content: "Task 3" },
        { id: "task-4", content: "Task 4" },
      ],
    },
  ]);

  const handleAddColumn = useCallback(() => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { id: `column-${prevColumns.length + 1}`, name: `Column ${prevColumns.length + 1}`, items: [] },
    ]);
  }, []);

  const handleDeleteColumn = useCallback((id) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== id));
  }, []);

  const onDragEnd = useCallback((result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, movedColumn);
      setColumns(newColumns);
      return;
    }

    const sourceColumnIndex = columns.findIndex((column) => column.id === source.droppableId);
    const destinationColumnIndex = columns.findIndex((column) => column.id === destination.droppableId);

    if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;

    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const sourceItems = [...sourceColumn.items];
    const [movedItem] = sourceItems.splice(source.index, 1);
    const destinationItems = [...destinationColumn.items];

    destinationItems.splice(destination.index, 0, movedItem);

    const updatedColumns = [...columns];
    updatedColumns[sourceColumnIndex] = { ...sourceColumn, items: sourceItems };
    updatedColumns[destinationColumnIndex] = { ...destinationColumn, items: destinationItems };

    setColumns(updatedColumns);
  }, [columns]);

  return (
    <section className="py-10 w-full h-screen overflow-x-auto">
      <div className="flex space-x-6 h-full overflow-x-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex space-x-6 h-full"
              >
                {columns.map((column, index) => (
                  <Draggable draggableId={column.id} key={column.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Column
                          handleDeleteColumn={handleDeleteColumn}
                          column={column}
                          key={column.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={handleAddColumn}
          className="min-w-[336px] h-12 p-2 bg-white border border-grey/20 rounded-lg text-sm flex items-center justify-center gap-2 font-semibold"
        >
          <IoAddSharp size={20} />
          Create Column
        </button>
      </div>
    </section>
  );
};

export default memo(KanbanBoard);
