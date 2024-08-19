import TemplateTable from "@/components/App/Workflow/TemplateTable";

const Templates = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Templates</h1>
        <div className="h-full w-full mt-10">
          <TemplateTable />
        </div>
      </div>
    </section>
  );
};

export default Templates;
