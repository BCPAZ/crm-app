import profile from "@/assets/icons/Dashboard/profile-2user.svg";
import unlimited from "@/assets/icons/Dashboard/unlimited.svg";
import { activityTrack } from "@/mocks/dashboardData";
import ProjectCard from "@/components/App/Dashboard/ProjectCard";
import EmailCard from "@/components/App/Dashboard/EmailCard";
import ActivityCard from "@/components/App/Dashboard/ActivityCard";
import { useGetFiveMailQuery } from "@/data/services/mailService";
import { useGetLastTaskQuery } from "@/data/services/taskManagementService";
import { useGetProjectsQuery } from "@/data/services/projectService";
import TaskCard from "@/components/App/Dashboard/TaskCard";
import mailsIcon from "@/assets/icons/Dashboard/messages-2.svg";
import taskIcon from "@/assets/icons/Dashboard/task-square.svg";
const Dashboard = () => {
  const {data : mails = []} = useGetFiveMailQuery();
  const {data : tasks = []} = useGetLastTaskQuery();
  const {data} = useGetProjectsQuery();
  const projects = data?.projects || [];
  return (
    <section>
      <div className="siteContainer">
        <div className="mt-8 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-5 gap-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-[22px] border-b-2 border-grey/20">
              <img src={profile} alt="" />
              <h1 className="text-md text-gray-400 font-medium">Projects</h1>
            </div>
            <div className="flex flex-col gap-3">
              {
                projects.map((project, index) => (
                  <ProjectCard project={project} key={index} />
                ))
              }
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-[22px] border-b-2 border-grey/20">
              <img src={taskIcon} alt="" />
              <h1 className="text-md text-gray-400 font-medium">Tasks</h1>
            </div>
            <div className="flex flex-col gap-3">
              {
                tasks.map((task, index) => (
                  <TaskCard task={task} key={index} />
                ))
              }
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-[22px] border-b-2 border-grey/20">
              <img src={mailsIcon} alt="" />
              <h1 className="text-md text-gray-400 font-medium">Mails</h1>
            </div>
            <div className="flex flex-col gap-3">
              {
                mails.map((mail, index) => (
                  <EmailCard mail={mail} key={index} />
                ))
              }
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-[22px] border-b-2 border-grey/20">
              <img src={unlimited} alt="" />
              <h1 className="text-md text-gray-400 font-medium">Activity</h1>
            </div>
            <div className="flex flex-col gap-3">
              {
                activityTrack.map((activity, index) => (
                  <ActivityCard activity={activity} key={index} />
                )).slice(0,5)
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
