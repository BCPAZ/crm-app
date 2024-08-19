import FileTable from "@/components/common/FileTable";
import { useState } from "react";
import CreateRoleModal from "@/components/App/Security/CreateRoleModal";
import CustomButton from "@/components/common/CustomButton";
const Roles = () => {
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
        <h1 className="text-2xl font-semibold">Roles</h1>
        <CustomButton value="Create Role" functionality={handleModal} />
        </div>
        <div className="mt-10">
          <FileTable />
        </div>
      </div>
      <CreateRoleModal showModal={showModal} closeModal={closeModal} /> 
    </section>
  )
}

export default Roles