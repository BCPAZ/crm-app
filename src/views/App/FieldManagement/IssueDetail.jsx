import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useGetIssueDetailQuery, useResolveIssueMutation } from "@/data/services/fieldService";
import Spinner from "@/components/common/Spinner";
import { useEffect} from "react";
import useToast from "@/hooks/useToast";
import ConfirmationModal from "@/components/common/ConfirmationModal";

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: issueDetail, isLoading, isError } = useGetIssueDetailQuery(id);

  const [resolveIssue, { 
    isLoading: resolveLoading,
    isSuccess: resolveSuccess,
    isError: resolveError,
  }] = useResolveIssueMutation();

  const handleResolveStatus = () => {
    resolveIssue(id);
  };

  useEffect(() => {
    if (resolveSuccess) {
      showToast('Uğurlu şəkildə tamamlandı', 'success');
      navigate('/issues');
    }
  }, [resolveSuccess, navigate, showToast]);

  useEffect(() => {
    if (resolveError) {
      showToast('Təsdiqlənə bilmədi', 'error');
    }
  }, [resolveError, showToast]);

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
  if (isError) return <div>Error loading issue details.</div>;

  return (
    <section className="w-full h-full py-10">
      <div className="siteContainer">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="max-h-[400px] h-full w-full overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover object-center"
              src={issueDetail.files[0]?.path || "/default-image.png"}
              alt={issueDetail.name}
            />
          </div>
          <div className="flex flex-col relative">
            <span className="capitalize text-sm rounded-lg">
              {renderStatus(issueDetail.status)}
            </span>
            <h1 className="text-2xl font-semibold mt-5">{issueDetail.name}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {issueDetail.description}
            </p>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
              <div className="flex flex-col text-sm text-black font-semibold">
                <span className="text-gray-500">
                  User: {issueDetail.creator.name}
                </span>
                <span className="text-gray-500">
                  Assignee: {issueDetail.assignee.name}
                </span>
              </div>
              <div className="flex flex-col text-sm text-black font-semibold">
                <span className="text-gray-500">
                  Create time:{" "}
                  {moment(issueDetail.created_at).format("DD MMM YYYY")}
                </span>
                <span className="text-gray-500">
                  Check time:{" "}
                  {moment(issueDetail.updated_at).format("DD MMM YYYY")}
                </span>
              </div>
            </div>
            <div className="mt-7 w-fit">
              <button onClick={handleResolveStatus} className="py-3 px-5 text-sm outline-none font-semibold bg-black text-white rounded-lg flex items-center justify-center gap-2">
                {resolveLoading && <Spinner />}Tamamlayın
              </button>
            </div>
          </div>
        </div>
        <ConfirmationModal />
      </div>
    </section>
  );
};

export default IssueDetail;
