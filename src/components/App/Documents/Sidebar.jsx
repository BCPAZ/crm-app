import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
const Sidebar = ({links}) => {
  return (
    <aside className="p-3 border-r border-gray-300/30 w-full h-full">
      <div className="flex flex-col">
        <nav className="flex flex-col mt-5 gap-4">
          {
            links.map((link,index) => (
              <NavLink to={link.path} key={index} className={({isActive}) => clsx('p-3 text-sm rounded-lg', {
                'bg-secondary text-white font-semibold' : isActive,
                'bg-transparent text-secondary font-medium' : !isActive
              })}>{link.label}</NavLink>
            ))
          }
        </nav>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  links : PropTypes.array
}

export default Sidebar