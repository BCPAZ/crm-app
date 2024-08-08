import Button from "@/components/common/Button";
import CheckboxElement from "@/components/common/CheckboxElement";
import SecondInput from "@/components/common/SecondInput";
import SecondTextArea from "@/components/common/SecondTextArea";
import Select from "@/components/common/Select";
import { IoIosAdd } from "react-icons/io";

const CreateTemplate = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">
              Create Template - Workflow
            </h1>
            <div className="w-[15%]">
              <Button value="Save" />
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
            <Select column label="Approval statuses" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[60px] mt-10">
          <div className="flex md:flex-row flex-col gap-10">
            <h3 className="md:max-w-[82px] max-w-full font-medium">
              Initiators capabilities
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h3>Beginning of the process</h3>
                <CheckboxElement label="The initiator can change the participants and the duration of the stages" />
              </div>
              <div className="flex flex-col gap-3">
                <h3>During the process execution</h3>
                <CheckboxElement label="The initiator can change the list of participants in the stage" />
                <CheckboxElement label="The initiator can skip stages" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:gap-10 gap-5">
            <h3 className="md:max-w-[82px] max-w-full">
              Rules for completing stages
            </h3>
            <div className="flex flex-col gap-4 w-full">
              <Select column label="Parallel stages are completed if" />
              <Select column label="If rejected" />
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:gap-10 gap-5 w-full">
            <h3 className="w-fit">Attributes of writing</h3>
            <div className="w-full">
              <Select />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-10 flex items-center gap-3 bg-white border border-grey/20 rounded-lg py-3 px-6 text-sm font-semibold"
        >
          <IoIosAdd size={24}/> Drag a new stage into the template
        </button>
        <div className="flex flex-col gap-9 mt-10">
          <h1 className="text-2xl font-semibold">Duration</h1>
          <div className="rounded-lg md:max-w-[236px] max-w-full w-full flex items-center justify-center border-2 border-grey/20 border-dashed h-[200px]">
            <h1 className="text-lg text-gray-400">empty</h1>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTemplate;
