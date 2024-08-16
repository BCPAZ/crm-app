import issues from "@/mocks/issues";
import { useParams } from "react-router-dom";
import moment from "moment";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
const IssueDetail = () => {
  const { id } = useParams();
  const issueDetail = issues.find((issue) => issue.id === parseInt(id));

  const renderStatus = (status) => {
    switch (status) {
      case "resolved":
        return (
          <span className="text-xs py-1 px-2  rounded bg-green-600/20 text-green-600 capitalize w-full">
            {status}
          </span>
        );
      case "pending":
        return (
          <span className="text-xs py-1 px-2 rounded bg-yellow-600/20 text-yellow-600 capitalize w-full">
            {status}
          </span>
        );
      default:
        return (
          <span className="text-xs py-1 px-2  rounded bg-gray-600/40 capitalize w-full">
            {status}
          </span>
        );
    }
  };
  return (
    <section className="w-full h-full py-5">
      <div className="siteContainer">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="max-h-[400px] h-full w-full overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover object-center"
              src={issueDetail.image}
              alt={issueDetail.title}
            />
          </div>
          <div className="flex flex-col relative">
            <span className="capitalize text-sm rounded-lg">
              {renderStatus(issueDetail.status)}
            </span>
            <h1 className="text-2xl font-semibold mt-5">{issueDetail.title}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {issueDetail.description}
            </p>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
              <div className="flex flex-col text-sm text-black font-semibold">
                <span className="text-gray-500">User: {issueDetail.user}</span>

                <span className="text-gray-500">
                  Assignee: {issueDetail.assignee}
                </span>
              </div>
              <div className="flex flex-col text-sm text-black font-semibold">
                <span className="text-gray-500">
                  Create time:{" "}
                  {moment(issueDetail.created_at).format("DD MMM YYYY")}
                </span>

                <span className="text-gray-500">
                  Check time:{" "}
                  {moment(issueDetail.checked_at).format("DD MMM YYYY")}
                </span>
              </div>
            </div>
            <div className="mt-7">
              <Select label="Select status" column />
            </div>
            <div className="mt-7 w-fit">
              <Button value="Save report" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueDetail;
