// import Button from "@/components/common/Button";
// import TextArea from "@/components/common/TextArea";
import { useGetDocumentByIdQuery } from "@/data/services/documentService";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useParams } from "react-router-dom";
import translateFileType from "@/utils/fileTypeTranslator";
import Spinner from "@/components/common/Spinner";

const getFileExtension = (fileUrl) => {
  if (!fileUrl) return null;
  
  const fileName = fileUrl.split('/').pop();
  if (!fileName) return null;

  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension || null;
};

const formatDocumentForViewer = (document) => {
  if (!document?.file) return null;

  const fileExtension = getFileExtension(document.file);
  if (!fileExtension) return null;

  return [
    {
      uri: document.file,
      fileType: fileExtension
    },
  ];
};

const DocumentDetail = () => {
  const { id } = useParams();
  const { data: document, isFetching } = useGetDocumentByIdQuery(id);

  const docs = formatDocumentForViewer(document);

  const isPreviewSupported = (fileUrl) => {
    const supportedTypes = [
      'pdf', 'xlsx', 'docx', 'pptx',
      'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp',
      'svg'
    ];
    const extension = getFileExtension(fileUrl);
    return extension && supportedTypes.includes(extension);
  };

  return (
    <div className="w-full h-full">
      <div className="siteContainer">
        <div className="flex md:flex-row flex-col justify-between gap-5 py-10">
          <div className="md:w-1/2 w-full min-h-[450px] h-full">
            {isFetching ? (
              <div className="flex items-center justify-center w-full h-full p-10"><Spinner /></div>
            ) : docs ? (
              isPreviewSupported(document?.file) ? (
                <DocViewer 
                  documents={docs} 
                  pluginRenderers={DocViewerRenderers}
                  config={{
                    header: {
                      disableHeader: false,
                      disableFileName: false,
                      retainURLParams: false
                    }
                  }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full p-10">
                  <p>Bu fayl növü üçün önbaxış mövcud deyil. Faylı yükləyə bilərsiniz.</p>
                </div>
              )
            ) : (
              <p className="flex items-center justify-center w-full h-full p-10">Sənəd yüklənə bilmədi</p>
            )}
          </div>
          <div className="md:w-1/2 w-full">
            <h1 className="text-2xl font-semibold">{document?.name}</h1>
            <div className="flex flex-col gap-2 mt-5">
              <span className="text-md font-medium">
                Sənəd nömrəsi : <span className="font-normal">{document?.document_no}</span>
              </span>
              <span className="text-md font-medium">
                Sənəd tipi : <span className="font-normal">{translateFileType(document?.type || "Naməlum")}</span>
              </span>
              <span className="text-md font-medium">
                Şablon adı : <span className="font-normal">{document?.template?.name || "Naməlum"}</span>
              </span>
              <span className="text-md font-medium">
                Müəllif : <span className="font-normal">{document?.author}</span>
              </span>
              <span className="text-md font-medium">
                Səhifə sayı : <span className="font-normal">{document?.page_size}</span>
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