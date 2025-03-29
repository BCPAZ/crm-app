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
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

const CreateNewUser = () => {
  const { data: roles = [] } = useGetRolesQuery();
  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone_number: "",
    role_id: null,
    address: "",
    city: "",
    zip_code: "",
    password: "",
    about: "",
    avatar: null,
    type: null
  });

  const myData = [
    {
      id: "CONTRACTOR",
      name: "İşçi"
    },
    {
      id: "CUSTOMER",
      name: "Müştəri"
    }
  ]

  useEffect(() => {
    if (roles.length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        role_id: roles[0]?.id || null,
      }));
    }
  }, [roles]);

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
      role_id: selectedRole,
    }));
  };

  const handleTypeChange = (selectedType) => {
    setFormState((prevState) => ({
      ...prevState,
      type: selectedType
    }))
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 2,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        setFormState((prevState) => ({
          ...prevState,
          avatar: compressedFile,
        }));
      } catch (error) {
        showToast("Şəkil ölçüsü gözləniləndən böyükdür", "error");
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name) {
      showToast("Ad və soyad boş ola bilməz", "error");
      return;
    }

    if (!formState.email) {
      showToast("Elektron poçt boş ola bilməz", "error");
      return;
    }

    if (!formState.phone_number) {
      showToast("Telefon nömrəsi boş ola bilməz", "error");
      return;
    }

    if (!formState.role_id) {
      showToast("Rol seçilməlidir", "error");
      return;
    }

    if (!formState.password) {
      showToast("Şifrə qeyd edilməlidir", "error");
      return;
    }

    const formData = {
      ...formState,
      avatar: formState.avatar,
      type: formState?.type
    };
    createUser(formData);
  };


  useEffect(() => {
    if (isSuccess) {
      setFormState({
        name: "",
        email: "",
        phone_number: "",
        role_id: roles[0]?.id || null,
        address: "",
        city: "",
        zip_code: "",
        password: "",
        about: "",
        avatar: null,
        type: null
      });
      showToast("Hesab uğurlu şəkildə yaradıldı", "success");
      navigate("/users");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Hesab yaradılan zaman xəta baş verdi", "error");
    }
  }, [isError]);

  return (
    <section className="w-full h-full py-5">
      <Toaster />
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">İstifadəçi yaradın</h1>
        <div className="w-full flex lg:flex-row flex-col justify-between gap-10 mt-24">
          <div className="lg:w-[38%] w-full flex flex-col bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center h-full flex-col">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-500/50 group">
                <img
                  className="w-full h-full object-cover"
                  src={
                    formState.avatar
                      ? URL.createObjectURL(formState.avatar)
                      : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  }
                  alt="Profile Photo"
                />
                <div className="hidden group-hover:flex flex-col gap-2 items-center justify-center w-full h-full bg-black/50 absolute top-0 left-0 right-0 bottom-0">
                  <IoCamera size={24} color="white" />
                  <span className="text-sm text-white">Şəkil əlavə edin</span>
                </div>
                <input
                  autoComplete="false"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-gray-400 max-w-[174px] text-center mt-6">
                İcazə verilən formatlar : *.jpeg, *.jpg, *.png, *.gif. Şəkilin
                max ölçüsü 2MB olmalıdır.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl lg:w-[62%] w-full shadow-lg">
            <form
              autoComplete="false"
              className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full"
              onSubmit={handleSubmit}
            >
              <SecondInput
                name="name"
                value={formState.name}
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
                name="phone_number"
                value={formState.phone_number}
                onChange={handleChange}
                column
                placeholder="Telefon nömrəsi"
                type="text"
              />
              <Select
                name="role_id"
                options={roles}
                column
                value={
                  roles.length > 0
                    ? roles.find((role) => role.id === formState.role_id)
                    : null
                }
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
              <Select
                name="type"
                options={myData}
                column
                value={formState.type}
                onChange={handleTypeChange}
              />
              <button
                type="submit"
                className="col-span-2 bg-black text-white py-2 px-4 text-md font-semibold rounded-lg mt-4 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "İstifadəçi yarat"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateNewUser;
