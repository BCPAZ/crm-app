import { useParams } from "react-router-dom";
import { useGetWorkflowDetailQuery } from "@/data/services/workflowsService";

const WorkflowDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetWorkflowDetailQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading workflow details.</div>;
  }

  const workflowData = data?.workflows || [];

  console.log(workflowData)

  if (workflowData.length === 0) {
    return <div className="p-12 w-full h-full flex items-center justify-center text-lg font-semibold">Hər hansı bir iş axını tapılmadı</div>;
  }

  return (
    <section className="w-full py-10">
      <div className="siteContainer">
        <h1 className="text-3xl font-semibold">Project Name</h1>
        <div className="mt-10 grid grid-cols-4 gap-2">
          {workflowData.map((workflow) => (
            <div key={workflow.id} className="p-4 border rounded-lg shadow">
              <div>
                <h2 className="text-lg font-semibold">Project</h2>
                <p>{workflow.project.name}</p>
                <p>Code: {workflow.project.code}</p>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Government</h2>
                <p>{workflow.government.name}</p>
                <img
                  src={workflow.government.image_url}
                  alt={workflow.government.name}
                  className="w-24 h-24 object-cover mt-2"
                />
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Document</h2>
                <p>Name: {workflow.document.name}</p>
                <p>Author: {workflow.document.author}</p>
                <p>Type: {workflow.document.type}</p>
                <a
                  href={workflow.document.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2"
                >
                  View Document
                </a>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Sender</h2>
                <p>Name: {workflow.sender.name}</p>
                <p>Email: {workflow.sender.email}</p>
                <p>Company: {workflow.sender.company.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowDetail;
