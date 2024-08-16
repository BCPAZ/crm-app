import IssueTable from "@/components/App/FieldManagement/IssueTable";

const Issues = () => {
  return (
    <section className="py-10">
      <div className="siteContainer">
        <div className="bg-white rounded-xl shadow-lg py-10 px-6">
          <h1 className="text-xl font-semibold">Recently Added</h1>
          <div className="mt-10">
            <IssueTable />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Issues;
