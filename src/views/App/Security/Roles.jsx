import { useEffect, useState } from "react";
import { useGetRolesQuery, useDeleteRoleMutation } from "@/data/services/rolesPermissionsService";
import CreateRoleModal from "@/components/App/Security/CreateRoleModal";
import CustomButton from "@/components/common/CustomButton";
import useToast from "@/hooks/useToast";
import Spinner from "@/components/common/Spinner";
import { HiTrash } from "react-icons/hi2";
import { MdModeEditOutline } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import ConfirmationModal from "@/components/common/ConfirmationModal";

const Roles = () => {
  const { data: roles = [], isLoading, isError } = useGetRolesQuery();
  const [deleteRole, { isSuccess: deleteSuccess, isError: deleteError }] = useDeleteRoleMutation();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [editRole , setEditRole] = useState(null); 
  const { showToast } = useToast();

  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const handleEdit = (role) => {
    setEditRole(role);
    setShowModal(true);
  }

  const openConfirmationModal = (id) => {
    setSelectedRoleId(id);
    setShowConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
    setSelectedRoleId(null);
  };

  const handleDeleteRole = () => {
    if (selectedRoleId) {
      deleteRole(selectedRoleId);
      closeConfirmationModal();
    }
  };

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
          <h1 className="text-2xl font-semibold">Rol yaradın</h1>
          <CustomButton value="Rol yarat" functionality={handleModal} />
        </div>
        <ConfirmationModal
          closeConfirmationModal={closeConfirmationModal}
          showConfirmation={showConfirmation}
          handleDelete={handleDeleteRole}
        />
        <div className="mt-10 w-full overflow-x-scroll">
          <div className="p-4 border-b border-gray-400/40 outline-none flex items-center justify-between gap-4 w-full">
            <div className="md:text-md text-sm font-semibold w-[33%]">Rol adı</div>
            <div className="md:text-md text-sm font-semibold text-start w-[33%]">
              İcazələr
            </div>
            <div className="flex items-center gap-2 justify-end w-[33%]">
              <span className="md:text-md text-sm font-semibold text-end">Tənzimləmələr</span>
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
                  <button onClick={() => handleEdit(role)} className="text-gray-500 p-1 rounded-md hover:bg-blue-600/20 hover:text-blue-600 transition-colors duration-300">
                    <MdModeEditOutline size={18}/>
                  </button>
                  <button
                    onClick={() => openConfirmationModal(role.id)}
                    className="text-gray-500 p-1 rounded-md hover:bg-red-600/20 hover:text-red-600 transition-colors duration-300"
                  >
                    <HiTrash size={18}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateRoleModal showModal={showModal} closeModal={closeModal} role={editRole}/>
    </section>
  );
};

export default Roles;
