import Chart from "./Chart";
import insightsData from '@/mocks/insights';

const ChartArea = () => {
  const sentEmails = insightsData.emails.filter(email => email.type === "sent");
  const receivedEmails = insightsData.emails.filter(email => email.type === "received");

  const sentDocuments = insightsData.documents.filter(document => document.type === "sent");
  const receivedDocuments = insightsData.documents.filter(document => document.type === "received");

  const sentEmailCounts = sentEmails.reduce((acc, email) => {
    const date = email.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const receivedEmailCounts = receivedEmails.reduce((acc, email) => {
    const date = email.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const sentDocumentCounts = sentDocuments.reduce((acc, document) => {
    const date = document.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const receivedDocumentCounts = receivedDocuments.reduce((acc, document) => {
    const date = document.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const formatChartData = (data) => {
    return Object.keys(data).map(date => ({
      date,
      count: data[date]
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Emails Sent</h6>
        <div className="mt-6 w-full">
          <Chart data={formatChartData(sentEmailCounts)} title="Emails Sent" />
        </div>
      </div>
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Emails Received</h6>
        <div className="mt-6">
          <Chart data={formatChartData(receivedEmailCounts)} title="Emails Received" />
        </div>
      </div>
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Documents Sent</h6>
        <div className="mt-6">
          <Chart data={formatChartData(sentDocumentCounts)} title="Documents Sent" />
        </div>
      </div>
      <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
        <h6 className="w-full font-medium text-lg">Documents Received</h6>
        <div className="mt-6">
          <Chart data={formatChartData(receivedDocumentCounts)} title="Documents Received" />
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
