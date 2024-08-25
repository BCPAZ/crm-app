import Alert from "@/components/common/Alert";
import Input from "@/components/common/Input";
import PropTypes from "prop-types";
import {
  useCreateRoleMutation,
  useGetPermissionsQuery,
  useUpdateRoleMutation,
} from "@/data/services/rolesPermissionsService";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import Spinner from "@/components/common/Spinner";

const formatPermissionName = (name) => {
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const CreateRoleModal = ({ showModal, closeModal, role }) => {
  const [createRole, { isLoading, isSuccess, isError, reset }] =
    useCreateRoleMutation();
  const [
    updateRole,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      reset: updateReset
    },
  ] = useUpdateRoleMutation();
  const {
    data: permissions = [],
    isLoading: permissionLoading,
    isError: permissionError,
  } = useGetPermissionsQuery();
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setSelectedPermissions(role.permissions.map(permission => permission.name));
    } else {
      setRoleName('');
      setSelectedPermissions([]);
    }
  }, [role]);

  const handleRoleName = (e) => {
    setRoleName(e.target.value);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    const permissionName = permissions.find(
      (permission) => permission.id === Number(value)
    )?.name;

    setSelectedPermissions((prev) => {
      if (checked) {
        return [...prev, permissionName];
      } else {
        return prev.filter((permission) => permission !== permissionName);
      }
    });
  };

  const handleSubmit = () => {
    if (role) {
      updateRole({ id: role.id, data: { name: roleName } });
    } else {
      createRole({ name: roleName, permissions: selectedPermissions });
    }
  };

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      showToast("Rol uğurlu şəkildə yaradıldı", "success");
      if (role) {
        updateReset();
      } else {
        reset();
      }
      closeModal();
    }
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    if (isError || updateError) {
      showToast("Rol yaradılan zaman xəta baş verdi", "error");
    }
  }, [isError, updateError]);

  return (
    <div
      className={`w-full h-screen bg-black/70 ${
        showModal ? "flex" : "hidden"
      } items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[50%]">
        <h1 className="text-xl font-semibold">Yeni rol yaradın</h1>
        <Alert
          value="Proyektdə iştirak edəcək rol və ona uyğun icazəni yaradın"
          type="primary"
        />
        <Input
          onChange={handleRoleName}
          value={roleName}
          label="Rolun adı"
          type="text"
          placeholder="Rol adını əlavə edin"
        />
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
              <label
                key={permission.id}
                className="flex items-center gap-4 text-sm font-medium mt-3"
              >
                <input
                  type="checkbox"
                  value={permission.id}
                  onChange={handlePermissionChange}
                  checked={selectedPermissions.includes(permission.name)}
                  className="form-checkbox"
                />
                {formatPermissionName(permission.name)}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSubmit}
            className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center justify-center gap-2"
          >
            {isLoading || updateLoading && <Spinner />}
            {role ? 'Yeniləyin' : 'Yaradın'}
          </button>
          <button
            onClick={closeModal}
            className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white"
          >
            Ləğv et
          </button>
        </div>
      </div>
    </div>
  );
};

CreateRoleModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  role: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    permissions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    )
  })
};

export default CreateRoleModal;
