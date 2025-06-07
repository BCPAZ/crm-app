import Button from "@/components/common/Button";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useGetWorksQuery } from "@/data/services/workService";
import { ChevronDown, ChevronRight } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Link } from "react-router-dom";

const Works = () => {
  const { data = [], isLoading } = useGetWorksQuery();

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

  const getFileExtension = (filename) => filename.split(".").pop();

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  useEffect(() => {
    setOpenedSubWorkIds([]);
  }, [openWorkId]);

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="w-full h-full p-5">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Tapşırıqlar</h1>
          <div className="mt-5 flex justify-end">
            <Link to="/works/create-work">
              <Button value="Tapşırıq yaradın" />
            </Link>
          </div>
        </div>
        <div className="mt-10 w-full">
          <table className="table-fixed w-full border-collapse border">
            <thead className="bg-gray-300/30 w-full rounded-lg text-left">
              <tr>
                {[
                  "#",
                  "Tapşırıq adı",
                  "İcraçı / Müştəri",
                  "Başlama tarixi",
                  "Bitmə tarixi",
                  "Proqress",
                  "Qeyd",
                  "Yüklənmiş fayl",
                  "Tapşırıq kodu",
                  "Əməliyyatlar",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 p-4 text-sm font-medium text-gray-500"
                    colSpan={i === 1 ? 2 : 1}
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
                      onClick={() => toggleWorkId(work?.id)}
                      className={
                        moment(work?.end_date).isBefore(moment(), "day")
                          ? "bg-red-200 cursor-pointer hover:bg-gray-100"
                          : moment(work?.end_date).isSame(moment(), "day")
                          ? "bg-yellow-200 cursor-pointer hover:bg-gray-100"
                          : "cursor-pointer hover:bg-gray-100"
                      }
                    >
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {i + 1}
                      </td>
                      <td
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
                        {work?.description || "N/A"}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        N/A
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.code}
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        N/A
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
                                  ? "bg-red-200 cursor-pointer hover:bg-gray-100"
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
                                {subWork?.description || "N/A"}
                              </td>
                              <td className="border p-4 text-sm font-medium text-gray-700">
                                <div className="flex items-center gap-4">
                                  <div className="w-[25px] h-[25px]">
                                    {renderFileIcon(subWork?.file || "")}
                                  </div>
                                  <Link
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
                                {subWork?.children?.length > 0 ? (
                                  <>N/A</>
                                ) : (
                                  <Button value="Bitir" />
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
                                      {child?.description || "N/A"}
                                    </td>
                                    <td className="border p-4 text-sm font-medium text-gray-700">
                                      <div className="flex items-center gap-4">
                                        <div className="w-[25px] h-[25px]">
                                          {renderFileIcon(child?.file || "")}
                                        </div>
                                        <Link
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
                                      {child?.children?.length > 0 ? (
                                        <>N/A</>
                                      ) : (
                                        <Button value="Bitir" />
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

export default Works;
