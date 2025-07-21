import PropTypes from "prop-types";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoFolder } from "react-icons/io5";
const AnimatedSidebarLink = ({ onClick, group }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="w-full flex items-center justify-between gap-2 p-2 bg-gray-100 rounded-lg"
      >
        <div className="flex-1 text-start w-full text-sm font-medium flex items-center gap-2">
          <IoFolder size={18} /> {group?.name}
        </div>
        <FiChevronDown
          className={`transition-transform duration-300 ${
            showDetail ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showDetail ? "max-h-full" : "max-h-0"
        }`}
        style={{ maxHeight: showDetail ? "200px" : "0px" }}
      >
        <div className="flex flex-col gap-1 mt-2">
          {group.projects.map((project, index) => (
            <span
              onClick={() => onClick(project)}
              key={index}
              className="text-sm cursor-pointer font-medium ml-2 hover:underline"
            >
              {index + 1}.{project?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

AnimatedSidebarLink.propTypes = {
  group: PropTypes.array,
  onClick: PropTypes.func,
};

export default AnimatedSidebarLink;
