import CheckboxElement from "@/components/common/CheckboxElement";
import usersData from "@/mocks/userData";
import { GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { LuMoreVertical } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";


const UserTable = () => {
  const renderStatus = (status) => {
    switch(status) {
      case 'banned':
        return <span className="text-xs py-1 px-2  rounded bg-red-600/20 text-red-600 capitalize w-full">{status}</span>;
      case 'active':
        return <span className="text-xs py-1 px-2  rounded bg-green-600/20 text-green-600 capitalize w-full">{status}</span>;
      case 'pending':
        return <span className="text-xs py-1 px-2 rounded bg-yellow-600/20 text-yellow-600 capitalize w-full">{status}</span>;
      default:
        return <span className="text-xs py-1 px-2 rounded bg-gray-600/20 capitalize w-full">{status}</span>;
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
              <CheckboxElement />
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
          {usersData.map((user, index) => (
            <div className="group" key={index}>
              <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed  w-full flex items-center justify-between gap-5 min-h-[76px]">
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
                  <CheckboxElement />
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <div className="flex flex-col">
                      <Link to={`${user.id}`} className="text-sm text-secondary hover:underline">{user.name}</Link>
                      <span className="text-xs text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </th>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {user.phone}
                    </h3>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {user.company}
                    </h3>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <span className="text-xs text-secondary">
                    {user.role}
                  </span>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  {renderStatus(user.status)}
                </td>
                <td className="text-sm font-medium text-gray-500 w-[5%] flex items-center gap-2">
                  <button className="outline-none border-none" type="button"><MdModeEditOutline size={20}/></button>
                  <button className="outline-none border-none" type="button"><LuMoreVertical size={20}/></button>
                </td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
