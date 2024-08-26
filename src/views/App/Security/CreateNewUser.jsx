import { useEffect, useState } from "react";
import { useCreateUserMutation } from "@/data/services/usersService";
import { useGetRolesQuery } from "@/data/services/rolesPermissionsService";
import Input from "@/components/common/Input";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import { IoCamera } from "react-icons/io5";
import Spinner from "@/components/common/Spinner";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";
// import CustomSwitch from "@/components/common/Switch";

const CreateNewUser = () => {
  const { data: roles = [] } = useGetRolesQuery();
  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();
  const { showToast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    role_id: roles[0]?.id || null,
    address: "",
    city: "",
    zip_code: "",
    password: "",
    about: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedRole) => {
    setFormState((prevState) => ({
      ...prevState,
      role_id: selectedRole?.id || null,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState((prevState) => ({
        ...prevState,
        avatar: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formState);
  };

  useEffect(() => {
    if (isSuccess) {
      setFormState({
        name: "",
        email: "",
        phone: "",
        role_id: null,
        address: "",
        city: "",
        zip_code: "",
        password: "",
        about: "",
        avatar: null,
      });
      showToast("Hesab uğurlu şəkildə yaradıldı", "success");
    }
  }, []);

  return (
    <section className="w-full h-full py-5">
      <Toaster />
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">İstifadəçi yaradın</h1>
        <div className="w-full flex lg:flex-row flex-col justify-between gap-10 mt-24">
          <div className="lg:w-[38%] w-full flex flex-col bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center h-full flex-col">
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-500/50 relative group">
                <img
                  className="w-full h-full object-cover"
                  src={
                    formState.avatar
                      ? URL.createObjectURL(formState.avatar)
                      : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                  }
                  alt=""
                />
                <div className="hidden group-hover:flex flex-col gap-2 items-center justify-center w-full h-full bg-black/50 absolute top-0 left-0 right-0 bottom-0">
                  <IoCamera size={24} color="white" />
                  <span className="text-sm text-white">Update photo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-400 max-w-[174px] text-center mt-6">
                Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB
              </p>
            </div>
            {/* <div className="flex justify-between mt-5">
              <div className="flex flex-col gap-2 max-w-[247px]">
                <h3 className="text-sm font-semibold">Email verified</h3>
                <p className="text-sm">
                  Disabling this will automatically send the user a verification
                  email
                </p>
              </div>
              <CustomSwitch />
            </div> */}
          </div>
          {/* TODO : grid problem fix */}
          <div className="bg-white p-6 rounded-xl lg:w-[62%] w-full shadow-lg">
            <div className="w-full">
              <form
                className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full"
                onSubmit={handleSubmit}
              >
                <SecondInput
                  name="name"
                  value={formState.fullName}
                  onChange={handleChange}
                  column
                  placeholder="Ad və soyad"
                  type="text"
                />
                <SecondInput
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  column
                  placeholder="Elektron poçt"
                  type="text"
                />
                <SecondInput
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  column
                  placeholder="Telefon nömrəsi"
                  type="text"
                />
                <Select
                  options={roles}
                  column
                  value={roles.find((role) => role.id === formState.role_id)}
                  onChange={handleRoleChange}
                />
                <SecondInput
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  column
                  placeholder="Şəhər"
                  type="text"
                />
                <SecondInput
                  name="address"
                  value={formState.address}
                  onChange={handleChange}
                  column
                  placeholder="Address"
                  type="text"
                />
                <SecondInput
                  name="zip_code"
                  value={formState.zip_code}
                  onChange={handleChange}
                  column
                  placeholder="Poçt Kodu"
                  type="text"
                />
                <SecondInput
                  name="about"
                  value={formState.about}
                  onChange={handleChange}
                  column
                  placeholder="Haqqında"
                  type="text"
                />
                <Input
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Şifrə"
                />
                <button
                  type="submit"
                  className="col-span-2 bg-black text-white py-2 px-4 text-md font-semibold rounded-lg mt-4 flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Create User"}
                </button>
                {isSuccess && (
                  <p className="text-green-500">User created successfully!</p>
                )}
                {isError && (
                  <p className="text-red-500">
                    An error occurred. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateNewUser;
