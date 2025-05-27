import Alert from "@/components/common/Alert";
import CustomButton from "@/components/common/CustomButton";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import PropTypes from "prop-types";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/data/services/usersService";
import { useGetRolesQuery } from "@/data/services/rolesPermissionsService";

const QuickUpdateModal = ({ showModal, closeModal, user }) => {
  const [updateUser, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation();
  const { data: roles = [] } = useGetRolesQuery();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
    city: user?.city || "",
    zip_code: user?.zip_code || "",
    role_id: user?.role_id || "",
    avatar: user?.avatar_url || null,
    about: user?.about || "",
    type: user?.type || null,
  });

  const { showToast } = useToast();

  const myData = [
    {
      id: "CONTRACTOR",
      name: "İşçi",
    },
    {
      id: "CUSTOMER",
      name: "Müştəri",
    },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        city: user?.city,
        zip_code: user?.zip_code,
        role_id: user?.role_id,
        avatar: user?.avatar_url,
        about: user?.about,
        type: user?.type,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setFormData((prev) => ({ ...prev, role_id: selectedOption }));
    }
  };

  const handleTypeChange = (selectedType) => {
    if (selectedType) {
      setFormData((prevState) => ({
        ...prevState,
        type: selectedType,
      }));
    }
  };

  const handleSubmit = () => {
    updateUser({ id: user.id, data: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("İstifadəçi məlumatları uğurla yeniləndi", "success");
      closeModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("İstifadəçi məlumatları yenilənə bilmədi", "error");
    }
  }, [isError]);

  return (
    <div
      className={`w-full h-screen overflow-y-auto bg-black/70 ${
        showModal ? "flex" : "hidden"
      } items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0 p-5`}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Sürətli yeniləmə</h1>
        <Alert value="İstifadəçi məlumatının yenilənməsi" type="primary" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <Input
            label="Ad və soyad"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ad və soyad daxil edin"
          />
          <Input
            label="Elektron poçt"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-poçt daxil edin"
          />
          <Input
            label="Telefon nömrəsi"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Telefon nömrəsi daxil edin"
          />
          <Input
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Addresi daxil edin"
          />
          <Input
            label="Haqqında"
            type="text"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Haqqında məlumat daxil et"
          />
          <Input
            label="Poçt kodu"
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleInputChange}
            placeholder="Poçt kodu daxil edin"
          />
          <Input
            label="Şifrə"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Yeni şifrəni daxil edin"
          />
          <Select
            name="role_id"
            label="Rol"
            column
            absolute
            value={roles.find((role) => role.id === formData.role_id) || null}
            onChange={handleSelectChange}
            options={roles}
          />
          <Input
            label="Şəkil"
            type="file"
            name="avatar"
            onChange={handleFileChange}
          />
          <Select
            name="type"
            options={myData}
            value={formData.type}
            column
            onChange={handleTypeChange}
          />
        </div>
        <div className="flex justify-end gap-3">
          <CustomButton
            isLoading={isLoading}
            functionality={handleSubmit}
            value="Yenilə"
          />
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

QuickUpdateModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    zip_code: PropTypes.string,
    role_id: PropTypes.string,
    avatar_url: PropTypes.string,
    password: PropTypes.string,
    about: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default QuickUpdateModal;
