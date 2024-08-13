import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import Column from "./Column";
import SortableItem from "./SortableItem";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: columns.length, name: `Column ${columns.length + 1}` },
    ]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <section className="py-10 w-full h-screen overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={columns.map((column) => column.id)}>
          <div className="flex space-x-6 h-full overflow-x-scroll">
            {columns.map((column) => (
              <SortableItem key={column.id} id={column.id}>
                <Column name={column.name} />
              </SortableItem>
            ))}

            <button
              onClick={handleAddColumn}
              className="min-w-[336px] h-12 p-2 bg-white border border-grey/20 rounded-lg text-sm flex items-center justify-center gap-2 font-semibold"
            >
              <IoAddSharp size={20} />
              Create Column
            </button>
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default KanbanBoard;
