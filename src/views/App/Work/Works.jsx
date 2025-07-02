import Button from "@/components/common/Button";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import LoadingScreen from "@/components/common/LoadingScreen";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import {
  useAddDocumentToWorkMutation,
  useArchiveMutation,
  useCompleteMutation,
  useGetWorksQuery,
} from "@/data/services/workService";
import useToast from "@/hooks/useToast";
import { ChevronDown, ChevronRight } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const status = {
  PENDING: "Gözlənilir",
  ACTIVE: "Aktiv",
  INACTIVE: "Deaktiv",
  CLOSED: "Bağlanıb",
};

const statusColor = {
  PENDING: "yellow",
  ACTIVE: "green",
  INACTIVE: "red",
  CLOSED: "blue",
};

const Works = () => {
  const [filters, setFilters] = useState({
    name: "",
    startDate: null,
    endDate: null,
    documentNo: "",
    progress: null,
    status: null,
    user_name: "",
    customer_name: "",
  });

  const navigate = useNavigate();

  const [archive, { isSuccess: isArchiveSuccess }] = useArchiveMutation();

  const { name, startDate, endDate, documentNo, progress } = filters;

  const { user } = useSelector((state) => state.auth);

  const { data = [], isLoading } = useGetWorksQuery({
    name: filters.name,
    start_date: filters.startDate
      ? moment(filters.startDate).format("YYYY-MM-DD")
      : undefined,
    end_date: filters.endDate
      ? moment(filters.endDate).format("YYYY-MM-DD")
      : undefined,
    document_no: filters.documentNo,
    progress: filters.progress ? filters.progress : undefined,
    status: filters.status ? filters.status : undefined,
    user_name: filters.user_name,
    customer_name: filters.customer_name,
  });

  const [openWorkId, setOpenWorkId] = useState(null);

  const toggleWorkId = (workId) =>
    setOpenWorkId((prev) => (prev === workId ? null : workId));

  const toggleSubWorkIds = (subWorkId) => {
    setOpenedSubWorkIds((prev) =>
      prev.includes(subWorkId)
        ? prev.filter((id) => id !== subWorkId)
        : [...prev, subWorkId]
    );
  };

  const [openedSubWorkIds, setOpenedSubWorkIds] = useState([]);

  const [
    completeWork,
    {
      isLoading: isCompleteLoading,
      isSuccess: isCompleteSuccess,
      isError: isCompleteError,
    },
  ] = useCompleteMutation();

  const getFileExtension = (filename) => filename.split(".").pop();

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  useEffect(() => {
    setOpenedSubWorkIds([]);
  }, [openWorkId]);

  const handleChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const toast = useToast();

  useEffect(() => {
    if (isCompleteSuccess) {
      toast.showToast("Layihə tamamlandı", "success");
    }
  }, [isCompleteSuccess]);

  useEffect(() => {
    if (isArchiveSuccess) {
      toast.showToast("Layihə arxivləndi", "success");
    }
  }, [isArchiveSuccess]);

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="w-full h-full p-5">
      <Toaster />
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Layihələr</h1>
          <div className="mt-5 flex justify-end">
            <Link to="/works/create-work">
              <Button value="Layihə yaradın" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <SecondInput
              onChange={(e) => handleChange("name", e.target.value)}
              column
              value={name}
              label="Layihə adı"
              placeholder="Layihə adı daxil edin"
              type="text"
            />
            <CustomDatePicker
              value={startDate}
              onChange={(value) => handleChange("startDate", value)}
              label="Başlanğıc tarixi seçin"
            />
            <CustomDatePicker
              value={endDate}
              onChange={(value) => handleChange("endDate", value)}
              label="Bitiş tarixi seçin"
            />
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <Select
              label="Status"
              onChange={(e) => handleChange("status", e)}
              value={filters.status}
              options={Object.keys(status).map((s) => ({
                id: s,
                name: status[s],
              }))}
              column
            />

            <SecondInput
              onChange={(e) => handleChange("documentNo", e.target.value)}
              column
              value={documentNo}
              label="Sənəd nömrəsi"
              placeholder="Sənəd nömrəsini daxil edin"
              type="text"
            />
            <SecondInput
              onChange={(e) => handleChange("progress", e.target.value)}
              column
              value={progress}
              label="Proqress"
              placeholder="Proqress daxil edin"
              type="number"
              min={0}
              max={100}
            />
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <SecondInput
              onChange={(e) => handleChange("user_name", e.target.value)}
              column
              value={filters.user_name}
              label="İcraçı"
              placeholder="İcraçı daxil edin"
              type="text"
            />
            <SecondInput
              onChange={(e) => handleChange("customer_name", e.target.value)}
              column
              value={filters.customer_name}
              label="Müştəri"
              placeholder="Müştərini daxil edin"
              type="text"
            />
          </div>
        </div>
        <div className="mt-10 w-full overflow-x-auto">
          <table className="table-auto min-w-full border-collapse border whitespace-nowrap">
            <thead className="bg-gray-300/30 w-full rounded-lg text-left">
              <tr>
                {[
                  "#",
                  "Layihə adı",
                  "İcraçı",
                  "Müştəri",
                  "Başlama tarixi",
                  "Bitmə tarixi",
                  "Proqress",
                  "Status",
                  "Qeyd",
                  "Sənəd nömrəsi",
                  "Yüklənmiş fayl",
                  "Layihə kodu",
                  "Əməliyyatlar",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 p-4 text-sm font-medium text-gray-500"
                    colSpan={i === 1 || i === 9 || i === 10 ? 2 : 1}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((work, i) => {
                const isWorkOpen = openWorkId === work?.id;

                return (
                  <React.Fragment key={i}>
                    <tr
                      className={
                        moment(work?.end_date).isBefore(moment(), "day")
                          ? "bg-red-200 cursor-pointer"
                          : moment(work?.end_date).isSame(moment(), "day")
                          ? "bg-yellow-200 cursor-pointer hover:bg-gray-100"
                          : "cursor-pointer hover:bg-gray-100"
                      }
                    >
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {i + 1}
                      </td>
                      <td
                        onClick={() => toggleWorkId(work?.id)}
                        className="border p-4 text-sm font-medium text-gray-700"
                        colSpan={2}
                      >
                        <div className="flex flex-1 gap-5 justify-between items-center">
                          {work?.name}
                          {work?.sub_works?.length > 0 && (
                            <>
                              {openWorkId === work?.id ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.customer?.name || "N/A"}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.customerCompany?.name || "N/A"}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {moment(work?.start_date || new Date()).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {moment(work?.end_date || new Date()).format(
                          "YYYY-MM-DD"
                        )}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.progress} %
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {status[work?.status] || "N/A"}{" "}
                        {status[work?.status] && (
                          <span
                            className="w-2 h-2 rounded-full inline-block ml-2"
                            style={{
                              background: statusColor[work?.status],
                            }}
                          />
                        )}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.description || "N/A"}
                      </td>
                      <td
                        className="border p-4 text-sm font-medium text-gray-700"
                        colSpan={2}
                      >
                        {work?.document?.document_no ? (
                          <Link
                            to={`/document-register?documentNo=${work?.document?.document_no}`}
                            className="text-sm text-secondary hover:underline"
                          >
                            {work?.document?.document_no}
                          </Link>
                        ) : (
                          <DocumentChanger subWorkId={work?.id} isWork />
                        )}
                      </td>
                      <td
                        className="border p-4 text-sm font-medium text-gray-700"
                        colSpan={2}
                      >
                        N/A
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.code}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700 gap-3 flex flex-col">
                        {work?.customer_id === user?.id && (
                          <Button
                            isLoading={isCompleteLoading}
                            disabled={isCompleteLoading}
                            value="Bitir"
                            onClick={() =>
                              completeWork({ id: work?.id, isWork: true })
                            }
                          />
                        )}
                        {work?.created_by === user?.id && (
                          <>
                            <Button
                              isLoading={isCompleteLoading}
                              disabled={isCompleteLoading}
                              value="Arxivlə"
                              onClick={() => archive(work?.id)}
                            />
                            <Button
                              value="Düzəliş et"
                              onClick={() =>
                                navigate(`/works/${work?.id}/update`)
                              }
                            />
                          </>
                        )}
                      </td>
                    </tr>

                    {isWorkOpen &&
                      work?.sub_works?.map((subWork, j) => {
                        const isSubWorkOpen = openedSubWorkIds.includes(
                          subWork?.id
                        );

                        return (
                          <React.Fragment key={j}>
                            <tr
                              className={
                                moment(subWork.end_date).isBefore(
                                  moment(),
                                  "day"
                                )
                                  ? "bg-red-200 cursor-pointer"
                                  : moment(subWork.end_date).isSame(
                                      moment(),
                                      "day"
                                    )
                                  ? "bg-yellow-200 cursor-pointer hover:bg-gray-100"
                                  : "cursor-pointer hover:bg-gray-100"
                              }
                              onClick={() => toggleSubWorkIds(subWork.id)}
                            >
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                &nbsp;&nbsp;&nbsp;
                                {i + 1}.{j + 1}
                              </td>
                              <td
                                className="border p-4 text-sm font-medium text-gray-700"
                                colSpan={2}
                              >
                                <div className="flex flex-1 gap-5 justify-between items-center">
                                  {subWork?.name}
                                  {subWork?.children?.length > 0 && (
                                    <>
                                      {isSubWorkOpen ? (
                                        <ChevronDown size={16} />
                                      ) : (
                                        <ChevronRight size={16} />
                                      )}
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {subWork?.worker?.name || "N/A"}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {work?.customerCompany?.name || "N/A"}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {moment(
                                  subWork?.start_date || new Date()
                                ).format("YYYY-MM-DD")}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {moment(subWork?.end_date || new Date()).format(
                                  "YYYY-MM-DD"
                                )}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {subWork?.progress} %
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {status[subWork?.status] || "N/A"}
                                {status[subWork?.status] && (
                                  <span
                                    className="w-2 h-2 rounded-full inline-block ml-2"
                                    style={{
                                      background: statusColor[subWork?.status],
                                    }}
                                  />
                                )}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {subWork?.description || "N/A"}
                              </td>
                              <td
                                className="border p-4 text-sm font-medium text-gray-700"
                                colSpan={2}
                              >
                                {subWork?.document?.document_no ? (
                                  <Link
                                    to={`/document-register?documentNo=${subWork?.document?.document_no}`}
                                    className="text-sm text-secondary hover:underline"
                                  >
                                    {subWork?.document?.document_no}
                                  </Link>
                                ) : (
                                  <DocumentChanger subWorkId={subWork?.id} />
                                )}
                              </td>
                              <td
                                className="border p-4 text-sm font-medium text-gray-700"
                                colSpan={2}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-[25px] h-[25px]">
                                    {renderFileIcon(subWork?.file || "")}
                                  </div>
                                  <Link
                                    target="_blank"
                                    to={`https://azincrm.az/storage/${subWork?.file}`}
                                    className="text-sm text-secondary hover:underline"
                                  >
                                    {subWork?.file_name
                                      ? subWork?.file_name
                                      : "Yüklə"}
                                  </Link>
                                </div>
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {subWork?.code || "N/A"}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                {subWork?.worker_id === user?.id && (
                                  <Button
                                    value="Bitir"
                                    onClick={() =>
                                      completeWork({ id: subWork?.id })
                                    }
                                  />
                                )}
                              </td>
                            </tr>

                            {isSubWorkOpen &&
                              subWork?.children?.map((child, k) => {
                                return (
                                  <tr key={k} className="bg-gray-100">
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      {i + 1}.{j + 1}.{k + 1}
                                    </td>
                                    <td
                                      className="border p-4 text-sm font-medium text-gray-700"
                                      colSpan={2}
                                    >
                                      {child?.name}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {child?.worker?.name || "N/A"}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {work?.customerCompany?.name || "N/A"}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {moment(
                                        child?.start_date || new Date()
                                      ).format("YYYY-MM-DD")}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {moment(
                                        child?.end_date || new Date()
                                      ).format("YYYY-MM-DD")}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {child?.progress} %
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {status[child?.status] || "N/A"}
                                      {status[child?.status] && (
                                        <span
                                          className="w-2 h-2 rounded-full inline-block ml-2"
                                          style={{
                                            background:
                                              statusColor[child?.status],
                                          }}
                                        />
                                      )}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {child?.description || "N/A"}
                                    </td>
                                    <td
                                      className="border p-4 text-sm font-medium text-gray-700"
                                      colSpan={2}
                                    >
                                      {child?.document?.document_no ? (
                                        <Link
                                          to={`/document-register?documentNo=${child?.document?.document_no}`}
                                          className="text-sm text-secondary hover:underline"
                                        >
                                          {child?.document?.document_no}
                                        </Link>
                                      ) : (
                                        <DocumentChanger
                                          subWorkId={child?.id}
                                        />
                                      )}
                                    </td>
                                    <td
                                      className="border p-4 text-sm font-medium text-gray-700"
                                      colSpan={2}
                                    >
                                      <div className="flex items-center gap-4">
                                        <div className="w-[25px] h-[25px]">
                                          {renderFileIcon(child?.file || "")}
                                        </div>
                                        <Link
                                          target="_blank"
                                          to={`https://azincrm.az/storage/${child?.file}`}
                                          className="text-sm text-secondary hover:underline"
                                        >
                                          {child?.file_name
                                            ? child?.file_name
                                            : "Yüklə"}
                                        </Link>
                                      </div>
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {child?.code || "N/A"}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      {child?.worker_id === user?.id && (
                                        <Button
                                          value="Bitir"
                                          onClick={() =>
                                            completeWork({ id: child?.id })
                                          }
                                        />
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const DocumentChanger = ({ subWorkId, isWork = false }) => {
  const [addDocument, { isError, isSuccess }] = useAddDocumentToWorkMutation();
  const [documentNo, setDocumentNo] = useState(null);

  const { showToast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      showToast("Sənəd yükləndi", "success");
    } else if (isError) {
      showToast("Sənəd tapılmadı", "error");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="min-w-[160px] w-full">
        <SecondInput
          type="text"
          name="document_no"
          value={documentNo}
          onChange={(e) => setDocumentNo(e.target.value)}
        />
      </div>
      <div>
        <Button
          value="Yüklə"
          onClick={() =>
            addDocument(
              isWork
                ? { work_id: subWorkId, document_no: documentNo }
                : { sub_work_id: subWorkId, document_no: documentNo }
            )
          }
        />
      </div>
    </div>
  );
};

export default Works;
