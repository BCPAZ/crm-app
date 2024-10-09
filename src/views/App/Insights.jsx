import ChartArea from "@/components/App/Insights/ChartArea";
import WorkflowReport from "@/components/App/Insights/WorkflowReport";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import { useState } from "react";

const Insights = () => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="w-full flex items-center gap-10">
            <h1 className="text-lg font-semibold">Ümumi statistika</h1>
            <CustomDatePicker label="Başlanğıc Tarixi" value={startDate} onChange={setStartDate} />
            <CustomDatePicker label="Bitmə Tarixi" value={endDate} onChange={setEndDate} />
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <div className="py-10">
          <div className="w-full">
            <ChartArea startDate={startDate} endDate={endDate}/>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 mt-5">
            <WorkflowReport startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
