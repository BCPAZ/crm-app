import { IoAddSharp } from "react-icons/io5";
import { useState, useCallback, memo } from "react";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskDetail from "./TaskDetail";
import {
  useChangeBoardPositionMutation,
  useChangeTaskPositionMutation,
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "@/data/services/taskManagementService";
import { useSelector } from "react-redux";

const KanbanBoard = () => {
  useGetBoardsQuery();
  const { boards = [] } = useSelector((state) => state.kanban);

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [createBoard] = useCreateBoardMutation();
  const [changeBoardPosition] = useChangeBoardPositionMutation();
  const [changeTaskPosition] = useChangeTaskPositionMutation();
  const [selectedTaskId, setSelectedTaskId] = useState(null);

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
    setNewColumnName("");
    setIsAddingColumn(false);
    createBoard({ name: newColumnName });
  };

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, type, draggableId } = result;

      if (!destination) return;

      if (type === "COLUMN") {
        changeBoardPosition({
          old_position: source.index,
          new_position: destination.index,
        });
        return;
      }

      changeTaskPosition({
        board_id: destination.droppableId?.replace("board-", ""),
        position: destination.index,
        task_id: draggableId.replace("task-", ""),
        source_board_id: source.droppableId?.replace("board-", ""),
      });
    },
    []
  );

  return (
    <section className="py-10 w-full h-screen overflow-x-auto">
      {/* Task seçilibsə, TaskDetail komponentini göstər */}
      {selectedTaskId && (
        <TaskDetail 
          selectedTaskId={selectedTaskId} 
          closeTaskDetail={() => setSelectedTaskId(null)} // TaskDetail bağlamaq üçün funksiyanı ötürürük
        />
      )}
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
                    draggableId={`board-${column.id}`}
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
                          setSelectedTaskId={setSelectedTaskId} // Taskın üzərinə kliklədikdə ID-ni təyin etmək üçün
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
