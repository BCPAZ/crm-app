import { IoAddSharp } from "react-icons/io5";
import { useState, useCallback, memo } from "react";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskDetail from "./TaskDetail";
import {
  useChangeBoardPositionMutation,
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "@/data/services/taskManagementService";
import { useSelector } from "react-redux";

const KanbanBoard = () => {
  useGetBoardsQuery();
  const { boards = [] } = useSelector((state) => state.kanban);

  const [columns, setColumns] = useState([]);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [createBoard] = useCreateBoardMutation();
  const [changeBoardPosition] = useChangeBoardPositionMutation();

  const handleAddColumn = () => {
    setIsAddingColumn(true);
  };

  const handleColumnNameChange = (e) => {
    setNewColumnName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveColumn();
    }
  };

  const handleSaveColumn = () => {
    if (newColumnName.trim() === "") return;

    setColumns((prevColumns) => [
      ...prevColumns,
      {
        id: `column-${prevColumns.length + 1}`,
        name: newColumnName,
        items: [],
      },
    ]);
    setNewColumnName("");
    setIsAddingColumn(false);
    createBoard({ name: newColumnName });
  };

  const handleDeleteColumn = useCallback((id) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== id));
  }, []);

  const handleUpdateColumnName = useCallback((id, newName) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === id ? { ...col, name: newName } : col
      )
    );
  }, []);

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              items: column.items.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
  };

  const handleAddTask = useCallback((columnId, taskContent) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              items: [
                ...column.items,
                { id: `task-${column.items.length + 1}`, content: taskContent },
              ],
            }
          : column
      )
    );
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, type } = result;

      if (!destination) return;

      if (type === "COLUMN") {
        const newColumns = [...columns];
        const [movedColumn] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, movedColumn);
        changeBoardPosition({
          old_position: source.index,
          new_position: destination.index,
        });
        setColumns(newColumns);

        return;
      }

      const sourceColumnIndex = columns.findIndex(
        (column) => column.id === source.droppableId
      );
      const destinationColumnIndex = columns.findIndex(
        (column) => column.id === destination.droppableId
      );
      if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;

      const sourceColumn = columns[sourceColumnIndex];
      const destinationColumn = columns[destinationColumnIndex];

      const sourceItems = [...sourceColumn.items];
      const [movedItem] = sourceItems.splice(source.index, 1);
      const destinationItems = [...destinationColumn.items];
      destinationItems.splice(destination.index, 0, movedItem);

      const updatedColumns = [...columns];
      updatedColumns[sourceColumnIndex] = {
        ...sourceColumn,
        items: sourceItems,
      };
      updatedColumns[destinationColumnIndex] = {
        ...destinationColumn,
        items: destinationItems,
      };

      setColumns(updatedColumns);
    },
    [columns]
  );

  return (
    <section className="py-10 w-full h-screen overflow-x-auto">
      {/* <TaskDetail /> */}
      <div className="flex space-x-6 h-full overflow-x-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="COLUMN"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex space-x-6 h-full"
              >
                {boards.map((column, index) => (
                  <Draggable
                    draggableId={`column-${column.id}`}
                    key={column.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Column
                          column={column}
                          handleDeleteColumn={handleDeleteColumn}
                          handleUpdateColumnName={handleUpdateColumnName}
                          handleAddTask={handleAddTask}
                          handleDeleteTask={(taskId) =>
                            handleDeleteTask(column.id, taskId)
                          }
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

        {isAddingColumn ? (
          <input
            type="text"
            value={newColumnName}
            onChange={handleColumnNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter column name"
            className="p-2 min-w-[336px] border border-grey/20 h-12 text-sm focus:outline-black rounded-lg"
          />
        ) : (
          <button
            onClick={handleAddColumn}
            className="min-w-[336px] h-12 p-2 border-2 border-grey/20 rounded-lg text-sm font-semibold flex items-center justify-center"
          >
            <IoAddSharp size={18} className="mr-2" />
            Add Column
          </button>
        )}
      </div>
    </section>
  );
};

export default memo(KanbanBoard);
