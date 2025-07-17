import Alert from "@/components/common/Alert";
import CustomButton from "@/components/common/CustomButton";
import Select from "@/components/common/Select";
import { useGetPositionsQuery } from "@/data/services/positionsService";
import { useGetUserQuery } from "@/data/services/usersService";
import PropTypes from "prop-types";
import { useState } from "react";

const SelectUserProject = ({ showModal, closeModal, onAddUser }) => {
  const { data: companyUsers = [], isError: usersError } = useGetUserQuery();
  const { data: positions = [], isError: positionError } =
    useGetPositionsQuery();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const resetSelections = () => {
    setSelectedUser(null);
    setSelectedPosition(null);
  };

  const handleAddUser = () => {
    if (selectedUser && selectedPosition) {
      onAddUser(selectedUser, selectedPosition);
      resetSelections();
      closeModal();
    }
  };

  const users = companyUsers?.users || [];
  const positionsList = positions || [];

  return (
    <div
      className={`w-full h-screen bg-black/70 ${
        showModal ? "flex" : "hidden"
      } items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0`}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[50%]">
        <h1 className="text-xl font-semibold">İstifadəçi əlavə edin</h1>
        {usersError && (
          <Alert type="error" value="İstifadəçiləri əldə etmək mümkün olmadı" />
        )}
        {positionError && (
          <Alert type="error" value="Pozisiyaları əldə etmək mümkün olmadı" />
        )}
        <Select
          label="İstifadəçi seçin"
          type="text"
          placeholder="İstifadəçini seçin"
          absolute
          column
          options={users.map((user) => ({ id: user.id, name: user.name }))}
          value={selectedUser ? selectedUser.id : ""}
          onChange={(id) => {
            const user = users.find((u) => u.id === id);
            setSelectedUser(user);
          }}
        />
        <Select
          label="Pozisiya adı"
          type="text"
          placeholder="Pozisiya əlavə edin"
          absolute
          column
          options={positionsList.map((position) => ({
            id: position.id,
            name: position.name,
          }))}
          value={selectedPosition ? selectedPosition.id : ""}
          onChange={(id) => {
            const position = positionsList.find((p) => p.id === id);
            setSelectedPosition(position);
          }}
        />
        <div className="flex justify-end gap-3">
          <CustomButton simple value="Seç" functionality={handleAddUser} />
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

SelectUserProject.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
};

export default SelectUserProject;
