import UserList from "@/components/App/Security/UserList"
const Users = () => {
  return (
      <section className="w-full h-full py-5">
        <div className="mx-auto w-full">
        <h1 className="text-2xl font-semibold">Users list</h1>
          <div className="mt-10 w-full">
            <UserList />
          </div>
        </div>
      </section>
  )
}

export default Users