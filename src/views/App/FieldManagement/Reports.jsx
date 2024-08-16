import file from "@/assets/icons/FieldManagement/file.svg";
import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
const Reports = () => {
  return (
    <section className="p-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="h-[250px] bg-grey/10 p-5 rounded-xl flex flex-col items-center">
          <img src={file} alt="File Icon" />
          <div className="flex items-center flex-col gap-2">
            <h4 className="text-md font-semibold text-center">
              Drop or select file
            </h4>
            <p className="text-xs font-medium text-center text-gray-500">
              Drop files here or click to{" "}
              <span className="text-green-600">browse</span> through your
              machine.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="lg:w-1/2 w-full">
            <SecondInput column placeholder="Description" />
          </div>
          <div className="lg:w-1/2 w-full">
            <Select />
          </div>
         <div className="lg:w-1/2 w-full">
          <Button value="Upload" />
         </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
