import { useState } from "react";
import JobTitleModal from "@/components/App/Security/JobTitleModal";
import CustomButton from "@/components/common/CustomButton";
import { Toaster } from "react-hot-toast";
import { useGetPositionsQuery } from "@/data/services/positionsService";
import { HiTrash } from "react-icons/hi2";
import { MdModeEdit } from "react-icons/md";


const JobTitle = () => {
  const { data: positions, isLoading, isError } = useGetPositionsQuery();
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <section className="w-full h-full relative">
      <Toaster />
      <div className="py-10 px-5">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-semibold">Positions</h1>
          <CustomButton value="Create position" functionality={handleModal}  />
        </div>
        <div className="mt-10">
          {isLoading && <p>Yüklənir...</p>}
          {isError && <p>Bir xəta baş verdi, yenidən cəhd edin.</p>}
          {positions && positions.length > 0 ? (
            <div className="grid grid-cols-4 gap-5">
              {positions.map((position) => (
                <div key={position.id} className="min-h-[150px] relative p-4 flex flex-col justify-end rounded-lg border border-grey/40 text-lg font-semibold">
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button className="text-gray-400 hover:bg-blue-600 p-1 rounded-lg hover:text-white"><MdModeEdit size={18}/></button>
                    <button className="text-gray-400 hover:bg-red-600 p-1 rounded-lg hover:text-white"><HiTrash size={18}/></button>
                  </div>
                  <span>{position.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>Heç bir pozisiya tapılmadı.</p>
          )}
        </div>
      </div>
      <JobTitleModal showModal={showModal} closeModal={closeModal} /> 
    </section>
  )
}

export default JobTitle;
