import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col">
      <Link to={`/projects/${project.id}`} className="flex items-center justify-between gap-2 p-[22px] border-b-2 border-grey/20">
        <h1 className="text-md text-black font-medium">{project.name}</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-grey">
           #{project.code}
          </span>
        </div>
      </Link>
      <div></div>
    </div>
  );
};

ProjectCard.propTypes = {
  project : PropTypes.shape({
    id : PropTypes.string,
    code : PropTypes.string,
    name : PropTypes.string
  })
}

export default ProjectCard;
