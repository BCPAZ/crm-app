import Searchbar from "@/components/common/Searchbar";
import Select from "@/components/common/Select";
import Tabs from "@/components/common/Tabs";
import UserTable from "./UserTable";

const UserList = () => {
  return (
    <div className="w-full rounded-lg shadow-xl bg-white">
      <div className="text-sm font-medium text-gray-500 w-full">
        <Tabs />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          <div className="w-full">
            <Select column />
          </div>
          <div className="lg:col-span-3">
            <Searchbar simple />
          </div>
        </div>
        <div className="flex flex-col w-full p-5">
          <h3>8 results found</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserList;