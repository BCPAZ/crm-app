import Alert from "@/components/common/Alert";
import CustomButton from "@/components/common/CustomButton";
import Input from "@/components/common/Input";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  useCreatePositionMutation,
  useUpdatePositionMutation,
} from "@/data/services/positionsService";
import useToast from "@/hooks/useToast";

const JobTitleModal = ({ showModal, closeModal, position }) => {
  const [
    createPosition,
    {
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      isLoading: isCreating,
      reset: resetIsCreating,
    },
  ] = useCreatePositionMutation();
  const [
    updatePosition,
    {
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      isLoading: isUpdating,
      reset: resetIsUpdating,
    },
  ] = useUpdatePositionMutation();
  const [positionName, setPositionName] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (position) {
      setPositionName(position.name);
    } else {
      setPositionName("");
    }
  }, [position]);

  const handlePositionName = (e) => {
    setPositionName(e.target.value);
  };

  // Add or update the position
  const handleSubmit = () => {
    if (position) {
      updatePosition({ id: position.id, data: { name: positionName } });
    } else {
      createPosition({ name: positionName });
    }
    setPositionName("");
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      showToast("Pozisiya uğurla əlavə edildi", "success");
      if (position) {
        resetIsUpdating();
      } else {
        resetIsCreating();
      }
      closeModal();
    }
  }, [isCreateSuccess, isUpdateSuccess, showToast, closeModal]);

  useEffect(() => {
    if (isCreateError || isUpdateError) {
      showToast("Pozisiya əlavə edilə bilmədi", "error");
    }
  }, [isCreateError, isUpdateError, showToast]);

  return (
    <div
      className={`w-full h-screen bg-black/70 ${
        showModal ? "flex" : "hidden"
      } items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[50%]">
        <h1 className="text-xl font-semibold">
          {position ? "Pozisiyanı yenilə" : "Yeni pozisiya yarat"}
        </h1>
        <Alert
          type="primary"
          value={
            position
              ? "Pozisiya adını yeniləyin"
              : "Şirkətdə istifadə edilmək üzrə pozisiya adı daxil edin"
          }
        />
        <Input
          onChange={handlePositionName}
          value={positionName}
          label="Pozisiya adı"
          type="text"
          placeholder="Pozisiya əlavə edin"
        />
        <div className="flex justify-end gap-3">
          <CustomButton
            isLoading={isCreating || isUpdating}
            functionality={handleSubmit}
            simple
            value={position ? "Yeniləyin" : "Create"}
          />
          <button
            onClick={closeModal}
            className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

JobTitleModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  position: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default JobTitleModal;
