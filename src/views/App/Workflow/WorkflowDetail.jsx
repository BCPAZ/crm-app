import { translateStatus } from "@/utils/translateStatus";
import { useParams } from "react-router-dom";
import { useGetWorkflowDetailQuery, useUpdateWorkflowDetailMutation } from "@/data/services/workflowsService";
import { useState } from "react";
import moment from "moment";
import Spinner from "@/components/common/Spinner";
import StatusSelector from "@/components/common/StatusSelector";
import DenyModal from "@/components/App/Workflow/DenyModal";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";

const WorkflowDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const { data, isLoading, isError } = useGetWorkflowDetailQuery(id);
  const [updateStatus, { isError: updateError, isSuccess: updateSuccess }] = useUpdateWorkflowDetailMutation();
  const workflowData = data || {};

  const [selectedStatus, setSelectedStatus] = useState(workflowData?.status);
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { id: "APPROVED", name: "Tamamlanıb" },
    { id: "PENDING", name: "Gözlənilir" },
    { id: "REJECTED", name: "İmtina edilib" },
  ];

  useEffect(() => {
    setSelectedStatus(workflowData?.status)
  },[workflowData])

  const handleChangeStatus = (selected) => {
    setSelectedStatus(selected.id);

    if (selected.id === "REJECTED") {
      setIsModalOpen(true); // Modalı açın
    } else {
      updateStatus({ id, status: selected.id });
    }
  };

  const handleDeny = () => {
    updateStatus({
      id,
      status: "REJECTED",
      reason: reason || null,
    });
    setIsModalOpen(false);
    setReason("");
  };

  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };

  const selectedOption = options.find((option) => option.id === selectedStatus);

  useEffect(() => {
    if (updateSuccess) {
      showToast("Status uğurlu şəkildə dəyişdirildi", "success");
      setReason("");
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      showToast("Status dəyişdirilə bilmədi", "error");
    }
  }, [updateError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Məlumat yüklənən zaman xəta baş verdi.
      </div>
    );
  }

  if (!workflowData.id) {
    return (
      <div className="p-12 w-full h-full flex items-center justify-center text-lg font-semibold">
        Hər hansı bir iş axını tapılmadı
      </div>
    );
  }

  const createdAt = moment(workflowData.government.createdAt);
  const daysToAdd = workflowData.days;
  const dueDate = createdAt.clone().add(daysToAdd, "days");
  const remainingDays = dueDate.diff(moment(), "days");

  const renderRemainingDays = () => {
    if (remainingDays < 0) {
      return <span className="text-sm font-semibold text-red-600">Deadline vaxtı bitib!</span>;
    }
    return (
      <span className={`text-sm font-semibold ${remainingDays <= 2 ? "text-yellow-500" : "text-green-600"}`}>
        Qalan gün sayı: {remainingDays}
      </span>
    );
  };

  return (
    <section className="w-full py-10">
      <div className="siteContainer">
      <div className="flex md:flex-row flex-col md:items-center justify-between">
          {isModalOpen && (
            <DenyModal
            openModal={isModalOpen}
              reason={reason}
              onChange={handleChangeReason}
              onConfirm={handleDeny}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
          <h1 className="text-3xl font-semibold mb-2">{workflowData.project?.name || "Project Name"}</h1>
          <div className="flex md:flex-row flex-col md:items-center gap-5">
            {renderRemainingDays()}
            <div>{translateStatus(workflowData.status)}</div>
            <StatusSelector options={options} onChange={handleChangeStatus} value={selectedOption} />
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-10">
          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Proyekt</h2>
            <div>
              <p className="text-lg font-semibold">
                <span className="font-medium">Proyektin adı</span> -{" "}
                {workflowData.project.name}
              </p>
              <p className="text-lg font-semibold">
                <span className="font-medium">Proyektin kodu </span>-{" "}
                {workflowData.project.code}
              </p>
            </div>
          </div>

          {/* Government Details */}
          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Qurum</h2>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Qurum adı -</h2>
              <div className="flex items-center gap-2">
                <img
                  src={workflowData.government.image_url}
                  alt={workflowData.government.name}
                  className="w-[30px] h-[30px] rounded-full border border-black/20 object-cover"
                />
                <p className="text-lg font-semibold">
                  {workflowData.government.name}
                </p>
              </div>
            </div>
            <div className="text-sm font-semibold">
              Yaradılma tarixi:{" "}
              <span className="font-medium">
                {moment(workflowData.government.createdAt).format("YYYY-MM-DD")}
              </span>
            </div>
            {
              workflowData?.status && <div className="text-sm font-semibold">
              İmtina səbəbi:
              <p className="font-medium text-sm mt-3">
                {workflowData?.reason}
              </p>
            </div>
            }
          </div>

          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Sənəd</h2>
            <p className="text-md font-medium">
              <span className="font-semibold">Ad -</span>{" "}
              {workflowData.document.name}
            </p>
            <p className="text-md font-medium">
              <span className="font-semibold">Sənəd No -</span>{" "}
              {workflowData.document.document_no}
            </p>
            <p className="text-md font-medium">
              <span className="font-semibold">Müəllif adı -</span>{" "}
              {workflowData.document.author}
            </p>
            <p className="text-md font-medium">
              <span className="font-semibold">Sənəd tipi -</span>{" "}
              {workflowData.document.type}
            </p>
            <p className="text-md font-medium">
              <span className="font-semibold">Səhifə sayı -</span>{" "}
              {workflowData.document.page_size}
            </p>
            <a
              href={workflowData.document.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2"
            >
              Sənədə bax
            </a>
          </div>

          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Göndərən</h2>
            <p>
              <span className="font-semibold">Ad -</span>{" "}
              {workflowData.sender.name}
            </p>
            <p>
              <span className="font-semibold">E-poçt -</span>{" "}
              {workflowData.sender.email}
            </p>
            <p>
              <span className="font-semibold">Şirkət adı -</span>{" "}
              {workflowData.sender.company.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowDetail;
