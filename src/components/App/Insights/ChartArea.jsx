import {
  useReveicedMailsQuery,
  useSendedDocumentsQuery,
  useSendedMailsQuery,
} from "@/data/services/insightService";
import Chart from "./Chart";
import moment from "moment";

const ChartArea = ({ startDate, endDate }) => {
  const { data: sendedMails } = useSendedMailsQuery({
    start_date: moment(startDate).format("YYYY-MM-DD"),
    end_date: moment(endDate).format("YYYY-MM-DD"),
  });

  const { data: receivedMails } = useReveicedMailsQuery({
    start_date: moment(startDate).format("YYYY-MM-DD"),
    end_date: moment(endDate).format("YYYY-MM-DD"),
  });

  const { data: sendedDocuments } = useSendedDocumentsQuery({
    start_date: moment(startDate).format("YYYY-MM-DD"),
    end_date: moment(endDate).format("YYYY-MM-DD"),
  });

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Göndərilən Mail sayı</h6>
        <div className="mt-6 w-full">
          <Chart data={sendedMails || {}} title="Emails Sent" />
        </div>
      </div>
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Qəbuledilən Mail sayı</h6>
        <div className="mt-6">
          <Chart data={receivedMails || {}} title="Emails Sent" />
        </div>
      </div>
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Göndərilən sənəd sayı</h6>
        <div className="mt-6">
          <Chart data={sendedDocuments || {}} title="Document Sent" />
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
