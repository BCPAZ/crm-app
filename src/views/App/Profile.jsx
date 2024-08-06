import Input from "@/components/common/Input"

const Profile = () => {
  return (
    <section className="h-screen">
      <div className="siteContainer">
        <h1 className="text-2xl mt-10 font-semibold">Profile</h1>
        <div className="w-full flex justify-between" action="">
          <div className="w-[38%]">
              Lala
          </div>
          <div className="grid grid-cols-2 gap-6 w-[62%]">
            <Input label="Name" placeholder="Enter your name" type="text" />
            <Input label="Email" placeholder="Enter your email" type="email"/>
            <Input label="Phone" placeholder="Enter your phone" type="text"/>
            <Input label="Address" placeholder="Enter your address" type="text"/>
            <Input label="City" placeholder="Enter your city" type="text"/>
            <Input label="Zip/Code" placeholder="Enter your zip/code" type="text"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile