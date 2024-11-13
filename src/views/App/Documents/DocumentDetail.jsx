import Button from "@/components/common/Button";
import TextArea from "@/components/common/TextArea";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
const DocumentDetail = () => {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" },
  ];
  return (
    <div className="w-full h-full">
      <div className="siteContainer">
        <div className="flex md:flex-row flex-col justify-between gap-5 py-10">
          <div className="md:w-1/2 w-full min-h-[450px] h-full">
            <DocViewer documents={docs} initialActiveDocument={docs[0]} pluginRenderers={DocViewerRenderers} />
          </div>
          <div className="md:w-1/2 w-full">
            <h1 className="text-2xl font-semibold">Sənədin adının yerləşməsi</h1>
            <div className="flex flex-col gap-2 mt-5">
              <span className="text-md font-medium">
                Sənəd nömrəsi : <span className="font-normal">1905545566</span>
              </span>
              <span className="text-md font-medium">
                Sənəd tipi : <span className="font-normal">Reyestr</span>
              </span>
              <span className="text-md font-medium">
                Şablon adı : <span className="font-normal">Mincivan 1</span>
              </span>
              <span className="text-md font-medium">
                Müəllif : <span className="font-normal">Flegri</span>
              </span>
              <span className="text-md font-medium">
                Səhifə sayı : <span className="font-normal">130</span>
              </span>
            </div>
            <div className="mt-8">
              <TextArea label="Şərh" placeholder="Şərhinizi əlavə edin" />
            </div>
            <div className="flex items-center gap-5 mt-8">
              <button className="bg-white w-fit text-black border border-gray-400/50 p-3 rounded-lg font-medium sm:text-md text-sm flex items-center justify-center gap-2">Ləğv et</button>
              <span className="w-fit"><Button value={"Təsdiqlə"} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
