import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import { IoIosArrowForward } from "react-icons/io";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import DocumentsTable from "@/components/App/Documents/DocumentsTable";

const DocumentRegister = () => {
  const filterTypes = [
    {
      id:1,
      type : 'register'
    },
    {
      id:2,
      type : 'drawings',
    },
    {
      id : 3,
      type : 'temporary'
    }
  ]
  return (
    <section className="h-full">
      <div className="flex justify-between relative h-full">
        <div className="w-full h-full absolute top-0 right-0 flex flex-col justify-between px-5 gap-10 pt-10 pb-[100px]">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <SecondInput column label="Şablon adı" placeholder="Şablon adı daxil edin" type="text" />
            <SecondInput column label="Sənəd nömrəsi" placeholder="Sənəd nömrəsi daxil edin" type="text" />
            <CustomDatePicker label='Başlanğıc tarixi seçin' />
            <CustomDatePicker label='Bitiş tarixi seçin' />
            <Select options={filterTypes || []} column />
          </div>
          <div className="flex items-center justify-between mt-12">
            <span className="flex items-center gap-3">
              More Filters (0) <IoIosArrowForward />
            </span>
            <button>Restore Filters</button>
          </div>
          <div className="py-10">
            <div>
              <DocumentsTable />
            </div>
            {/* <div className="p-3 flex flex-col gap-4">
              <h2>No results.</h2>
              <span>Suggestions:</span>
              <ul className="list-disc p-3">
                <li className="list-disc">Check the spelling</li>
                <li className="list-disc">Try using different keywords</li>
                <li className="list-disc">Try using different filters</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentRegister;
