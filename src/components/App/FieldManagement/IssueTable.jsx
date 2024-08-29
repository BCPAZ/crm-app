import { Link } from "react-router-dom";
import moment from "moment";
import { useGetAllIssuesQuery } from "@/data/services/fieldService";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

const IssueTable = () => {
  const [page, setPage] = useState(1);

  const { data: allIssues, isLoading, isError } = useGetAllIssuesQuery(page);
  
  const issues = allIssues?.issues || [];
  const meta = allIssues?.meta || {};

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "RESOLVED":
        return (
          <span className="text-xs py-1 px-2 rounded bg-green-600/20 text-green-600 capitalize w-full">
            {status}
          </span>
        );
      case "PENDING":
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading issues.</div>;

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
          {issues.length > 0 ? (
            issues.map((issue) => (
              <tr
                className="p-5 border-b hover:bg-gray-200/20 border-grey/20 w-full flex items-center justify-between gap-5 min-h-[76px]"
                key={issue.id}
              >
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[40%]">
                  <Link className="group flex items-center gap-4" to={`${issue.id}`}>
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={issue.files.length > 0 ? issue.files[0].path : '/default-image.png'}
                      alt={issue.name}
                    />
                    <h3 className="text-sm text-secondary">{issue.name}</h3>
                  </Link>
                </th>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <Link className="text-sm text-secondary" to={`${issue.id}`}>
                    {issue.creator?.name || 'Unknown'}
                  </Link>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <Link className="text-sm text-secondary" to={`${issue.id}`}>
                    {issue.assignee?.name || 'Unknown'}
                  </Link>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {moment(issue.created_at).format('DD MMM YYYY')}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {moment(issue.created_at).format('HH:mm')}
                    </span>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {issue.updated_at ? moment(issue.updated_at).format('DD MMM YYYY') : 'N/A'}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {issue.updated_at ? moment(issue.updated_at).format('HH:mm') : 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[12%]">
                  {renderStatus(issue.status)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No issues found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination meta={meta} onPageChange={handlePageChange} />
    </div>
  );
};

export default IssueTable;
