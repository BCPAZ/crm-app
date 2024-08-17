import Input from "@/components/common/Input";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import CustomSwitch from "@/components/common/Switch";
import { IoCamera } from "react-icons/io5";
const CreateNewUser = () => {
  return (
    <section className="w-full h-full py-5">
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Create new user</h1>
        <div className="w-full flex lg:flex-row flex-col justify-between gap-10 mt-24">
          <div className="lg:w-[38%] w-full flex  flex-col bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center flex-col">
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-500/50 relative group">
                <img
                  className="w-full h-full object-cover"
                  src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                  alt=""
                />
                <div className="hidden group-hover:flex flex-col gap-2 items-center justify-center w-full h-full bg-black/50 absolute top-0 left-0 right-0 bottom-0">
                  <IoCamera size={24} color="white" />
                  <span className="text-sm text-white">Update photo</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 max-w-[174px] text-center mt-6">
                Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <div className="flex flex-col gap-2 max-w-[247px]">
                <h3 className="text-sm font-semibold">Email verified</h3>
                <p className="text-sm">
                  Disabling this will automatically send the user a verification
                  email
                </p>
              </div>
                <CustomSwitch />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl lg:w-[62%] w-full shadow-lg">
            <div className="grid grid-cols-2 gap-5">
              <SecondInput column placeholder="Full Name" type="text" />
              <SecondInput column placeholder="Email address" type="text" />
              <SecondInput column placeholder="Phone Number" type="text" />
              <Select />
              <SecondInput column placeholder="Address" type="text" />
              <SecondInput column placeholder="ZIP Code" type="text" />
              <Input type="password" placeholder="Password" />
              <Select />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateNewUser;
