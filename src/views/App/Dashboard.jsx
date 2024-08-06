import profile from "@/assets/icons/Dashboard/profile-2user.svg";
import tasks from "@/assets/icons/Dashboard/task-square.svg";
import mails from "@/assets/icons/Dashboard/messages-2.svg";
import unlimited from "@/assets/icons/Dashboard/unlimited.svg";
const Dashboard = () => {
  return (
    <section>
      <div className="siteContainer">
        <div className="mt-8 grid grid-cols-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-[22px] border-b-2 border-gray-300/50">
              <img src={profile} alt="" />
              <h1 className="text-md text-gray-400 font-medium">Projects</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
