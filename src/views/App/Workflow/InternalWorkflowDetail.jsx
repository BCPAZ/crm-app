import { translateStatus } from "@/utils/translateStatus";
import { useParams } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import Spinner from "@/components/common/Spinner";
import { useGetInternalWorkflowDetailQuery } from "@/data/services/workflowsService";
import StatusSelector from "@/components/common/StatusSelector";
import DenyModal from "@/components/App/Workflow/DenyModal";

const InternalWorkflowDetail = () => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { data, isLoading, isError } = useGetInternalWorkflowDetailQuery(id);

  const workflowData = data || {};

  const options = [
    { id: "completed", name: "Tamamlanıb" },
    { id: "pending", name: "Gözlənilir" },
    { id: "denied", name: "İmtina edilib" },
  ];

  const handleChangeStatus = (selected) => {
    setSelectedStatus(selected.id);
  };

  const selectedOption = options.find((option) => option.id === selectedStatus);

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

  const createdAt = moment(workflowData.created_at);
  const dueDate = createdAt.clone().add(workflowData.days, "days");
  const remainingDays = dueDate.diff(moment(), "days");

  const renderRemainingDays = () => {
    if (remainingDays < 0) {
      return (
        <span className="text-sm font-semibold text-red-600">
          Deadline vaxtı bitib!
        </span>
      );
    }

    return (
      <span
        className={`text-sm font-semibold ${remainingDays <= 2 ? "text-yellow-500" : "text-green-600"
          }`}
      >
        Qalan gün sayı: {remainingDays}
      </span>
    );
  };

  return (
    <section className="w-full py-10">
      <div className="siteContainer">
        <div className="flex items-center justify-between">
          {selectedOption?.id === "denied" && <DenyModal />}
          <h1 className="text-3xl font-semibold">
            {workflowData.project?.name || "Proyektin Adı"}
          </h1>
          <div className="flex items-center gap-5">
            {renderRemainingDays()}
            <div>{translateStatus(workflowData.status)}</div>
            <StatusSelector
              options={options}
              onChange={handleChangeStatus}
              value={selectedOption}
            />
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
            <img
              src={workflowData.user?.avatar_url}
              alt={workflowData.user?.name}
              className="w-[30px] h-[30px] rounded-full border border-black/20 object-cover"
            />
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
