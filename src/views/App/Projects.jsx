import tasks from "@/mocks/tasks";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <section>
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold mt-10">Projects</h1>
        <div className="grid grid-cols-3 gap-3 mt-10">
          {
            tasks.map((task,index) => (
              <Link to={`${task.id}`} className="p-4 rounded-lg border border-grey/20 flex flex-col gap-2" key={index}>
                  <h1 className="text-xl font-semibold">{task.project}</h1>
              </Link>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Projects