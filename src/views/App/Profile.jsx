import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { IoCamera } from "react-icons/io5";

const Profile = () => {
  return (
    <section className="">
      <div className="siteContainer">
        <h1 className="text-2xl mt-10 font-semibold">Profile</h1>
        <div className="w-full flex lg:flex-row flex-col justify-between gap-10 mt-24" action="">
          <div className="lg:w-[38%] w-full flex items-center flex-col">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-500/50 relative group">
              <img className="w-full h-full object-cover" src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt="" />
              <div className="hidden group-hover:flex flex-col gap-2 items-center justify-center w-full h-full bg-black/50 absolute top-0 left-0 right-0 bottom-0">
                <IoCamera size={24} color="white"/>
                <span className="text-sm text-white">Update photo</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 max-w-[174px] text-center mt-6">Allowed *.jpeg, *.jpg, *.png, *.gif
            Max size of 3.1 MB</p>
          </div>
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
