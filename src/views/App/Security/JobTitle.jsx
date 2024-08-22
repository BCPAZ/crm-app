import { useState } from "react";
import JobTitleModal from "@/components/App/Security/JobTitleModal";
import CustomButton from "@/components/common/CustomButton";
import { Toaster } from "react-hot-toast";
import { useGetPositionsQuery } from "@/data/services/positionsService";
import JobTitleCard from "@/components/App/Security/JobTitleCard";
import Spinner from "@/components/common/Spinner";
import { PiWarningOctagonDuotone } from "react-icons/pi";


const JobTitle = () => {
  const { data: positions, isFetching, isError } = useGetPositionsQuery();
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
      <div className="py-10 px-5 h-full">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-semibold">Positions</h1>
          <CustomButton value="Create position" functionality={handleModal}  />
        </div>
        <div className="mt-10 h-full">
          {isError && <div className="h-full w-full flex items-center justify-center font-semibold text-xl">Bir xəta baş verdi, yenidən cəhd edin.</div>}
          {!isFetching && positions && positions.length > 0 ? (
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
              {positions.map((position,index) => (
                <JobTitleCard position={position} key={index}  />
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
      <JobTitleModal showModal={showModal} closeModal={closeModal} /> 
    </section>
  )
}

export default JobTitle;
