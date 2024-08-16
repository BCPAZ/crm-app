import IssueTable from "@/components/App/FieldManagement/IssueTable"

const Issues = () => {
  return (
    <section className="py-10">
      <div className="siteContainer">
        <h1 className="text-xl font-semibold">Recently Added</h1>
        <IssueTable />
      </div>
    </section>
  )
}

export default Issues