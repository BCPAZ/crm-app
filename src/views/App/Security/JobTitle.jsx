import { useState, useEffect } from "react";
import JobTitleModal from "@/components/App/Security/JobTitleModal";
import CustomButton from "@/components/common/CustomButton";
import { Toaster } from "react-hot-toast";
import { useGetPositionsQuery } from "@/data/services/positionsService";
import { HiTrash } from "react-icons/hi2";
import { MdModeEdit } from "react-icons/md";
import Spinner from "@/components/common/Spinner";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useDeletePositionMutation } from "@/data/services/positionsService";
import useToast from "@/hooks/useToast";

const JobTitle = () => {
  const { data: positions, isFetching, isError } = useGetPositionsQuery();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState(null);

  const [{ isSuccess }] = useDeletePositionMutation();
  const { showToast } = useToast();

  const handleDeleteModal = (id) => {
    setPositionToDelete(id);
    setShowConfirmation(true);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Pozisiya uğurla silindi.", "success");
      setPositionToDelete(null);
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (isError) {
      showToast("Pozisiya silinə bilmədi.", "error");
    }
  }, [isError, showToast]);

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="w-full h-full relative">
      <Toaster />
      <div className="py-10 px-5 h-full">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-semibold">Positions</h1>
          <CustomButton value="Create position" functionality={handleModal} />
        </div>
        <div className="mt-10 h-full">
          {isError && (
            <div className="h-full w-full flex items-center justify-center font-semibold text-xl">
              Bir xəta baş verdi, yenidən cəhd edin.
            </div>
          )}
          {!isFetching && positions && positions.length > 0 ? (
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="min-h-[150px] relative p-4 flex flex-col justify-end rounded-lg border border-grey/40"
                >
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button className="text-gray-400 hover:bg-blue-600 p-1 rounded-lg hover:text-white">
                      <MdModeEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteModal(position.id)}
                      className="text-gray-400 hover:bg-red-600 p-1 rounded-lg hover:text-white"
                    >
                      <HiTrash size={18} />
                    </button>
                  </div>
                  <span className="text-md font-semibold">{position.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full">
              {isFetching ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <div className="h-full w-full flex items-center flex-col">
                  <PiWarningOctagonDuotone />
                  <span>Heç bir pozisiya tapılmadı</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        id={positionToDelete}
        showConfirmation={showConfirmation}
        closeConfirmationModal={closeConfirmationModal}
      />
      <JobTitleModal showModal={showModal} closeModal={closeModal} />
    </section>
  );
};

export default JobTitle;
