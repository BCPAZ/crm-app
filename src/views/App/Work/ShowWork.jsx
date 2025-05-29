import LoadingScreen from "@/components/common/LoadingScreen";
import { useGetWorkQuery } from "@/data/services/workService";
import { ChevronDown, ChevronRight } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Link, useParams } from "react-router-dom";

let index = 0;

const ShowWork = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetWorkQuery(id);
  const [openWorkIds, setOpenWorkIds] = useState([]);

  const getFileExtension = (filename) => filename.split(".").pop();

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  const toggleAccordion = (workId) => {
    setOpenWorkIds((prev) =>
      prev.includes(workId)
        ? prev.filter((id) => id !== workId)
        : [...prev, workId]
    );
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="w-full h-full p-5">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Tapşırıq: {data?.name}</h1>
        </div>
        <div className="mt-10 w-full">
          <table className="table-fixed w-full border-collapse border">
            <thead className="bg-gray-300/30 w-full rounded-lg text-left">
              <tr>
                {[
                  "Tapşırıq adı",
                  "İcraçı / Müştəri",
                  "Başlama tarixi",
                  "Bitmə tarixi",
                  "Proqress",
                  "Qeyd",
                  "Yüklənmiş fayl",
                  "Tapşırıq kodu",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 p-4 text-sm font-medium text-gray-500"
                    colSpan={i === 0 ? 2 : 1}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="border p-4 text-sm font-medium text-gray-700"
                  colSpan={2}
                >
                  {data?.name}
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  {data?.customer?.name || "N/A"}
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  {moment(data?.start_date || new Date()).format("YYYY-MM-DD")}
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  {moment(data?.end_date || new Date()).format("YYYY-MM-DD")}
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  {data?.progress} %
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  {data?.description || "N/A"}
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  N/A
                </td>
                <td className="border p-4 text-sm font-medium text-gray-700">
                  {data?.code}
                </td>
              </tr>

              {data?.sub_works?.map((work) => {
                index++;
                const isOpen = openWorkIds.includes(work.id);
                return (
                  <React.Fragment key={work.id}>
                    <tr
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleAccordion(work.id)}
                    >
                      <td
                        className="border p-4 text-sm font-medium text-gray-700"
                        colSpan={2}
                      >
                        <div className="flex flex-1 gap-5 justify-between items-center">
                          — {work?.name}
                          {isOpen ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </div>
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        {work?.worker?.name || "N/A"}
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
                        <div className="flex items-center gap-4">
                          <div className="w-[25px] h-[25px]">
                            {renderFileIcon(work?.file || "")}
                          </div>
                          <Link
                            to={`https://azincrm.az/storage/${work?.file}`}
                            className="text-sm text-secondary hover:underline"
                          >
                            Yüklə
                          </Link>
                        </div>
                      </td>
                      <td className="border p-4 text-sm font-medium text-gray-700">
                        N/A
                      </td>
                    </tr>

                    {isOpen &&
                      work?.children?.map((subWork) => {
                        index++;
                        return (
                          <tr key={subWork.id}>
                            <td
                              className="border p-4 text-sm font-medium text-gray-700"
                              colSpan={2}
                            >
                              —— {subWork?.name}
                            </td>
                            <td className="border p-4 text-sm font-medium text-gray-700">
                              {subWork?.worker?.name || "N/A"}
                            </td>
                            <td className="border p-4 text-sm font-medium text-gray-700">
                              {moment(subWork?.start_date || new Date()).format(
                                "YYYY-MM-DD"
                              )}
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
                                  Yüklə
                                </Link>
                              </div>
                            </td>
                            <td className="border p-4 text-sm font-medium text-gray-700">
                              N/A
                            </td>
                          </tr>
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

export default ShowWork;
