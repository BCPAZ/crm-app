import Sidebar from "@/components/App/Documents/Sidebar";
import CheckboxElement from "@/components/common/CheckboxElement";
import Searchbar from "@/components/common/Searchbar";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import { IoIosArrowForward } from "react-icons/io";

const DocumentRegister = () => {
  return (
    <section className="h-screen">
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center gap-5">
            <h1 className="text-xl font-semibold">
              Search - Register documents
            </h1>
            <span className="py-2 px-9 rounded-xl bg-grey/20 text-sm">
              Journal
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between relative">
        <div className="w-[20%] top-0 left-0 absolute h-full bg-white">
        <Sidebar />
        </div>
        <div className="max-w-[80%] absolute top-0 right-0 w-full flex flex-col justify-between mx-auto px-5 gap-10 py-10">
          <div className="w-full h-full">
            <Searchbar />
          </div>
          <div className="w-full grid grid-cols-2">
            <CheckboxElement label="File content search" />
            <CheckboxElement label="Show change history" />
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <Select />
            <Select />
            <Select />
            <SecondInput label="Author" placeholder="Author name" type="text" />
            <SecondInput label="Author" placeholder="Author name" type="text" />
            <SecondInput label="Author" placeholder="Author name" type="text" />
            <SecondInput label="Author" placeholder="Author name" type="text" />
            <SecondInput label="Author" placeholder="Author name" type="text" />
          </div>
          <div className="flex items-center justify-between mt-12">
            <span className="flex items-center gap-3">
              More Filters (0) <IoIosArrowForward />
            </span>
            <button>Restore Filters</button>
          </div>
          <div className="bg-gray-200">
          <div className="max-w-[1080px] mx-auto p-3 flex flex-col gap-4">
            <h2>No results.</h2>
            <span>Suggestions:</span>
            <ul className="list-disc p-3">
              <li className="list-disc">Check the spelling</li>
              <li className="list-disc">Try using different keywords</li>
              <li className="list-disc">Try using different filters</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentRegister;
