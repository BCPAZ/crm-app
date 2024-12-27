import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import SecondTextArea from "@/components/common/SecondTextArea";
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import UserSelectModal from "@/components/App/Cost/UserSelectModal";
import * as Yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDetailInternalTemplateQuery,
  useUpdateInternalTemplateMutation,
} from "@/data/services/templateService";
import { useGetCompanyUsersQuery } from "@/data/services/usersService";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const updateTemplateSchema = Yup.object().shape({
  name: Yup.string().required("Şablonun adını daxil edin"),
  description: Yup.string().nullable(),
});

const UpdateInternalTemplate = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const { data, isLoading: isDetailLoading } = useDetailInternalTemplateQuery(id);
  const { data: userData, isLoading, isError } = useGetCompanyUsersQuery();
  const users = userData?.users;

  const [
    updateTemplate,
    {
      isSuccess: updateSuccess,
      error: updateError,
      isLoading: updateIsLoading,
    },
  ] = useUpdateInternalTemplateMutation();

  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateTemplateSchema),
    defaultValues: {
      description: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "duration",
  });

  const handleModal = (index) => {
    setModal(index);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleAddColumn = () => {
    append({
      users: [],
      days: 1,
    });
  };

  const handleOnChangeUsers = (value, index) => {
    update(index, {
      ...fields[index],
      users: [
        ...fields[index].users,
        { id: value.id, name: value.name, avatar_url: value.avatar_url },
      ],
    });
  };

  const handleRemoveUser = (fieldIndex, userIndex) => {
    update(fieldIndex, {
      ...fields[fieldIndex],
      users: [
        ...fields[fieldIndex].users.slice(0, userIndex),
        ...fields[fieldIndex].users.slice(userIndex + 1),
      ],
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      showToast("Şablon yeniləndi", "success");
      setTimeout(() => {
        navigate("/internal-templates");
      }, 1500);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      showToast(
        updateError?.message || "Şablon yenilənərkən xəta baş verdi",
        "error"
      );
    }
  }, [updateError]);

  useEffect(() => {
    if (data) {
      setValue("name", data?.name);
      setValue("description", data?.description);
      setValue("duration", data?.duration || []);
    }
  }, [data]);

   const onSubmit = (data) => {
    updateTemplate({ id, data });
  };


  return (
    <section>
      <Toaster />
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">
              Şablonu Yeniləyin - Daxili İş axını
            </h1>
            <div className="w-[15%]">
              <Button
                value="Yeniləyin"
                form="update-template-form"
                isLoading={updateIsLoading || isDetailLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <UserSelectModal
          isLoading={isLoading}
          isError={isError}
          options={users}
          modal={modal}
          closeUserModal={closeModal}
          onChange={handleOnChangeUsers}
        />
        <form
          className="py-[60px]"
          onSubmit={handleSubmit(onSubmit)}
          id="update-template-form"
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
            <h1 className="text-2xl font-semibold">Daxili iş axını</h1>
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
                      {field.users.map((user, userIndex) => (
                        <div
                          className="p-2 bg-white rounded-lg flex items-center justify-between gap-2"
                          key={userIndex}
                        >
                          <div className="flex items-center gap-1">
                            <img
                              className="w-[30px] h-[30px] rounded-full"
                              src={user?.avatar_url}
                              alt=""
                            />
                            <span className="text-sm font-medium">
                              {user?.name}
                            </span>
                          </div>
                          <button
                            className="text-black"
                            onClick={() =>
                              handleRemoveUser(fieldIndex, userIndex)
                            }
                          >
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

export default UpdateInternalTemplate;
