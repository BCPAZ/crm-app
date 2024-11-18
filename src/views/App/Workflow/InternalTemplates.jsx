import InternalTemplateTable from "@/components/App/Workflow/InternalTemplateTable";

const Templates = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Daxili Şablonlar</h1>
        <div className="h-full w-full mt-10">
          <InternalTemplateTable />
        </div>
      </div>
    </section>
  );
};

export default Templates;
