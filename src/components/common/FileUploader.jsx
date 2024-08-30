import { FiUploadCloud } from "react-icons/fi";
import { useRef } from "react";
const FileUploader = ({ onChange, label = "File" }) => {
  const fileRef = useRef();

  const uploadFile = () => {
    fileRef.current.click();
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="" className="text-md font-light text-gray-500">
        {label}
      </label>
      <div
        onClick={uploadFile}
        className="cursor-pointer w-full flex items-center justify-center bg-grey/10 border border-dashed border-gray-400/40 min-h-[110px] rounded-lg"
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <FiUploadCloud className="text-gray-400" size={32} />
          <span className="text-sm font-light text-gray-400">Upload File</span>
        </div>
        <input ref={fileRef} type="file" className="hidden" onChange={onChange} />
      </div>
    </div>
  );
};

export default FileUploader;
