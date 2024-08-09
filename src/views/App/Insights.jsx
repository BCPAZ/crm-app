import ChartArea from "@/components/App/Insights/ChartArea";
import Selectbox from "@/components/common/Selectbox";

const Insights = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="w-full grid grid-cols-5 place-items-center gap-3">
            <h1 className="text-lg font-semibold">Projects Overview</h1>
            <Selectbox />
            <Selectbox outline />
            <Selectbox outline />
            <h1 className="text-lg font-medium w-full">Total users : 20</h1>
          </div>
        </div>
      </div>
      <div className="siteContainer">
          <div className="w-full">
            <ChartArea />
          </div>
          <div>
            
          </div>
        </div>
    </section>
  );
};

export default Insights;
