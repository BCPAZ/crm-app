import Searchbar from "@/components/common/Searchbar";
import companyUsers from "@/mocks/companyUsers";
import { useState } from "react";

const UserSelectModal = ({ modal, closeUserModal }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (user) => {
    setSelected(user);
    console.log(user);
    closeUserModal();
  };

  if (!modal) return null;

  return (
    <section className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-full z-30">
      <div className="bg-white rounded-lg shadow-lg w-[444px] min-h-[420px]">
        <div className="p-6">
          <h6 className="text-lg font-semibold">User</h6>
          <div className="w-full mt-6">
            <Searchbar simple />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 p-2 overflow-y-auto">
          {companyUsers.map((user, index) => (
            <div
              onClick={() => handleSelect(user)}
              key={index}
              className={`p-6 hover:bg-grey/10 cursor-pointer rounded-lg flex flex-col gap-3 ${selected === user ? 'bg-gray-200' : ''}`}
            >
              <h3 className="text-md font-semibold">{user.name}</h3>
              <span className="text-sm text-green-500 font-medium">{user.company}</span>
              <span className="text-sm text-gray-500">{user.mail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserSelectModal;
