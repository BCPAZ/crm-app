import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import SecondTextArea from "@/components/common/SecondTextArea";
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const CreateTemplate = () => {
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    setColumns([...columns, { id: columns.length + 1, agencies: [] }]);
  };

  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">
              Şablon yaradın - Workflow
            </h1>
            <div className="w-[15%]">
              <Button value="Qeyd edin" />
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <div className="py-[60px]">
          <div className="md:max-w-[750px] max-w-full">
            <div className="flex justify-center flex-col gap-5">
              <SecondInput column label="Name *" placeholder="Template Name" />
              <SecondTextArea
                solid
                column
                label="Description"
                placeholder="Description"
              />
            </div>
          </div>
          <div className="flex flex-col gap-9 mt-10 w-full">
            <h1 className="text-2xl font-semibold">Duration</h1>
            <div className="rounded-lg max-w-full w-full flex items-center justify-center gap-4 border-2 border-grey/20 border-dashed min-h-[200px] p-5 h-full">
              <div className="h-full p-10 rounded-lg bg-grey/20">
                <button><FaPlay size={20} /></button>
              </div>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto py-5">
                {columns.map((column) => (
                  <div key={column.id} className="bg-grey/10 p-4 w-fit rounded-lg h-full min-w-[300px] flex flex-col">
                    <div className="flex items-center gap-2 w-full">
                      <SecondInput placeholder="Müddət daxil edin" />
                      <button className="text-white bg-black p-4 rounded-md"><MdAdd /></button>
                    </div>
                    <div className="p-2 flex flex-col gap-2"> 
                      <div className="p-2 bg-white rounded-lg flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <img className="w-[30px] h-[30px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNQcCAZ_DArpO0dY4kfaeVGSK7M5GkmcY9g&s" alt="" />
                          <span className="text-sm font-medium">Azərİşıq ASC</span>
                        </div>
                        <button className="text-black"><MdClose size={20}/></button>
                      </div>
                      <div className="p-2 bg-white rounded-lg flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <img className="w-[30px] h-[30px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNQcCAZ_DArpO0dY4kfaeVGSK7M5GkmcY9g&s" alt="" />
                          <span className="text-sm font-medium">Azərİşıq ASC</span>
                        </div>
                        <button className="text-black"><MdClose size={20}/></button>
                      </div>
                      <div className="p-2 bg-white rounded-lg flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <img className="w-[30px] h-[30px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNQcCAZ_DArpO0dY4kfaeVGSK7M5GkmcY9g&s" alt="" />
                          <span className="text-sm font-medium">Azərİşıq ASC</span>
                        </div>
                        <button className="text-black"><MdClose size={20}/></button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddColumn}
                  className="p-4 rounded-md mx-4 bg-white border border-grey/20 flex items-center gap-2 font-semibold text-sm text-nowrap"
                >
                  <MdAdd size={18} /> Yeni timeline yarat
                </button>
              </div>
              <div className="h-full p-10 rounded-lg bg-grey/20">
                <button><FaStop size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTemplate;
