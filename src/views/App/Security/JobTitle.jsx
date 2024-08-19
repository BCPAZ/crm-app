import FileTable from "@/components/common/FileTable";
import { useState } from "react";
import JobTitleModal from "@/components/App/Security/JobTitleModal";
import CustomButton from "@/components/common/CustomButton";
const JobTitle = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <section className="w-full h-full relative">
      <div className="py-10 px-5">
        <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold">Positions</h1>
        <CustomButton value="Create position" functionality={handleModal}  />
        </div>
        <div className="mt-10">
          <FileTable />
        </div>
      </div>
      <JobTitleModal showModal={showModal} closeModal={closeModal} /> 
    </section>
  )
}

export default JobTitle