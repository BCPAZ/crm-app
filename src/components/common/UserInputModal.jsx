import { useState } from "react";
import Input from "@/components/common/Input";
import PropTypes from "prop-types";
const UserInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(userData);
    onClose();
    setUserData({
      name : '',
      email : '',
      address : '',
      phone : ''
    })
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">
          İstifadəçi məlumatlarını daxil edin
        </h2>
        <div className="flex flex-col gap-5 mt-7">
          <Input
            label="Name"
            placeholder="Enter the name"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            label="Email"
            placeholder="Enter the email"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <Input
            label="Address"
            placeholder="Enter the address"
            value={userData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
          <Input
            label="Phone"
            placeholder="Enter the phone number"
            value={userData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-400/40 text-black text-sm rounded-lg"
          >
            Ləğv et
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            Təsdiqlə
          </button>
        </div>
      </div>
    </div>
  );
};

UserInputModal.propTypes = {
  isOpen : PropTypes.bool,
  onClose : PropTypes.func,
  onSubmit : PropTypes.func
}

export default UserInputModal;
