import Selectbox from "@/components/common/Selectbox";
import SendInvoice from "@/components/App/Cost/SendInvoice";
import Select from "@/components/common/Select";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import Input from "@/components/common/Input";
import { HiTrash } from "react-icons/hi2";
import { IoAddSharp } from "react-icons/io5";

const CreateNewInvoice = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="md:text-xl font-semibold w-full">Cost</h1>
            <div className="w-[150px]">
              <Selectbox />
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <div className="py-10">
          <h1 className="md:text-2xl text-xl font-bold">Create new invoice</h1>
          <div className="rounded-xl shadow-lg mt-10 bg-white">
            <div className="md:p-6 p-3">
              <SendInvoice />
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-5 gap-4 bg-gray-300/30 md:p-6 p-3">
              <Select />
              <Select />
              <CustomDatePicker label="Date time" />
              <CustomDatePicker label="Due time" />
            </div>
            <div className="md:p-6 p-3">
              <h1 className="text-lg text-gray-400 font-semibold">Details:</h1>
              <div className="pb-6 border-b border-grey/20 border-dashed">
                <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
                  <Input label="Title" placeholder="Enter the title" />
                  <Input
                    label="Description"
                    placeholder="Enter the description"
                  />
                  <Input label="Service Type" placeholder="Service type" />
                  <Input label="Quantity" placeholder="Enter the quantity" />
                  <Input
                    label="Unit price"
                    placeholder="Enter the unit price"
                  />
                  <Input label="Total" placeholder="Total price" />
                </div>
                <div className="w-full flex justify-end items-center mt-5">
                  <button className="flex items-center gap-2 text-red-600 font-bold text-sm">
                    <HiTrash size={18} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="pb-6 border-b border-grey/20 border-dashed">
                <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5 mt-10">
                  <Input label="Title" placeholder="Enter the title" />
                  <Input
                    label="Description"
                    placeholder="Enter the description"
                  />
                  <Input label="Service Type" placeholder="Service type" />
                  <Input label="Quantity" placeholder="Enter the quantity" />
                  <Input
                    label="Unit price"
                    placeholder="Enter the unit price"
                  />
                  <Input label="Total" placeholder="Total price" />
                </div>
                <div className="w-full flex justify-end items-center mt-5">
                  <button className="flex items-center gap-2 text-red-600 font-bold text-sm">
                    <HiTrash size={18} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="flex md:flex-row flex-col md:items-center md:justify-between justify-start gap-2">
                <button className="text-green-500 flex items-center gap-2 text-sm font-bold">
                  <IoAddSharp size={20} />
                  Add Item
                </button>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                  <Input placeholder="Shipping ($)" />
                  <Input placeholder="Discount ($)" />
                  <Input placeholder="Taxes (%)" />
                </div>
              </div>
            </div>
            <div className="md:p-6 p-3">
              <div className="flex items-center justify-end w-full gap-2">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center justify-end gap-2 text-sm font-base text-gray-400">
                    Subtotal :{" "}
                    <span className="w-[160px] text-end text-black">
                      $337.98
                    </span>
                  </span>
                  <span className="flex items-center justify-end gap-2 text-sm font-base text-gray-400">
                    Shipping :{" "}
                    <span className="w-[160px] text-end text-red-600">
                      $337.98
                    </span>
                  </span>
                  <span className="flex items-center justify-end gap-2 text-sm font-base text-gray-400">
                    Discount :{" "}
                    <span className="w-[160px] text-end text-red-600">
                      $337.98
                    </span>
                  </span>
                  <span className="flex items-center justify-end gap-2 text-sm font-base text-gray-400">
                    Taxes :{" "}
                    <span className="w-[160px] text-end text-red-600">
                      $337.98
                    </span>
                  </span>
                  <span className="flex items-center justify-end gap-2 text-md font-semibold text-black">
                    Taxes :{" "}
                    <span className="w-[160px] text-end text-black">
                      $337.98
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="p-3 rounded-lg bg-black text-white font-semibold text-sm mb-10">
            Create & Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateNewInvoice;
