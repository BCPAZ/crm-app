import { useEffect, useState } from "react";
import { useGetRolesQuery, useDeleteRoleMutation } from "@/data/services/rolesPermissionsService";
import CreateRoleModal from "@/components/App/Security/CreateRoleModal";
import CustomButton from "@/components/common/CustomButton";
import useToast from "@/hooks/useToast";
import Spinner from "@/components/common/Spinner";
import { HiTrash } from "react-icons/hi2";
import { MdModeEditOutline } from "react-icons/md";
import { Toaster } from "react-hot-toast";

const Roles = () => {
  const { data: roles = [], isLoading, isError } = useGetRolesQuery();
  const [deleteRole , {isSuccess : deleteSuccess, isError : deleteError}] = useDeleteRoleMutation();
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const handleModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteRole = (id) => {
    deleteRole(id);
  }

  useEffect(() => {
    if (isError) {
      showToast("Rollar yüklənilə bilmədi", "error");
    }
  }, [isError]);

  useEffect(() => {
    if (deleteSuccess) {
      showToast("Rol uğurlu şəkildə silindi", "success");
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (deleteError) {
      showToast("Rol silinən zaman xəta baş verdi", "error");
    }
  }, [deleteError]);
  return (
    <section className="w-full h-full relative">
      <Toaster />
      <div className="py-10 px-5">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-semibold">Roles</h1>
          <CustomButton value="Create Role" functionality={handleModal} />
        </div>
        <div className="mt-10 w-full overflow-x-scroll">
          <div className="p-4 border-b border-gray-400/40 outline-none flex items-center justify-between gap-4 w-full">
            <div className="md:text-md text-sm font-semibold w-[33%]">Role name</div>
            <div className="md:text-md text-sm font-semibold text-start w-[33%]">
              Permissions
            </div>
            <div className="flex items-center gap-2 justify-end w-[33%]">
              <span className="md:text-md text-sm font-semibold">Actions</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2 h-full">
            {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {roles.map((role, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-grey/10 flex items-center justify-between gap-4 w-full"
              >
                <div className="md:text-md text-sm font-semibold w-[33%]">{role.name}</div>
                <div className="text-md font-semibold w-[33%] text-start flex flex-wrap items-center">
                  <div className="text-sm text-gray-500">
                    {role.permissions
                      .map((permission) =>
                        permission.name
                          .replace("_project", "")
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end w-[33%]">
                  <button className="text-gray-500 p-1 rounded-md hover:bg-blue-600/20 hover:text-blue-600 transition-colors duration-300">
                    <MdModeEditOutline size={18}/>
                  </button>
                  <button onClick={() => handleDeleteRole(role.id)} className="text-gray-500 p-1 rounded-md hover:bg-red-600/20 hover:text-red-600 transition-colors duration-300">
                    <HiTrash size={18}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateRoleModal showModal={showModal} closeModal={closeModal} />
    </section>
  );
};

export default Roles;
