import UserList from "@/components/App/Security/UserList";
import CustomButton from "@/components/common/CustomButton";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useGetWorkQuery } from "@/data/services/workService";
import moment from "moment";
import { GoArrowDown } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { FileIcon, defaultStyles } from "react-file-icon";

const ShowWork = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetWorkQuery(id);

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="w-full h-full p-5">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Tapşırıq: {data?.name}</h1>
        </div>
        <div className="mt-10 w-full">
          <table className="w-full text-sm min-w-[1200px]">
            <thead className="bg-gray-300/30 w-full rounded-lg text-left">
              <tr className="p-5 w-full flex items-center justify-between gap-5">
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[35%]">
                  <span className="flex items-center gap-2">Tapşırıq adı</span>
                </th>
                <th className="text-sm font-medium w-[24%] text-gray-500">
                  İcraçı / Müştəri
                </th>
                <th className="text-sm font-medium w-[24%] text-gray-500">
                  Başlama tarixi
                </th>
                <th className="text-sm font-medium w-[24%] text-gray-500">
                  Bitmə tarixi
                </th>
                <th className="text-sm font-medium w-[12%] text-gray-500">
                  Proqress
                </th>
                <th className="text-sm font-medium w-[48%] text-gray-500 rounded-e-lg">
                  Qeyd
                </th>
                <th className="text-sm font-medium w-[24%] text-gray-500 rounded-e-lg">
                  Yüklənmiş fayl
                </th>
                <th className="text-sm font-medium w-[24%] text-gray-500 rounded-e-lg">
                  Tapşırıq kodu
                </th>
                <th className="text-sm font-medium w-[5%] text-gray-500 rounded-e-lg"></th>
              </tr>
            </thead>
            <tbody className="w-full flex flex-col text-left">
              <div className="group">
                <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]">
                  <td className="text-sm font-medium text-gray-500 w-[35%]">
                    <h3 className="text-xs text-secondary">{data?.name}</h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[24%]">
                    <h3 className="text-xs text-secondary">
                      {data?.customer.name}
                    </h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[24%]">
                    <h3 className="text-xs text-secondary">
                      {moment(data?.start_date || new Date()).format(
                        "DD/MM/YYYY"
                      )}
                    </h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[24%]">
                    <h3 className="text-xs text-secondary">
                      {moment(data?.end_date || new Date()).format(
                        "DD/MM/YYYY"
                      )}
                    </h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[12%]">
                    <h3 className="text-xs text-secondary">
                      {data?.progress}%
                    </h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[48%]">
                    <h3 className="text-xs text-secondary">
                      {data?.description || "N/A"}
                    </h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[24%]">
                    <h3 className="text-xs text-secondary">N/A</h3>
                  </td>
                  <td className="text-sm font-medium text-gray-500 w-[12%]">
                    <h3 className="text-xs text-secondary">{data?.code}</h3>
                  </td>
                </tr>
                {data?.sub_works?.map((item, index) => (
                  <>
                    <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]">
                      <td className="text-sm font-medium text-gray-500 w-[35%]">
                        <h3 className="text-xs text-secondary">
                          {index + 1} {item?.name}
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[24%]">
                        <h3 className="text-xs text-secondary">
                          {item?.worker?.name}
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[24%]">
                        <h3 className="text-xs text-secondary">
                          {moment(item?.start_date || new Date()).format(
                            "DD/MM/YYYY"
                          )}
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[24%]">
                        <h3 className="text-xs text-secondary">
                          {moment(item?.end_date || new Date()).format(
                            "DD/MM/YYYY"
                          )}
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[12%]">
                        <h3 className="text-xs text-secondary">
                          {item?.progress}%
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[48%]">
                        <h3 className="text-xs text-secondary">
                          {item?.description || "N/A"}
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[24%]">
                        <h3 className="text-xs text-secondary">
                          <div className="flex items-center gap-4">
                            <div className="w-[25px] h-[25px]">
                              {renderFileIcon(
                                `https://azincrm.az/storage/${item?.file}`
                              )}
                            </div>
                            <Link
                              to={`https://azincrm.az/storage/${item?.file}`}
                              className="text-sm text-secondary hover:underline"
                            >
                              Yüklə
                            </Link>
                          </div>
                        </h3>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[12%]">
                        <h3 className="text-xs text-secondary">N/A</h3>
                      </td>
                    </tr>

                    {item?.children?.map((child, childIndex) => (
                      <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]">
                        <td className="text-sm font-medium text-gray-500 w-[35%]">
                          <h3 className="text-xs text-secondary">
                            {index + 1}.{childIndex + 1} {child?.name}
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[24%]">
                          <h3 className="text-xs text-secondary">
                            {child?.worker?.name}
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[24%]">
                          <h3 className="text-xs text-secondary">
                            {moment(child?.start_date || new Date()).format(
                              "DD/MM/YYYY"
                            )}
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[24%]">
                          <h3 className="text-xs text-secondary">
                            {moment(child?.end_date || new Date()).format(
                              "DD/MM/YYYY"
                            )}
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <h3 className="text-xs text-secondary">
                            {child?.progress}%
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[48%]">
                          <h3 className="text-xs text-secondary">
                            {child?.description || "N/A"}
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[24%]">
                          <h3 className="text-xs text-secondary">
                            <div className="flex items-center gap-4">
                              <div className="w-[25px] h-[25px]">
                                {renderFileIcon(
                                  `https://azincrm.az/storage/${child?.file}`
                                )}
                              </div>
                              <Link
                                to={`https://azincrm.az/storage/${child?.file}`}
                                className="text-sm text-secondary hover:underline"
                              >
                                Yüklə
                              </Link>
                            </div>
                          </h3>
                        </td>
                        <td className="text-sm font-medium text-gray-500 w-[12%]">
                          <h3 className="text-xs text-secondary">N/A</h3>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ShowWork;
