import UserList from "@/components/App/Security/UserList";
import CustomButton from "@/components/common/CustomButton";

const Users = () => {
  return (
    <section className="w-full h-full p-5">
      <div className="mx-auto w-full">
        <h1 className="text-2xl font-semibold">Users list</h1>
        <div className="mt-10 w-full">
          <UserList />
        </div>
        <div className="mt-5 flex justify-end">
          <CustomButton value="Create User"  to={'/create-new-user'} type="link"/>
        </div>
      </div>
    </section>
  );
};

export default Users;
