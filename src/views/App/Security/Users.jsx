import UserTable from "@/components/App/Security/UserTable"
const Users = () => {
  return (
      <section className="w-full h-full py-5">
        <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Users list</h1>
          <div className="mt-10 w-full">
            <UserTable />
          </div>
        </div>
      </section>
  )
}

export default Users