import { IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: `column-${columns.length}`, name: `Column ${columns.length + 1}`, items: [] },
    ]);
  };

  const handleDeleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "COLUMN") {
      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, movedColumn);
      setColumns(newColumns);
      return;
    }
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === source.droppableId
    );
    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );

    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const sourceItems = [...sourceColumn.items];
    const [movedItem] = sourceItems.splice(source.index, 1);
    const destinationItems = [...destinationColumn.items];

    destinationItems.splice(destination.index, 0, movedItem);

    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      items: sourceItems,
    };
    newColumns[destinationColumnIndex] = {
      ...destinationColumn,
      items: destinationItems,
    };

    setColumns(newColumns);
  };

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
                  <Draggable draggableId={column.id} index={index} key={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Column
                          handleDeleteColumn={handleDeleteColumn}
                          column={column}
                          name={column.name}
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

export default KanbanBoard;
