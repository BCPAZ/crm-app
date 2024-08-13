import { useDroppable } from "@dnd-kit/core";
const DroppableItem = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    backgroundColor: isOver ? "lightblue" : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} className="p-4 bg-white shadow rounded">
      {children}
    </div>
  );
};

export default DroppableItem;
