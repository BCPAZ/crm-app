import { IoAddSharp } from "react-icons/io5";
import FileTable from "@/components/common/FileTable";
import CreateRoleModal from "@/components/App/Security/CreateRoleModal";
const JobTitle = () => {
  return (
    <section className="w-full h-full relative">
      <div className="py-10">
        <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold">Roles</h1>
        <button className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2">
          <IoAddSharp size={18} />
          Create Role
        </button>
        </div>
        <div className="mt-10">
          <FileTable />
        </div>
        
      </div>
      <CreateRoleModal />
    </section>
  )
}

export default JobTitle