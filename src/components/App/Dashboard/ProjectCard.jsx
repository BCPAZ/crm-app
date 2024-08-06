const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-2 p-[22px] border-b-2 border-grey/20">
        <h1 className="text-md text-black font-medium">{project.name}</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-grey">
            {project.status ? "Joined" : "Denied"}
          </span>
          <div className="flex items-center">
            {project.members
              .map((member, index) => (
                <img src={member.img} key={index} alt="" />
              ))
              .slice(0, 3)}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProjectCard;
