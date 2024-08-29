import { Link } from "react-router-dom";
import moment from "moment";
import issues from "@/mocks/issues";
const IssueTable = () => {
  const renderStatus = (status) => {
    switch (status) {
      case "resolved":
        return (
          <span className="text-xs py-1 px-2 rounded bg-green-600/20 text-green-600 capitalize w-full">
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
          <span className="text-xs py-1 px-2 rounded bg-gray-600/40 capitalize w-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[40%]">
              Issues
            </th>
            <th className="text-sm font-medium w-[12%] text-gray-500">User</th>
            <th className="text-sm font-medium w-[12%] text-gray-500">
              Assignee
            </th>
            <th className="text-sm font-medium w-[12%] text-gray-500 rounded-e-lg">
              Date
            </th>
            <th className="text-sm font-medium w-[12%] text-gray-500 rounded-e-lg">
              Check
            </th>
            <th className="text-sm font-medium w-[12%] text-gray-500 rounded-e-lg">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          {issues.map((issue, index) => (
            <tr
              className="p-5 border-b hover:bg-gray-200/20 border-grey/20 w-full flex items-center justify-between gap-5 min-h-[76px]"
              key={index}
            >
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[40%]">
                <Link className="group flex items-center gap-4" to={`${issue.id}`}>
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={issue.image}
                    alt={issue.title}
                  />
                  <h3 className="text-sm text-secondary">{issue.title}</h3>
                </Link>
              </th>
              <td className="text-sm font-medium text-gray-500 w-[12%]">
                <Link className="text-sm text-secondary" to={`${issue.id}`}>
                  {issue.user.name} {/* Burada obje yerine ismi render edin */}
                </Link>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[12%]">
                <Link className="text-sm text-secondary" to={`${issue.id}`}>
                  {issue.assignee.name} {/* Burada obje yerine ismi render edin */}
                </Link>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[12%]">
                <div className="flex flex-col">
                  <h3 className="text-xs text-secondary">{moment(issue.created_at).format('DD MMM YYYY')}</h3>
                  <span className="text-xs text-gray-400">
                    {moment(issue.created_at).format('HH:mm')}
                  </span>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[12%]">
                <div className="flex flex-col">
                  <h3 className="text-xs text-secondary">
                    {moment(issue.checked_at).format('DD MMM YYYY')}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {moment(issue.checked_at).format('HH:mm')}
                  </span>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[12%]">
                {renderStatus(issue.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
