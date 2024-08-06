import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
const Profile = () => {
  return (
    <section className="h-screen">
      <div className="siteContainer">
        <h1 className="text-2xl mt-10 font-semibold">Profile</h1>
        <div className="w-full flex lg:flex-row flex-col justify-between gap-10" action="">
          <div className="lg:w-[38%] w-full">Lala</div>
          <div className="lg:w-[62%] w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <Input label="Name" placeholder="Enter your name" type="text" />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input label="Phone" placeholder="Enter your phone" type="text" />
              <Input
                label="Address"
                placeholder="Enter your address"
                type="text"
              />
              <Input label="City" placeholder="Enter your city" type="text" />
              <Input
                label="Zip/Code"
                placeholder="Enter your zip/code"
                type="text"
              />
            </div>
            <div className="mt-6">
            <TextArea label="About" placeholder="Write about problem" />
            </div>
            <div className="flex items-center justify-end">
            <button className="text-sm bg-secondary rounded-lg py-1.5 px-3 text-white font-medium mt-6">Save Changes</button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
