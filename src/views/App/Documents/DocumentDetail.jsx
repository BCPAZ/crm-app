// import Button from "@/components/common/Button";
// import TextArea from "@/components/common/TextArea";
import { useGetDocumentByIdQuery } from "@/data/services/documentService";
import translateFileType from "@/utils/fileTypeTranslator";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Link, useParams } from "react-router-dom";

const DocumentDetail = () => {
  const { id } = useParams();
  const { data: document } = useGetDocumentByIdQuery(id);

  // const getFileType = (url) => {
  //   return url.split(".").pop().toLowerCase();
  // };

  // const fileType = getFileType(document?.file);

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    if (!filename) return null;
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  return (
    <div className="w-full h-full">
      <div className="siteContainer">
        <div className="flex md:flex-row flex-col justify-between gap-5 py-10">
          <div className="md:w-1/2 w-full h-full flex justify-center">
            <div className="max-w-[100px]">
              <Link to={document?.file} target="_blank" rel="noreferrer">
                {renderFileIcon(document?.file)}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <h1 className="text-2xl font-semibold">{document?.name}</h1>
            <div className="flex flex-col gap-2 mt-5">
              <span className="text-md font-medium">
                Sənəd nömrəsi :{" "}
                <span className="font-normal">{document?.document_no}</span>
              </span>
              <span className="text-md font-medium">
                Sənəd tipi :{" "}
                <span className="font-normal">
                  {translateFileType(document?.type || "Naməlum")}
                </span>
              </span>
              <span className="text-md font-medium">
                Şablon adı :{" "}
                <span className="font-normal">
                  {document?.template?.name || "Naməlum"}
                </span>
              </span>
              <span className="text-md font-medium">
                Müəllif :{" "}
                <span className="font-normal">{document?.author}</span>
              </span>
              <span className="text-md font-medium">
                Səhifə sayı :{" "}
                <span className="font-normal">{document?.page_size}</span>
              </span>
            </div>
            {/* <div className="mt-8">
              <TextArea label="Şərh" placeholder="Şərhinizi əlavə edin" />
            </div>
            <div className="flex items-center gap-5 mt-8">
              <button className="bg-white w-fit text-black border border-gray-400/50 p-3 rounded-lg font-medium sm:text-md text-sm flex items-center justify-center gap-2">
                Ləğv et
              </button>
              <span className="w-fit">
                <Button value={"Təsdiqlə"} />
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
