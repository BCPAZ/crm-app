import Button from "@/components/common/Button";
import CheckboxElement from "@/components/common/CheckboxElement";
import Select from "@/components/common/Select";

const Workflows = () => {
  return (
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">
              Search Process - Workflow
            </h1>
            <div className="w-[15%]">
              <Button value="Save" />
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer h-full  mt-10">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 py-10">
          <Select />
          <Select />
          <Select />
          <Select />
          <Select />
          <CheckboxElement label="Just my works" />
        </div>
      </div>
    </section>
  );
};

export default Workflows;
