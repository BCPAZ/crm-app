import tasks from "@/mocks/tasks";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { LuMoreVertical, LuEye } from "react-icons/lu";
import { IoAddSharp } from "react-icons/io5";
import moment from "moment";
const Projects = () => {
  return (
    <section>
      <div className="siteContainer">
        <div className="flex items-center justify-between mt-10">
          <h1 className="text-2xl font-semibold ">Projects</h1>
          <Link
            to={"/create-new-user"}
            className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2"
          >
            <IoAddSharp size={18} />
            Create project
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-10">
          {tasks.map((task, index) => (
            <div
              className="relative p-6 rounded-lg border border-grey/20 flex flex-col gap-2"
              key={index}
            >
              <button
                type="button"
                className="absolute top-5 right-5 hover:bg-grey/20 p-1 rounded"
              >
                <LuMoreVertical size={20} />
              </button>
              <div className="flex flex-col gap-1 py-5 border-b border-grey/20">
                <h1 className="text-xl font-semibold">{task.project}</h1>
                <span className="text-xs font-base text-gray-400">
                  Posted at : {moment(task.created_at).fromNow()}
                </span>
                <p className="line-clamp-2 text-sm mt-3">{task.projectDesc}</p>
              </div>
              <div className="flex items-center justify-between gap-2 mt-3">
                <Link
                  className="text-white bg-secondary font-medium rounded-lg py-3 px-4 text-sm w-fit flex items-center gap-2"
                  to={`${task.id}`}
                >
                  <LuEye size={18} />
                  See more
                </Link>
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <FaUsers color="#00A76F" size={16} />
                  {task.members} members
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
