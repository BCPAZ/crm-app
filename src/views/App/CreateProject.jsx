import SelectUserProject from "@/components/App/Projects/SelectProjectUser";
import Button from "@/components/common/Button";
import CustomButton from "@/components/common/CustomButton";
import SecondInput from "@/components/common/SecondInput";
import { useCreateProjectMutation } from "@/data/services/projectService";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const CreateProject = () => {
  const [createProject, { isSuccess, isError, isLoading }] =
    useCreateProjectMutation();
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleAddUser = (user, position) => {
    if (selectedUsers.find((u) => u.user.id === user.id)) {
      showToast("Bu istifadəçi artıq seçilib.", "error");
      return;
    }

    setSelectedUsers([...selectedUsers, { user, position }]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((u) => u.user.id !== userId));
  };

  const handleSubmit = () => {
    createProject({
      name: projectName,
      code: projectCode,
      users: selectedUsers.map(({ user, position }) => ({
        id: user.id,
        position_id: position.id,
      })),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Proyekt uğurlu şəkildə yaradıldı", "success");
      setProjectName("");
      setProjectCode("");
      setSelectedUsers([]);
      navigate("/projects");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Proyekt yaradıla bilmədi", "error");
    }
  }, [isError]);

  return (
    <section className="w-full h-full py-10">
      <Toaster />
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Tapşırıq yarat</h1>
        <div className="flex flex-col gap-4 md:w-1/2 w-full h-full mt-10">
          <SecondInput
            column
            label="* Tapşırıq adı"
            placeholder="Tapşırıq adını daxil edin..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <SecondInput
            column
            label="* Tapşırıq kodu"
            placeholder="Tapşırıq kodunu daxil edin..."
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
          />
          <CustomButton functionality={openModal} value="İstifadəçi seç" />
          <SelectUserProject
            showModal={showModal}
            closeModal={closeModal}
            onAddUser={handleAddUser}
          />
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Seçilmiş İstifadəçilər:</h2>
            <ul className="flex items-center gap-2 mt-3">
              {selectedUsers.map(({ user, position }) => (
                <li
                  key={user.id}
                  className="p-2 rounded-lg bg-grey/10 flex items-center justify-between w-fit gap-5"
                >
                  <span>
                    {user.name} - {position.name}
                  </span>
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="text-red-500"
                  >
                    <IoMdClose />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-fit mt-3">
            <Button
              isLoading={isLoading}
              value="Tapşırıq yarat"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProject;
