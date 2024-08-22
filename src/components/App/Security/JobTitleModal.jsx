import Alert from "@/components/common/Alert"
import CustomButton from "@/components/common/CustomButton";
import Input from "@/components/common/Input"
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useCreatePositionMutation } from "@/data/services/positionsService";
import useToast from "@/hooks/useToast";

const JobTitleModal = ({ showModal, closeModal }) => {
  const [createPosition, { isSuccess, isError, isLoading }] = useCreatePositionMutation();
  const [positionName, setPositionName] = useState('');
  const {showToast} = useToast();

  const handlePositionName = (e) => {
    setPositionName(e.target.value);
  }

  const addPosition = () => {
    createPosition({ name: positionName });
    setPositionName('');
    console.log(positionName)
  }

  useEffect(() => {
    if (isSuccess) {
      showToast('Pozisiya adı uğurla əlavə edildi' , 'success')
      closeModal();
    }
  }, [isSuccess]);

  useEffect (() => {
    if(isError){
      showToast('Pozisiya adı əlavə edilə bilmədi', 'error')
    }
  },[isError])

  return (
    <div className={`w-full h-screen bg-black/70 ${showModal ? 'flex' : 'hidden'} items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}>
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-1/2">
        <h1 className="text-xl font-semibold">Create new position</h1>
        <Alert type='primary' value="Şirkətdə istifadə edilmək üzərə pozisiya adı daxil edin" />
        <Input onChange={handlePositionName} value={positionName} label="Position name" type="text" placeholder="Add position name" />
        <div className="flex justify-end gap-3">
          <CustomButton isLoading={isLoading} functionality={addPosition} simple value="Create" />
          <button onClick={closeModal} className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white">Cancel</button>
        </div>
      </div>
    </div>
  )
}

JobTitleModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func
}

export default JobTitleModal;
