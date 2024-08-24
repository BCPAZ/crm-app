import { FaPen } from "react-icons/fa";
import mailLinks from "@/utils/mailLinks";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect } from "react";

const MailNavSidebar = ({
  openMailModal,
  filterType,
  setFilterType,
  toggleSidebar,
  sidebarRef,
  closeNavSidebar,
}) => {
  useEffect(() => {
    closeNavSidebar();
  }, []);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    closeNavSidebar();
  };

  return (
    <aside
      ref={sidebarRef}
      className={`md:hidden flex flex-col p-3 sm:w-1/2 w-full fixed h-full top-0 ${
        toggleSidebar ? "left-0" : "-left-full"
      } transition-all duration-300 bg-white z-20 border-r border-gray-300/40`}
    >
      <button
        onClick={openMailModal}
        className="text-md bg-black p-3 rounded-lg text-white font-bold flex items-center justify-center gap-2"
      >
        <FaPen size={20} />
        <span className="text-sm">Compose</span>
      </button>
      <div className="py-3 flex flex-col gap-2 h-full">
        {mailLinks.map((link, index) => (
          <button
            className={clsx("flex items-center w-full gap-4 p-2 rounded-lg", {
              "bg-gray-300": filterType === link.type,
              "bg-transparent": filterType !== link.type,
            })}
            key={index}
            onClick={() => handleFilterTypeChange(link.type)} // Burada handleFilterTypeChange istifadə olunur
          >
            <img src={link.icon} alt={link.label} />
            <span
              className={clsx("text-md font-medium", {
                "text-black": filterType === link.type,
                "text-gray-500": filterType !== link.type,
              })}
            >
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

MailNavSidebar.propTypes = {
  openMailModal: PropTypes.func,
  filterType: PropTypes.string,
  setFilterType: PropTypes.func,
  toggleSidebar: PropTypes.bool,
  sidebarRef: PropTypes.any,
  closeNavSidebar: PropTypes.func
};

export default MailNavSidebar;
