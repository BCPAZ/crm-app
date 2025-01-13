import { translateStatus } from "@/utils/translateStatus";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useToast from "@/hooks/useToast";
import moment from "moment";
import Spinner from "@/components/common/Spinner";
import { useGetInternalWorkflowDetailQuery, useUpdateInternalWorkflowDetailMutation } from "@/data/services/workflowsService";
import StatusSelector from "@/components/common/StatusSelector";
import DenyModal from "@/components/App/Workflow/DenyModal";

const InternalWorkflowDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const { data, isLoading, isError } = useGetInternalWorkflowDetailQuery(id);
  const [updateStatus, { isError: updateError, isSuccess: updateSuccess }] = useUpdateInternalWorkflowDetailMutation();
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
      setIsModalOpen(true);
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

  const createdAt = moment(workflowData?.government?.createdAt);
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
          {/* Proyekt məlumatları */}
          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Proyekt</h2>
            <p>
              <span className="font-medium">Ad:</span>{" "}
              {workflowData.project?.name}
            </p>
            <p>
              <span className="font-medium">Kod:</span>{" "}
              {workflowData.project?.code}
            </p>
          </div>

          {/* İstifadəçi məlumatları */}
          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">İstifadəçi</h2>
            <p>
              <span className="font-medium">Ad:</span>{" "}
              {workflowData.user?.name}
            </p>
            <p>
              <span className="font-medium">E-poçt:</span>{" "}
              {workflowData.user?.email}
            </p>
            {
              workflowData?.status && <div className="text-sm font-semibold">
              İmtina səbəbi:
              <p className="font-medium text-sm mt-3">
                {workflowData?.reason}
              </p>
            </div>
            }
            {/* <img
              src={workflowData.user?.avatar_url}
              alt={workflowData.user?.name}
              className="w-[30px] h-[30px] rounded-full border border-black/20 object-cover"
            /> */}
          </div>

          {/* Sənəd məlumatları */}
          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Sənəd</h2>
            <p>
              <span className="font-medium">Ad:</span>{" "}
              {workflowData.document?.name}
            </p>
            <p>
              <span className="font-medium">Sənəd No:</span>{" "}
              {workflowData.document?.document_no}
            </p>
            <p>
              <span className="font-medium">Müəllif:</span>{" "}
              {workflowData.document?.author}
            </p>
            <p>
              <span className="font-medium">Tip:</span>{" "}
              {workflowData.document?.type}
            </p>
            <p>
              <span className="font-medium">Səhifə sayı:</span>{" "}
              {workflowData.document?.page_size}
            </p>
            <a
              href={workflowData.document?.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Sənədə bax
            </a>
          </div>

          {/* Göndərən məlumatları */}
          <div className="flex flex-col gap-4 bg-grey/20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Göndərən</h2>
            <p>
              <span className="font-medium">Ad:</span>{" "}
              {workflowData.sender?.name}
            </p>
            <p>
              <span className="font-medium">E-poçt:</span>{" "}
              {workflowData.sender?.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalWorkflowDetail;
