import { navigationLinks } from "@/utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { IoChevronUpSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { closeMobileNav } from "@/data/slices/siteSlice";

const MobileNav = () => {
  const [subMenu, setSubMenu] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.site.isOpen);

  const handleSubMenu = (index) => {
    if (subMenu === index) {
      setSubMenu(null);
    } else {
      setSubMenu(index);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCloseMenu = () => {
    dispatch(closeMobileNav());
  }

  return (
    <aside
      className={`fixed top-0 right-0 sm:w-[422px] w-full h-full p-5 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 py-5">
        <div className="bg-black w-[50px] h-[50px] flex items-center justify-center p-2 rounded-md select-none">
          <img src="https://bcp.az/img/logo.svg" alt="" />
        </div>
        <button onClick={handleCloseMenu} className="bg-grey/20 p-2 rounded-md">
          <MdOutlineClose size={24} />
        </button>
      </div>
      <nav className="py-3">
        <ul className="flex flex-col gap-3">
          {navigationLinks.map((link, index) => (
            <li className="select-none" key={index}>
              <div
                className="text-md font-medium group outline-none cursor-pointer flex items-center justify-between"
                onClick={() =>
                  link.elements ? handleSubMenu(index) : handleNavigation(link.path)
                }
              >
                {link.title}
                {link.elements && (
                  <span
                    className={`transition-transform duration-300 ${
                      subMenu === index ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <IoChevronUpSharp size={20} />
                  </span>
                )}
              </div>
              {link.elements && (
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out text-sm ${
                    subMenu === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-2 p-2">
                    {link.elements.map((element, idx) => (
                      <NavLink
                        className="outline-none select-none"
                        to={element.path}
                        key={idx}
                      >
                        {element.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MobileNav;
