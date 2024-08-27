import Searchbar from "@/components/common/Searchbar";
import { GoArrowDown } from "react-icons/go";
import { HiMiniTrash } from "react-icons/hi2";
import { MdModeEditOutline } from "react-icons/md";
import QuickUpdateModal from "./QuickUpdateModal";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import {
  useGetCompanyUsersQuery,
  useDeleteUserMutation,
} from "@/data/services/usersService";
import Spinner from "@/components/common/Spinner";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import Pagination from "@/components/common/Pagination";
import { Toaster } from "react-hot-toast";

const UserList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetCompanyUsersQuery({ page });
  const [deleteUser, { isSuccess: userSuccess, isError: userError }] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { showToast } = useToast();

  const users = data?.users || [];
  const meta = data?.meta || {};

  const openConfirmationModal = (id) => {
    setSelectedUserId(id);
    setShowConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setSelectedUserId(null);
    setShowConfirmation(false);
  };

  const handleDeleteUser = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId);
      closeConfirmationModal();
    }
  };

  const handleModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (userError) {
      showToast("İstifadəçi silinən zaman xəta baş verdi", "error");
    }
  }, [userError]);

  useEffect(() => {
    if (userSuccess) {
      showToast("İstifadəçi uğurlu şəkildə silindi", "success");
    }
  }, [userSuccess]);

  return (
    <div className="w-full rounded-lg shadow-xl bg-white">
      <Toaster />
      <div className="text-sm font-medium text-gray-500 w-full">
        <ConfirmationModal
          showConfirmation={showConfirmation}
          closeConfirmationModal={closeConfirmationModal}
          handleDelete={handleDeleteUser}
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          <div className="w-full">
            <Searchbar simple />
          </div>
        </div>
        <div className="flex flex-col w-full p-5">
          <h3>{data ? `${data.users.length} results found` : 'Loading...'}</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm min-w-[1200px]">
              <thead className="bg-gray-300/30 w-full rounded-lg text-left">
                <tr className="p-5 w-full flex items-center justify-between gap-5">
                  <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
                    <span className="flex items-center gap-2">
                      İstifadəçilər <GoArrowDown />
                    </span>
                  </th>
                  <th className="text-sm font-medium w-[12%] text-gray-500">Telefon nömrəsi</th>
                  <th className="text-sm font-medium w-[12%] text-gray-500">Adres</th>
                  <th className="text-sm font-medium w-[12%] text-gray-500">Şəhər</th>
                  <th className="text-sm font-medium w-[12%] text-gray-500 rounded-e-lg">Poçt</th>
                  <th className="text-sm font-medium w-[5%] text-gray-500 rounded-e-lg"></th>
                </tr>
              </thead>
              <tbody className="w-full flex flex-col text-left">
                <div className="py-4 flex items-center justify-center w-full">
                  {isLoading && <Spinner />}
                </div>
                {isError || users.length === 0 ? (
                  <div className="p-5 text-center w-full">Hec bir istifadəçi tapılmadı</div>
                ) : (
                  users.map((user, index) => (
                    <div className="group" key={index}>
                      <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]">
                        <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
                          <div className="flex items-center gap-4">
                            <img
                              className="w-[40px] h-[40px] rounded-full"
                              src={user.avatar_url}
                              alt={user.name}
                            />
                            <div className="flex flex-col">
                              <div className="text-sm text-secondary hover:underline">{user.name}</div>
                              <span className="text-xs text-gray-400">{user.email}</span>
                            </div>
                          </div>
                        </th>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <div className="flex flex-col">
                            <h3 className="text-xs text-secondary">{user.phone_number}</h3>
                          </div>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <div className="flex flex-col">
                            <h3 className="text-xs text-secondary">{user.address}</h3>
                          </div>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <span className="text-xs text-secondary">{user.city}</span>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          {user.zip_code}
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[5%] flex items-center gap-2">
                          <button
                            onClick={() => handleModal(user)}
                            className="outline-none border-none p-1 hover:bg-blue-600/40 hover:text-blue-600 rounded-lg"
                            type="button"
                          >
                            <MdModeEditOutline size={20} />
                          </button>
                          <button
                            onClick={() => openConfirmationModal(user.id)}
                            className="outline-none border-none hover:bg-red-600/40 hover:text-red-600 p-1 rounded-lg"
                            type="button"
                          >
                            <HiMiniTrash size={20} />
                          </button>
                        </td>
                      </tr>
                    </div>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination meta={meta} onPageChange={handlePageChange} />
        <QuickUpdateModal showModal={showModal} closeModal={closeModal} user={selectedUser} />
      </div>
    </div>
  );
};

export default UserList;
