import { HiTrash } from "react-icons/hi2";
import { MdModeEdit } from "react-icons/md";
import PropTypes from "prop-types";
import { useDeletePositionMutation } from "@/data/services/positionsService";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";
const JobTitleCard = ({ position }) => {
  const [deletePosition, { isError, isSuccess }] = useDeletePositionMutation();
  const { showToast } = useToast();

  const handleDelete = (id) => {
    deletePosition(id);
  };
  useEffect(() => {
    if (isSuccess) {
      showToast("Pozisiya uğurla silindi.", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Pozisiya silinə bilmədi.", "error");
    }
  }, [isError]);

  return (
    <div className="min-h-[150px] relative p-4 flex flex-col justify-end rounded-lg border border-grey/40">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <button className="text-gray-400 hover:bg-blue-600 p-1 rounded-lg hover:text-white">
          <MdModeEdit size={18} />
        </button>
        <button
          onClick={() => handleDelete(position.id)}
          className="text-gray-400 hover:bg-red-600 p-1 rounded-lg hover:text-white"
        >
          <HiTrash size={18} />
        </button>
      </div>
      <span className="text-md font-semibold">{position.name}</span>
    </div>
  );
};

JobTitleCard.propTypes = {
  position: PropTypes.array,
};

export default JobTitleCard;
