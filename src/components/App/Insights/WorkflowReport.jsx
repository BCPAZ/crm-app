import { useGetWorkflowInsightsQuery } from "@/data/services/insightService";
import moment from "moment";

const WorkflowReport = ({startDate, endDate}) => {
  const { data: insight = {} } = useGetWorkflowInsightsQuery({
    start_date: moment(startDate).format("YYYY-MM-DD"),
    end_date: moment(endDate).format("YYYY-MM-DD"),
  });

  if (Object.keys(insight).length === 0) return null; 

  return (
    <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
      <h6 className="w-full font-medium text-lg">Workflows</h6>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">Completed</h6>
          <div className="text-sm font-medium">
            {insight?.completed} <span className="text-sm text-gray-400">(Total:{insight?.total})</span>
          </div>
        </div>
        <div className="bg-grey/20 relative w-full h-2 rounded-lg">
          <div className="absolute bg-[#00A76F] h-full rounded-lg transition-all duration-300" style={{width: `${(insight?.completed / insight?.total) * 100}%` }}></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">In progress</h6>
          <div className="text-sm font-medium">
            {insight?.progress} <span className="text-sm text-gray-400">(Total:{insight?.total})</span>
          </div>
        </div>
        <div className="bg-grey/20 relative w-full h-2 rounded-lg">
          <div className="absolute bg-[#00B8D9] h-full rounded-lg" style={{width: `${(insight?.progress / insight?.total) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowReport;
