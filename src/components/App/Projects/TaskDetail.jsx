import Selectbox from "@/components/common/Selectbox";
import { HiTrash } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
} from "@/data/services/taskManagementService";
import useToast from "@/hooks/useToast";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";

const TaskDetail = ({ selectedTaskId, closeTaskDetail }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {showToast} = useToast();
  const detailRef = useRef(null);
  const { data: task = {} } = useGetTaskQuery(selectedTaskId, {
    skip: !selectedTaskId,
  });

  const [deleteTask, { isLoading, isSuccess, isError }] = useDeleteTaskMutation();

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  const handleDeleteTask = () => {
    deleteTask(selectedTaskId);
    setShowConfirmation(false);
  };

  useEffect(() => {
    if(isSuccess){
      showToast('success', 'Tapşırıq uğurlu şəkildə silindi');
      setShowConfirmation(false);
      closeTaskDetail();
    }
  },[isSuccess])

  useEffect(() => {
    if(isError){
      showToast('error', 'Tapşırıq silinə bilmədi')
    }
  },[isError])

  useClickOutside(detailRef,closeTaskDetail)

  return (
    <aside ref={detailRef} className="min-w-[480px] fixed top-0 right-0 h-full bg-white shadow-lg">
      <ConfirmationModal
        showConfirmation={showConfirmation}
        closeConfirmationModal={closeConfirmationModal}
        handleDelete={handleDeleteTask}
        isLoading={isLoading}
        title="Tapşırığı silmək istədiyinizdən əminsinizmi?"
      />
      <header className="p-5 flex items-center justify-between gap-2">
        <Selectbox outline task={task} />
        <div className="flex items-center gap-5 text-gray-500">
          <button onClick={() => setShowConfirmation(true)}>
            <HiTrash size={24} />
          </button>
          <button onClick={closeTaskDetail}>
            <IoCloseSharp size={24} />
          </button>
        </div>
      </header>
      <div className="w-full h-full">
        <Tabs task={task} />
      </div>
    </aside>
  );
};

TaskDetail.propTypes = {
  selectedTaskId: PropTypes.number,
  closeTaskDetail : PropTypes.func
};

export default TaskDetail;
