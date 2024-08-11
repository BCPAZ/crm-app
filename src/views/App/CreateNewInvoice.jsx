import Selectbox from "@/components/common/Selectbox";
import SendInvoice from "@/components/App/Cost/SendInvoice";
import Select from "@/components/common/Select";
const CreateNewInvoice = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">Cost</h1>
            <div className="w-[15%]">
              <Selectbox />
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <div className="py-10">
          <h1 className="text-2xl font-bold">Create new invoice</h1>
          <div className="rounded-xl shadow-lg mt-10 bg-white">
            <div className="p-6">
              <SendInvoice />
            </div>
            <div className="grid grid-cols-4 mt-5 gap-4 bg-gray-300/30 p-6">
              <Select />
              <Select />
              <Select />
              <Select />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateNewInvoice;
