import Button from "@/components/common/Button";

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
    </section>
  );
};

export default CreateTemplate;
