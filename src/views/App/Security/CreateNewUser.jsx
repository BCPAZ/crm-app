import Input from "@/components/common/Input"
import SecondInput from "@/components/common/SecondInput"
import Select from "@/components/common/Select"

const CreateNewUser = () => {
  return (
    <section className="w-full h-full py-5">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Create new user</h1>
        <div className="flex">
          <div className="w-[45%]">

          </div>
          <div className="bg-white p-6 rounded-xl w-[52%]">
            <div className="grid grid-cols-2 gap-5">
              <SecondInput column placeholder="Full Name" type="text"/>
              <SecondInput column placeholder="Email address" type="text"/>
              <SecondInput column placeholder="Phone Number" type="text"/>
              <Select />
              <SecondInput column placeholder="Address" type="text"/>
              <SecondInput column placeholder="ZIP Code" type="text"/>
              <Input type="password" placeholder="Password"/>
              <Select />
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateNewUser