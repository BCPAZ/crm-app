import { IoAddSharp } from "react-icons/io5";
import FileTable from "@/components/common/FileTable";
import { useState } from "react";
import JobTitleModal from "@/components/App/Security/JobTitleModal";
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
        <button onClick={handleModal} className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2">
          <IoAddSharp size={18} />
          Create position
        </button>
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