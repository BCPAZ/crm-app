import CustomButton from "@/components/common/CustomButton";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import Spinner from "@/components/common/Spinner";
import TextArea from "@/components/common/TextArea";
import {
  useCreateCompanyUserMutation,
  useGetCompanyDetailsQuery,
  useGetCompanyUsersQuery,
} from "@/data/services/companyService";
import { useGetRolesQuery } from "@/data/services/rolesPermissionsService";
import useToast from "@/hooks/useToast";
import imageCompression from "browser-image-compression";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { useParams } from "react-router-dom";

const CreateUserModal = ({ showModal, closeModal, companyId }) => {
  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateCompanyUserMutation();
  const { data: roles = [] } = useGetRolesQuery();
  const { showToast } = useToast();

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
    type: "CUSTOMER",
  });

  const typeOptions = [
    {
      id: "CONTRACTOR",
      name: "İşçi",
    },
    {
      id: "CUSTOMER",
      name: "Müştəri",
    },
  ];

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
      type: selectedType,
    }));
  };

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
      type: formState?.type,
    };
    createUser({ companyId, data: formData });
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
        type: null,
      });
      showToast("İstifadəçi uğurla yaradıldı", "success");
      closeModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("İstifadəçi yaradıla bilmədi", "error");
    }
  }, [isError]);

  if (!showModal) return null;

  return (
    <div className="w-full h-screen bg-black/70 flex items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[80%] max-h-[90vh] overflow-y-auto">
        <h1 className="text-xl font-semibold">Yeni istifadəçi yarat</h1>

        <div className="flex lg:flex-row flex-col gap-6">
          {/* Avatar Section */}
          <div className="lg:w-[30%] w-full flex flex-col bg-grey/10 rounded-xl p-4">
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

          {/* Form Section */}
          <div className="lg:w-[70%] w-full">
            <form
              autoComplete="false"
              className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full"
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
                placeholder="Rol seçin"
              />
              <SecondInput
                name="address"
                value={formState.address}
                onChange={handleChange}
                column
                placeholder="Ünvan"
                type="text"
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
                name="zip_code"
                value={formState.zip_code}
                onChange={handleChange}
                column
                placeholder="Poçt kodu"
                type="text"
              />
              <Input
                name="password"
                value={formState.password}
                onChange={handleChange}
                type="password"
                placeholder="Şifrə"
              />
              <div className="md:col-span-2">
                <TextArea
                  name="about"
                  value={formState.about}
                  onChange={handleChange}
                  placeholder="İstifadəçi haqqında məlumat"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 text-sm font-semibold rounded-lg flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "İstifadəçi yarat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateUserModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
};

const CompanyDetail = () => {
  const { companyId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    type: "",
  });

  const {
    data: companyDetails,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useGetCompanyDetailsQuery(companyId);
  const { data: usersData, isLoading: isUsersLoading } =
    useGetCompanyUsersQuery({
      companyId,
      page: currentPage,
      limit: 10,
      ...filters,
    });

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isCompanyLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isCompanyError) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-3">
        <PiWarningOctagonDuotone size={48} />
        <span className="text-lg font-medium">Şirkət tapılmadı</span>
      </div>
    );
  }

  const company = companyDetails?.company || {};
  const users = usersData?.users || [];
  const meta = usersData?.meta || {};

  return (
    <section className="w-full h-full relative">
      <Toaster />
      <div className="py-10 px-5 h-full">
        {/* Company Information */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-6">{company.name}</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-grey/40">
              <h2 className="text-lg font-semibold mb-4">Şirkət Məlumatları</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Ad:</span>
                  <span>{company.name}</span>
                </div>
                {company.voen && (
                  <div className="flex justify-between">
                    <span className="font-medium">VOEN:</span>
                    <span>{company.voen}</span>
                  </div>
                )}
                {company.address && (
                  <div className="flex justify-between">
                    <span className="font-medium">Ünvan:</span>
                    <span>{company.address}</span>
                  </div>
                )}
                {company.phone_number && (
                  <div className="flex justify-between">
                    <span className="font-medium">Telefon nömrəsi:</span>
                    <span>{company.phone_number}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Yaradılma tarixi:</span>
                  <span>{moment(company.created_at).format("DD.MM.YYYY")}</span>
                </div>
              </div>
            </div>
            {company.image_url && (
              <div className="bg-white p-6 rounded-lg border border-grey/40">
                <h2 className="text-lg font-semibold mb-4">Şirkət Loqosu</h2>
                <div className="flex justify-center">
                  <img
                    src={company.image_url}
                    alt={company.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-lg border border-grey/40">
          <div className="p-6 border-b border-grey/40">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                İstifadəçilər ({meta.total || 0})
              </h2>
              <CustomButton
                value="Yeni istifadəçi yarat"
                functionality={() => setShowModal(true)}
                icon={<FaUserPlus />}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-grey/40">
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Axtar"
                type="text"
                placeholder="Nömrə, email və ya nömrə ilə axtar"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="p-6">
            {isUsersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Spinner />
              </div>
            ) : users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-grey/40">
                      <th className="text-left py-3 px-4 font-medium">Ad</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Telefon
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Qeydiyyat tarixi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-grey/20 hover:bg-grey/10"
                      >
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          {user.phone_number || "-"}
                        </td>

                        <td className="py-3 px-4">
                          {moment(user.created_at).format("DD.MM.YYYY")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col gap-3 py-8">
                <PiWarningOctagonDuotone size={48} />
                <span className="text-lg font-medium">
                  Heç bir istifadəçi tapılmadı
                </span>
                <p className="text-sm text-gray-500">
                  Bu şirkətə aid istifadəçi yoxdur
                </p>
              </div>
            )}

            {/* Pagination */}
            {meta.last_page > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  meta={{
                    current_page: meta?.current_page,
                    last_page: meta?.last_page,
                  }}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateUserModal
        showModal={showModal}
        closeModal={closeModal}
        companyId={companyId}
      />
    </section>
  );
};

export default CompanyDetail;
