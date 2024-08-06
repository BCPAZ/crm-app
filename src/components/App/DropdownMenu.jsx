import { Link } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import PropTypes from "prop-types";

const DropdownMenu = ({ navElement }) => {
  return (
    <div className="relative">
      <div
        className={
          "flex items-center gap-2 text-white text-sm font-semibold hover:bg-white/10 p-2 rounded-md group"
        }
      >
        <img src={navElement.icon} alt="" />
        <span>{navElement.title}</span>
        {
          navElement.elements && <button className="outline-none">
          <LuChevronDown />
        </button>
        }
      </div>
      <ul className="w-[254px] rounded-lg outline-none border-none absolute top-full left-0 shadow-lg bg-white p-2 overflow-hidden hidden">
        <div className="bg-green-900 h-[100px] w-[100px] rounded-full blur-[50px] absolute -top-[25%] -right-[10%]"></div>
        {navElement.elements
          ? navElement.elements.map((el, index) => (
              <li key={index}>
                <Link to={el.path} className="block p-2 text-gray-500 hover:bg-gray-200 rounded-md text-sm">
                  {el.label}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  navElement : PropTypes.shape({
    icon : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    elements : PropTypes.array
  })
}

export default DropdownMenu;
