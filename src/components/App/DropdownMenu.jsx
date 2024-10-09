import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import PropTypes from "prop-types";

const DropdownMenu = ({ navElement }) => {
  const activeProject = useSelector((state) => state.project.project);

  const restrictedElements = ["Workflow", "Documents", "Field management", "Cost"];

  const isDisabled = restrictedElements.includes(navElement.title) && !activeProject;

  return (
    <div className="relative group">
      {navElement.path ? (
        <Link
          to={navElement.path}
          className={`flex items-center gap-2 text-white text-sm font-semibold p-2 rounded-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
          onClick={(e) => isDisabled && e.preventDefault()}
        >
          <img src={navElement.icon} alt="" />
          <span className="lg:block hidden">{navElement.title}</span>
          {navElement.elements && (
            <span className="outline-none flex items-center">
              <LuChevronDown />
            </span>
          )}
        </Link>
      ) : (
        <button
          className={`flex items-center gap-2 text-white text-sm font-semibold p-2 rounded-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
          disabled={isDisabled}
        >
          <img src={navElement.icon} alt="" />
          <span className="lg:block hidden">{navElement.title}</span>
          {navElement.elements && (
            <span className="outline-none flex items-center">
              <LuChevronDown />
            </span>
          )}
        </button>
      )}
      {navElement.elements && !isDisabled && (
        <ul className="w-[200px] group-hover:block hidden rounded-lg outline-none border-none absolute top-[100%] left-0 shadow-lg bg-white p-2 overflow-hidden z-30">
          <div className="bg-secondary h-[100px] w-[100px] rounded-full blur-[50px] absolute -top-[25%] -right-[10%]"></div>
          {navElement.elements.map((el, index) => (
            <li key={index}>
              <Link
                to={el.path}
                className="block p-2 text-gray-500 hover:bg-gray-200 rounded-md text-sm"
              >
                {el.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  navElement: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default DropdownMenu;
