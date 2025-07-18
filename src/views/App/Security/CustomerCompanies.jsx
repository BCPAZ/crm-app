import CustomButton from "@/components/common/CustomButton";
import SecondInput from "@/components/common/SecondInput";
import Spinner from "@/components/common/Spinner";
import {
  useCreateCompanyMutation,
  useGetMyCompaniesQuery,
} from "@/data/services/companyService";
import useToast from "@/hooks/useToast";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const CustomerCompaniesModal = ({ showModal, closeModal }) => {
  const [createCompany, { isLoading, isSuccess, isError }] =
    useCreateCompanyMutation();
  const [formState, setFormState] = useState({
    name: "",
    voen: "",
    address: "",
    phone_number: "",
  });
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formState.name.trim()) {
      showToast("Şirkət adı boş ola bilməz", "error");
      return;
    }

    if (formState.name.length > 255) {
      showToast("Şirkət adı 255 simvoldan çox ola bilməz", "error");
      return;
    }

    if (formState.voen && formState.voen.length > 255) {
      showToast("VOEN 255 simvoldan çox ola bilməz", "error");
      return;
    }

    if (formState.address && formState.address.length > 255) {
      showToast("Ünvan 255 simvoldan çox ola bilməz", "error");
      return;
    }

    if (formState.phone_number && formState.phone_number.length > 255) {
      showToast("Telefon nömrəsi 255 simvoldan çox ola bilməz", "error");
      return;
    }

    createCompany(formState);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Müştəri şirkəti uğurla yaradıldı", "success");
      setFormState({
        name: "",
        voen: "",
        address: "",
        phone_number: "",
      });
      closeModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Müştəri şirkəti yaradılan zaman xəta baş verdi", "error");
    }
  }, [isError, showToast]);

  if (!showModal) return null;

  return (
    <div className="w-full h-screen bg-black/70 flex items-center justify-center z-20 fixed top-0 left-0 right-0 bottom-0">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-5 min-w-[60%] max-h-[90vh] overflow-y-auto">
        <h1 className="text-xl font-semibold">Yeni müştəri şirkəti yarat</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <SecondInput
            name="name"
            value={formState.name}
            onChange={handleChange}
            column
            label="* Şirkət adı"
            placeholder="Şirkət adını daxil edin"
            type="text"
          />
          <SecondInput
            name="voen"
            value={formState.voen}
            onChange={handleChange}
            column
            label="VOEN"
            placeholder="VOEN daxil edin"
            type="text"
          />
          <SecondInput
            name="address"
            value={formState.address}
            onChange={handleChange}
            column
            label="Ünvan"
            placeholder="Ünvan daxil edin"
            type="text"
          />
          <SecondInput
            name="phone_number"
            value={formState.phone_number}
            onChange={handleChange}
            column
            label="Telefon nömrəsi"
            placeholder="Telefon nömrəsini daxil edin"
            type="text"
          />
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 text-sm font-semibold rounded-lg flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Yarat"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="text-sm p-2 border border-grey/40 rounded-lg font-semibold bg-white"
            >
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CustomerCompaniesModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const CustomerCompanies = () => {
  const { data: companies = [], isFetching } = useGetMyCompaniesQuery();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCompanyClick = (companyId) => {
    navigate(`/companies/${companyId}`);
  };

  return (
    <section className="w-full h-full relative">
      <Toaster />
      <div className="py-10 px-5 h-full">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-semibold">Müştəri Şirkətləri</h1>
          <CustomButton
            value="Müştəri şirkəti yarat"
            functionality={() => setShowModal(true)}
          />
        </div>
        <div className="mt-[150px] h-full">
          {!isFetching && companies && companies.length > 0 ? (
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="min-h-[150px] relative p-4 flex flex-col justify-between rounded-lg border border-grey/40 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCompanyClick(company.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {company.image_url && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={company.image_url}
                          alt={company.name}
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">
                        {company.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <span>
                      Yaradılma tarixi:{" "}
                      {moment(company.created_at).format("DD.MM.YYYY")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full">
              {isFetching ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center flex-col gap-3">
                  <PiWarningOctagonDuotone size={48} />
                  <span className="text-lg font-medium">
                    Heç bir müştəri şirkəti tapılmadı
                  </span>
                  <p className="text-sm text-gray-500">
                    Yeni müştəri şirkəti yaratmaq üçün yuxarıdakı düyməni
                    istifadə edin
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <CustomerCompaniesModal showModal={showModal} closeModal={closeModal} />
    </section>
  );
};

export default CustomerCompanies;
