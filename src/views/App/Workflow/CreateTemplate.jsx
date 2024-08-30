import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import SecondTextArea from "@/components/common/SecondTextArea";
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useGetGovernmentsQuery } from "@/data/services/companyService";
// import { useCreateTemplateMutation } from "@/data/services/templateService";
import UserSelectModal from "@/components/App/Cost/UserSelectModal";
import * as Yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTemplateMutation } from "@/data/services/templateService";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const createTemplateSchema = Yup.object().shape({
  name: Yup.string().required("Şablonun adını daxil edin"),
  description: Yup.string().nullable(),
  // duration:
});

const CreateTemplate = () => {
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const {
    data: governments = [],
    isLoading,
    isError,
  } = useGetGovernmentsQuery();
  const [createTemplate, {isSuccess:createSuccess , error : createError, isLoading: createIsLoading}] = useCreateTemplateMutation();

  const {showToast} = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTemplateSchema),
    defaultValues: {
      description: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "duration",
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    createTemplate(data)
  };

  const handleModal = (index) => {
    setModal(index);
  };

  const closeModal = () => {
    setModal(false);
  };
  const handleAddColumn = () => {
    append({
      companies: [],
      days: 1,
    });
  };

  const handleOnChangeCompany = (value, index) => {
    update(index, {
      ...fields[index],
      companies: [
        ...fields[index].companies,
        { id: value.id, name: value.name, image_url: value.image_url },
      ],
    });
  };

  const handleRemoveCompany = (fieldIndex, companyIndex) => {
    update(fieldIndex, {
      ...fields[fieldIndex],
      companies: [
        ...fields[fieldIndex].companies.slice(0, companyIndex),
        ...fields[fieldIndex].companies.slice(companyIndex + 1),
      ],
    });
  }

  useEffect(() => {
    if(createSuccess) {
      showToast("Şablon yaradıldı", "success");

      setTimeout(() => {
        navigate('/workflow/templates')
      }, 1500)
    }
  }, [createSuccess])

  useEffect(() => {
    if (createError) {
      showToast(createError?.message || "Şablon yaradılarkən xəta baş verdi", "error");
    }
  }, [createError])

  return (
    <section>
      <Toaster />
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">
              Şablon yaradın - Workflow
            </h1>
            <div className="w-[15%]">
              <Button value="Qeyd edin" form="create-template-form" isLoading={createIsLoading}/>
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <UserSelectModal
          isLoading={isLoading}
          isError={isError}
          options={governments}
          modal={modal}
          closeUserModal={closeModal}
          onChange={handleOnChangeCompany}
        />
        <form
          className="py-[60px]"
          onSubmit={handleSubmit(onSubmit)}
          id="create-template-form"
        >
          <div className="md:max-w-[750px] max-w-full">
            <div className="flex justify-center flex-col gap-5">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SecondInput
                    column
                    label="Şablonun adı"
                    placeholder="Şablonun adını daxil edin"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SecondTextArea
                    column
                    label="Əlavə məlumat"
                    placeholder="Əlavə məlumatı daxil edin"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-9 mt-10 w-full">
            <h1 className="text-2xl font-semibold">Müddət</h1>
            <div className="rounded-lg max-w-full w-full flex items-center justify-center gap-4 border-2 border-grey/20 border-dashed min-h-[200px] p-5 h-full">
              <div className="h-full p-10 rounded-lg bg-grey/20">
                <button type="button">
                  <FaPlay size={20} />
                </button>
              </div>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto py-5">
                {fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className="bg-grey/10 p-4 w-fit rounded-lg h-full min-w-[300px] flex flex-col"
                  >
                    <div className="flex items-center gap-2 w-full">
                     <Controller 
                      name={`duration.${fieldIndex}.days`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <SecondInput
                          label="Müddət"
                          placeholder="Müddət daxil edin"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          error={errors?.name?.message}
                          type="number"
                          min={1}
                          default={1}
                          step={1}
                        />
                      )}
                     />
                      <button
                        type="button"
                        onClick={() => handleModal(fieldIndex + 1)}
                        className="text-white bg-black p-4 rounded-md"
                      >
                        <MdAdd />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(fieldIndex)}
                        className="text-white bg-black p-4 rounded-md"
                      >
                        <MdClose />
                      </button>
                    </div>
                    <div className="p-2 flex flex-col gap-2">
                      {field.companies.map((company, companyIndex) => (
                        <div
                          className="p-2 bg-white rounded-lg flex items-center justify-between gap-2"
                          key={companyIndex}
                        >
                          <div className="flex items-center gap-1">
                            <img
                              className="w-[30px] h-[30px] rounded-full"
                              src={company?.image_url}
                              alt=""
                            />
                            <span className="text-sm font-medium">
                              {company?.name}
                            </span>
                          </div>
                          <button className="text-black" onClick={() => handleRemoveCompany(fieldIndex, companyIndex)}>
                            <MdClose size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddColumn}
                  className="p-4 rounded-md mx-4 bg-white border border-grey/20 flex items-center gap-2 font-semibold text-sm text-nowrap"
                >
                  <MdAdd size={18} /> Yeni timeline yarat
                </button>
              </div>
              <div className="h-full p-10 rounded-lg bg-grey/20">
                <button type="button">
                  <FaStop size={20} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTemplate;
