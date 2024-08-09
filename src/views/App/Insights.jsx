import ChartArea from "@/components/App/Insights/ChartArea";
import WorkflowReport from "@/components/App/Insights/WorkflowReport";
import Selectbox from "@/components/common/Selectbox";

const Insights = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="w-full flex items-center gap-10">
            <h1 className="text-lg font-semibold">Projects Overview</h1>
            <Selectbox />
            <Selectbox outline />
            <Selectbox outline />
            <h1 className="text-md font-medium">Total users : 20</h1>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <div className="py-10">
          <div className="w-full">
            <ChartArea />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 mt-5">
            <WorkflowReport />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
