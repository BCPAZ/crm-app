import Column from "./Column";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: columns.length, name: `Column ${columns.length + 1}` },
    ]);
  };
  return (
    <section className="py-10">
      <div className="p-4">
        <div className="flex space-x-4 overflow-x-auto">
          {columns.map((column) => (
            <Column key={column.id} name={column.name} />
          ))}
          <button
            onClick={handleAddColumn}
            className="w-[336px] p-2 bg-white border border-grey/20 rounded-lg text-sm flex items-center justify-center gap-2 font-semibold"
          >
            <IoAddSharp size={20} />
            Create Column
          </button>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
