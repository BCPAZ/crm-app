import Alert from "@/components/common/Alert";
import Input from "@/components/common/Input";
import PropTypes from "prop-types";
import { useCreateRoleMutation, useGetPermissionsQuery } from "@/data/services/rolesPermissionsService";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import Spinner from "@/components/common/Spinner";

const formatPermissionName = (name) => {
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const CreateRoleModal = ({ showModal, closeModal }) => {
  const [createRole, { isLoading, isSuccess, isError }] = useCreateRoleMutation();
  const { data: permissions = [], isLoading: permissionLoading, isError: permissionError } = useGetPermissionsQuery();
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { showToast } = useToast();

  const handleRoleName = (e) => {
    setRoleName(e.target.value);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    const permissionName = permissions.find(permission => permission.id === Number(value))?.name;

    setSelectedPermissions((prev) => {
      if (checked) {
        return [...prev, permissionName];
      } else {
        return prev.filter(permission => permission !== permissionName);
      }
    });
  };

  const handleSubmit = () => {
    console.log({ name: roleName, permissions: selectedPermissions });
    createRole({ name: roleName, permissions: selectedPermissions });
  };

  // Toast messages
  useEffect(() => {
    if (isSuccess) {
      showToast("Rol uğurlu şəkildə yaradıldı", "success");
      closeModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Rol yaradılan zaman xəta baş verdi", "error");
    }
  }, [isError]);

  return (
    <div className={`w-full h-screen bg-black/70 ${showModal ? "flex" : "hidden"} items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}>
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[50%]">
        <h1 className="text-xl font-semibold">Yeni rol yaradın</h1>
        <Alert value="Proyektdə iştirak edəcək rol və ona uyğun icazəni yaradın" type="primary" />
        <Input onChange={handleRoleName} value={roleName} label="Rolun adı" type="text" placeholder="Rol adını əlavə edin" />
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">İcazələri seç</label>
          {permissionLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {permissionError && (
            <div className="w-full h-full flex items-center justify-center">
              Xəta baş verdi
            </div>
          )}

          <div className="mt-3 w-full">
            {permissions.map((permission) => (
              <label key={permission.id} className="flex items-center gap-4 text-sm font-medium mt-3">
                <input
                  type="checkbox"
                  value={permission.id}
                  onChange={handlePermissionChange}
                  className="form-checkbox"
                />
                {formatPermissionName(permission.name)}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={handleSubmit} className='bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center justify-center gap-2'>
            {isLoading && <Spinner />}
            Create
          </button>
          <button onClick={closeModal} className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CreateRoleModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default CreateRoleModal;
