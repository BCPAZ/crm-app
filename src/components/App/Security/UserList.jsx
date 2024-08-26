import Searchbar from "@/components/common/Searchbar";
import { GoArrowDown } from "react-icons/go";
import { LuMoreVertical } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";
import QuickUpdateModal from "./QuickUpdateModal";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import { useGetCompanyUsersQuery } from "@/data/services/usersService";
import Spinner from "@/components/common/Spinner";

const UserList = () => {
  const {data, isLoading, isError} = useGetCompanyUsersQuery();
  const [showModal, setShowModal] = useState(false);
  const {showToast} = useToast();

  const users = data?.users || [];
  // const meta = data?.meta || {};

  const handleModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false)
  }


  useEffect(() => {
    if(isError){
      showToast()
    }
  },[isError])


  return (
    <div className="w-full rounded-lg shadow-xl bg-white">
      <div className="text-sm font-medium text-gray-500 w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          <div className="w-full">
            <Searchbar simple />
          </div>
        </div>
        <div className="flex flex-col w-full p-5">
          <h3>8 results found</h3>
        </div>
        <div className="w-full overflow-x-auto">
        <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
              <span className="flex items-center gap-2">
                User <GoArrowDown />
              </span>
            </th>
            <th className="text-sm font-medium w-[12%] text-gray-500">
              Phone Number
            </th>
            <th className="text-sm font-medium w-[12%] text-gray-500">Company</th>
            <th className="text-sm font-medium w-[12%] text-gray-500">Role</th>
            <th className="text-sm font-medium w-[12%] text-gray-500 rounded-e-lg">
              Status
            </th>
            <th className="text-sm font-medium w-[5%] text-gray-500 rounded-e-lg">
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          <div className="py-4 flex items-center justify-center w-full">
          {isLoading && <Spinner />}

          </div>
          {users.map((user, index) => (
            <div className="group" key={index}>
              <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed  w-full flex items-center justify-between gap-5 min-h-[76px]">
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={user.avatar_url}
                      alt={user.name}
                    />
                    <div className="flex flex-col">
                      <div className="text-sm text-secondary hover:underline">{user.name}</div>
                      <span className="text-xs text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </th>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {user.phone_number}
                    </h3>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {user.address}
                    </h3>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <span className="text-xs text-secondary">
                    {user.city}
                  </span>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  {user.zip_code}
                </td>
                <td className="text-sm font-medium text-gray-500 w-[5%] flex items-center gap-2">
                  <button onClick={handleModal} className="outline-none border-none" type="button"><MdModeEditOutline size={20}/></button>
                  <button className="outline-none border-none" type="button"><LuMoreVertical size={20}/></button>
                </td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        <QuickUpdateModal showModal={showModal} closeModal={closeModal}/>
      </div>
    </div>
  );
};

export default UserList;