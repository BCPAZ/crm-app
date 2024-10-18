import Searchbar from "@/components/common/Searchbar";
import { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "@/components/common/Spinner";
import { IoCloseSharp } from "react-icons/io5";

const UserSelectModal = ({
  modal,
  closeUserModal,
  options,
  isLoading,
  isError,
  onChange,
  returnIdOnly = false
}) => {
  const [selected, setSelected] = useState(null);

  // İstifadəçi seçimi funksiyası
  const handleSelect = (user) => {
    if (returnIdOnly) {
      onChange(user.id);
    } else {
      onChange(user);
    }
    closeUserModal();
  };

  if (!modal) return null;

  return (
    <section className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-full z-30">
      <div className="bg-white rounded-lg shadow-lg w-[444px] h-[420px] overflow-y-scroll">
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h6 className="text-lg font-semibold">Seçim edin</h6>
            <button onClick={closeUserModal}><IoCloseSharp size={20} /></button>
          </div>
          <div className="w-full mt-6">
            <Searchbar simple />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 p-2 overflow-y-auto">
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {isError && <div className="w-full h-full flex items-center justify-center font-medium text-sm">Heç bir istifadəçi tapılmadı</div>}
          {options?.map((user, index) => (
            <div
              onClick={() => handleSelect(user)}
              key={index}
              className={`p-6 hover:bg-grey/10 cursor-pointer rounded-lg flex flex-col gap-3 ${
                selected === user ? "bg-gray-200" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] overflow-hidden rounded-full border border-gray-300/50">
                  <img
                    className="w-full h-full object-contain"
                    src={user.image_url || 'https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg'}
                    alt=""
                  />
                </div>
                <h3 className="text-md font-semibold">{user.name}</h3>
              </div>
              {user?.mail && (
                <span className="text-sm text-gray-500">{user.mail}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

UserSelectModal.propTypes = {
  modal: PropTypes.bool,
  closeUserModal: PropTypes.func,
  options: PropTypes.array,
  isLoading: PropTypes.any,
  isError: PropTypes.any,
  onChange: PropTypes.func,
  returnIdOnly: PropTypes.bool,
};

export default UserSelectModal;
