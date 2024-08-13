import { IoAddSharp } from "react-icons/io5";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDragIndicator } from "react-icons/md";
import { useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Column = ({ name }) => {
  const [items, setItems] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddItem = () => {
    setItems([...items, { id: items.length, name: `Item ${items.length + 1}` }]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-w-[336px] h-fit bg-column rounded-xl py-5 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-[25px] h-[25px] bg-grey/40 flex text-sm rounded-full items-center justify-center">
            {items.length}
          </span>
          <h1 className="text-lg font-bold">{name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleAddItem} className="w-[25px] h-[25px] bg-black text-white flex text-sm rounded-full items-center justify-center">
            <IoAddSharp size={18} />
          </button>
          <button className="p-1 hover:bg-grey/20 rounded-full transition-all duration-300 text-gray-40">
            <GoKebabHorizontal size={18} />
          </button>
          <button className="p-1 hover:bg-grey/20 rounded-full transition-all duration-300 text-gray-40">
            <MdDragIndicator size={18} />
          </button>
        </div>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)}>
          <div className="space-y-2 mt-4">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="p-2 bg-white border border-gray-200 rounded">{item.name}</div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Column;
