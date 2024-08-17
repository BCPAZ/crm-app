import UserList from "@/components/App/Security/UserList";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Users = () => {
  return (
    <section className="w-full h-full p-5">
      <div className="mx-auto w-full">
        <h1 className="text-2xl font-semibold">Users list</h1>
        <div className="mt-10 w-full">
          <UserList />
        </div>
        <div className="mt-5 flex justify-end">
          <Link to={'/create-user'} className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2">
            <IoAddSharp size={18} />
            Create Role
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Users;
