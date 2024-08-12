import Searchbar from "@/components/common/Searchbar"

const UserSelectModal = () => {
  return (
    <section className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-full z-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[444px]">
        <h6 className="text-lg font-semibold">User</h6>
        <div className="w-full mt-6">
          <Searchbar simple />
        </div>
      </div>
    </section>
  )
}

export default UserSelectModal