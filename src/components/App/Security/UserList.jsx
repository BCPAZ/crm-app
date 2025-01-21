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
import ReactPaginate from "react-paginate";
import { Toaster } from "react-hot-toast";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useGetCompanyUsersQuery({
    page,
    name: searchTerm
  });
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

  const changeType = (type) => {
    if(type === "CUSTOMER"){
      return "Müştəri"
    }else{
      return "İşçi"
    }
  }

  return (
    <div className="w-full rounded-lg shadow-xl bg-white">
      <Toaster />
      <div className="text-sm font-medium text-gray-500 w-full">
        <ConfirmationModal
          showConfirmation={showConfirmation}
          closeConfirmationModal={closeConfirmationModal}
          handleDelete={handleDeleteUser}
          title="İstifadəçini silmək istədiyinizdən əminsinizmi?"
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          <div className="w-full">
            <Searchbar simple onChange={handleSearch} />
          </div>
        </div>
        <div className="flex flex-col w-full p-5">
          <h3>{users.length} nəticə tapıldı</h3>
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
                  <th className="text-sm font-medium w-[12%] text-gray-500">Tip</th>
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
                  <div className="p-5 text-center w-full">Heç bir istifadəçi tapılmadı</div>
                ) : (
                  users.map((user, index) => (
                    <div className="group" key={index}>
                      <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]">
                        <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
                          <div className="flex items-center gap-4">
                            <img
                              className="w-[40px] h-[40px] rounded-full"
                              src={user?.avatar_url || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
                              alt={user.name}
                            />
                            <div className="flex flex-col">
                              <div className="text-sm text-secondary hover:underline">{user.name}</div>
                              <span className="text-xs text-gray-400">{user.email || 'Boşdur'}</span>
                            </div>
                          </div>
                        </th>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <div className="flex flex-col">
                            <h3 className="text-xs text-secondary">{changeType(user?.type)}</h3>
                          </div>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <div className="flex flex-col">
                            <h3 className="text-xs text-secondary">{user.phone_number || 'Boşdur'}</h3>
                          </div>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <div className="flex flex-col">
                            <h3 className="text-xs text-secondary">{user.address || 'Boşdur'}</h3>
                          </div>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <span className="text-xs text-secondary">{user.city || 'Boşdur'}</span>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          {user.zip_code || 'Boşdur'}
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
        <div className="mt-5 flex justify-end px-5">
          <ReactPaginate
            previousLabel={"‹"}
            nextLabel={"›"}
            breakLabel={"..."}
            pageCount={meta?.last_page}
            onPageChange={(selectedItem) => handlePageChange(selectedItem.selected + 1)}
            containerClassName="flex items-center justify-center space-x-2 py-4"
            pageClassName="rounded border border-gray-300 px-3 py-1 hover:bg-blue-100 transition duration-300"
            pageLinkClassName="text-secondary hover:text-blue-900"
            previousClassName="rounded border border-gray-300 px-3 py-1 hover:bg-blue-100 transition duration-300"
            nextClassName="rounded border border-gray-300 px-3 py-1 hover:bg-blue-100 transition duration-300"
            activeClassName="bg-blue-200"
            breakClassName="px-3 py-1 text-gray-500"
          />
        </div>
        <QuickUpdateModal showModal={showModal} closeModal={closeModal} user={selectedUser} />
      </div>
    </div>
  );
};

export default UserList;
