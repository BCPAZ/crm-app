import Button from "@/components/common/Button";
import FileUploader from "@/components/common/FileUploader";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { useCreateProjectMutation } from "@/data/services/projectService";
import { useGetCompanyUsersQuery } from "@/data/services/usersService";
import { useCreateWorkMutation } from "@/data/services/workService";
import useToast from "@/hooks/useToast";
import { useEffect } from "react";
import { defaultStyles, FileIcon } from "react-file-icon";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const yupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Tapşırıq adını daxil edin")
    .required("Tapşırıq adını daxil edin"),
  code: Yup.string().required("Tapşırıq kodunu daxil edin"),
  description: Yup.string(),
  customer_id: Yup.number().required("Müştərini seçin"),
  sub_works: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Tapşırıq adını daxil edin"),
      description: Yup.string(),
      start_date: Yup.string().required("Tapşırıq başlama tarixini daxil edin"),
      end_date: Yup.string().required("Tapşırıq bitmə tarixini daxil edin"),
      file: Yup.mixed().required("Tapşırıq faylı daxil edin"),
      worker_id: Yup.number().required("Tapşırıq sənədi daxil edin"),
    })
  ),
});

const CreateWork = () => {
  const [createProject, { isSuccess, isError, isLoading }] =
    useCreateWorkMutation();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      customer_id: null,
      sub_works: [
        {
          name: "",
          worker_id: null,
          file: null,
          start_date: null,
          end_date: null,
          description: "",
          children: [],
        },
      ],
    },
    resolver: yupResolver(yupSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "sub_works",
  });

  const { data: companyUserResult = {} } = useGetCompanyUsersQuery();

  const { users: companyUsers = [] } = companyUserResult;

  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createProject(data);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Tapşırıq uğurlu şəkildə yaradıldı", "success");
      navigate("/works");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Tapşırıq yaradıla bilmədi", "error");
    }
  }, [isError]);

  // Fayl seçimi üçün handler (react-hook-form-un file input dəstəyi üçün)
  const handleFileChange = (e, index) => {
    setValue(`sub_works.${index}.file`, e.target.files[0]);
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];

    return <FileIcon extension={ext} {...style} />;
  };

  return (
    <section className="w-full h-full py-10">
      <Toaster />
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Tapşırıq yarat</h1>
        <div className="flex flex-col gap-4 w-full h-full mt-10">
          <div className="flex flex-row gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <SecondInput
                  column
                  type="text"
                  label="* Tapşırıq adı"
                  placeholder="Tapşırıq adını daxil edin..."
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <SecondInput
                  column
                  label="* Tapşırıq kodu"
                  placeholder="Tapşırıq kodunu daxil edin..."
                  error={errors.code?.message}
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            name="customer_id"
            control={control}
            render={({ field }) => (
              <Select
                column
                label="Müştəri"
                placeholder="Qeyd daxil edin..."
                options={companyUsers}
                error={errors.customer_id?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                column
                label="Qeyd"
                placeholder="Qeyd daxil edin..."
                error={errors.description?.message}
                {...field}
              />
            )}
          />

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-semibold">Alt tapşırıqlar</h3>
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="flex flex-col gap-4 border border-gray-200 p-5"
                >
                  <div className="grid md:grid-cols-5 grid-cols-1 gap-5 items-center">
                    <Controller
                      name={`sub_works.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <SecondInput
                          column
                          label="* Tapşırıq adı"
                          placeholder="Tapşırıq adını daxil edin..."
                          error={errors.sub_works?.[index]?.name?.message}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name={`sub_works.${index}.worker_id`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          column
                          label="Cavabden şəxs"
                          options={companyUsers}
                          error={errors.sub_works?.[index]?.worker_id?.message}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name={`sub_works.${index}.start_date`}
                      control={control}
                      render={({ field }) => (
                        <SecondInput
                          column
                          type="date"
                          label="* Başlama tarixi"
                          error={errors.sub_works?.[index]?.start_date?.message}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name={`sub_works.${index}.end_date`}
                      control={control}
                      render={({ field }) => (
                        <SecondInput
                          column
                          type="date"
                          label="* Bitmə tarixi"
                          error={errors.sub_works?.[index]?.end_date?.message}
                          {...field}
                        />
                      )}
                    />
                    <div className="mt-6">
                      <Button
                        onClick={() => remove(index)}
                        value="Sil"
                        disabled={fields.length === 1}
                      />
                    </div>
                  </div>

                  <Controller
                    name={`sub_works.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        column
                        label="Tapşırıq üçün Qeyd"
                        placeholder="Qeyd daxil edin..."
                        error={errors.sub_works?.[index]?.description?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`sub_works.${index}.file`}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <>
                          {value?.name ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 mt-2 mb-4">
                                <div className="w-[20px] h-[20px]">
                                  {renderFileIcon(value.name)}
                                </div>
                                <div className="text-sm">{value.name}</div>
                              </div>
                              <button
                                className="text-red-500"
                                onClick={() => onChange(null)}
                              >
                                <MdClose />
                              </button>
                            </div>
                          ) : (
                            <FileUploader
                              label="Sənəd"
                              onChange={(e) =>
                                onChange(
                                  e.target.files?.length
                                    ? e.target.files[0]
                                    : []
                                )
                              }
                              error={errors.file?.message}
                            />
                          )}
                        </>
                      );
                    }}
                  />

                  {field["children"]?.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-md font-semibold">Alt tapşırıqlar</h3>
                      {field["children"].map((child, index) => {
                        return (
                          <div
                            key={child.id}
                            className="flex flex-col gap-4 border border-gray-200 p-5"
                          >
                            <div className="grid md:grid-cols-5 grid-cols-1 gap-5 items-center">
                              <Controller
                                name={`sub_works.${index}.name`}
                                control={control}
                                render={({ field }) => (
                                  <SecondInput
                                    column
                                    label="* Tapşırıq adı"
                                    placeholder="Tapşırıq adını daxil edin..."
                                    error={
                                      errors.sub_works?.[index]?.name?.message
                                    }
                                    {...field}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Button
                    value="Alt tapşırıq əlavə et"
                    onClick={() => {
                      update(index, {
                        ...field,
                        children: field["children"].concat({
                          name: "",
                          worker_id: "",
                          start_date: null,
                          end_date: null,
                          description: "",
                          file: null,
                          children: [],
                        }),
                      });
                    }}
                  />
                </div>
              );
            })}

            <Button
              value="Sətir əlavə et"
              onClick={() =>
                append({
                  name: "",
                  worker_id: "",
                  start_date: null,
                  end_date: null,
                  description: "",
                  file: null,
                  children: [],
                })
              }
            />
          </div>

          <div className="w-fit mt-3">
            <Button
              isLoading={isLoading}
              value="Tapşırıq yarat"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateWork;
