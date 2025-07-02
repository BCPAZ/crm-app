import Button from "@/components/common/Button";
import FileUploader from "@/components/common/FileUploader";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { useGetCustomerCompaniesQuery } from "@/data/services/companyService";
import { useGetCompanyUsersQuery } from "@/data/services/usersService";
import { useCreateWorkMutation } from "@/data/services/workService";
import useToast from "@/hooks/useToast";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { defaultStyles, FileIcon } from "react-file-icon";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const yupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Layihə adını daxil edin")
    .required("Layihə adını daxil edin"),
  code: Yup.string().required("Layihə kodunu daxil edin"),
  description: Yup.string(),
  customer_id: Yup.number().required("Müştərini seçin"),
  sub_works: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Layihə adını daxil edin"),
      description: Yup.string(),
      start_date: Yup.string().required("Layihə başlama tarixini daxil edin"),
      end_date: Yup.string().required("Layihə bitmə tarixini daxil edin"),
      file: Yup.mixed().nullable(),
      worker_id: Yup.number().required("Layihə sənədi daxil edin"),
      children: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("Layihə adını daxil edin"),
            description: Yup.string(),
            start_date: Yup.string().required(
              "Layihə başlama tarixini daxil edin"
            ),
            end_date: Yup.string().required("Layihə bitmə tarixini daxil edin"),
            file: Yup.mixed().nullable(),
            worker_id: Yup.number().required("Layihə sənədi daxil edin"),
          })
        )
        .nullable(),
    })
  ),
});

const CreateWork = () => {
  const [createProject, { isSuccess, isError, isLoading }] =
    useCreateWorkMutation();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      customer_id: null,
      company_customer_id: null,
      users: [],
      sub_works: [
        {
          name: "",
          worker_id: null,
          file: null,
          start_date: "",
          end_date: "",
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

  const { data: companyUserResult = {} } = useGetCompanyUsersQuery({
    limit: 1000000,
  });

  const { users: companyUsers = [] } = companyUserResult;

  const { showToast } = useToast();
  const navigate = useNavigate();
  const [selectedPeople, setSelectedPeople] = useState([]);

  const onSubmit = (data) => {
    createProject({
      ...data,
      users: selectedPeople.map((user) => user.id),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Layihə uğurlu şəkildə yaradıldı", "success");
      navigate("/works");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Layihə yaradıla bilmədi", "error");
    }
  }, [isError]);

  useEffect(() => {
    const characters = watch("name").split(" ");
    const code = characters
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    if (code) {
      const random = Math.floor(Math.random() * (999 - 100 + 1) + 100);

      setValue("code", `${code}-${random}`);
    }
  }, [watch("name")]);

  const { data: companies } = useGetCustomerCompaniesQuery();

  return (
    <section className="w-full h-full py-10">
      <Toaster />
      <div className="siteContainer">
        <h1 className="text-2xl font-semibold">Layihə yarat</h1>
        <div className="flex flex-col gap-4 w-full h-full mt-10">
          <div className="flex flex-row gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <SecondInput
                  column
                  type="text"
                  label="* Layihə adı"
                  placeholder="Layihə adını daxil edin..."
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
                  label="* Layihə kodu"
                  placeholder="Layihə kodunu daxil edin..."
                  error={errors.code?.message}
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            name="company_customer_id"
            control={control}
            render={({ field }) => (
              <Select
                column
                label="Müştəri"
                placeholder="Qeyd daxil edin..."
                options={companies}
                error={errors.customer_id?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="customer_id"
            control={control}
            render={({ field }) => (
              <Select
                column
                label="Cavabdeh şəxs"
                placeholder="Qeyd daxil edin..."
                options={companyUsers}
                error={errors.customer_id?.message}
                {...field}
              />
            )}
          />

          <Listbox
            value={selectedPeople}
            onChange={setSelectedPeople}
            multiple
            as="nav"
            className="relative"
          >
            <div className={`flex flex-col gap-2`}>
              <label
                className={`text-sm font-base font-base text-gray-500}`}
                htmlFor=""
              >
                Yoxlayanlar
              </label>
              <ListboxButton className="w-full border border-grey/20 text-gray-500 text-start p-4 rounded-lg text-sm flex items-center justify-between">
                {selectedPeople.map((person) => person.name).join(", ") ||
                  "Yoxlayanlar"}
              </ListboxButton>
            </div>

            <ListboxOptions className="p-4 bg-white shadow-lg absolute top-[100%] h-[250px] overflow-y-scroll z-20 left-0 w-full outline-none rounded-xl">
              {companyUsers.map((person) => (
                <ListboxOption
                  key={person.id}
                  value={person}
                  className="data-focus:bg-blue-100"
                >
                  {person.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>

          {watch("users")?.map((user) => {
            return (
              // render users list like badge and remove button
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{user?.name}</span>
                </div>
              </div>
            );
          })}

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
            <h3 className="text-md font-semibold">Alt Layihələr</h3>
            {fields.map((field, index) => {
              return (
                <SubWork
                  key={field.id}
                  index={index}
                  field={field}
                  control={control}
                  errors={errors}
                  fields={fields}
                  companyUsers={companyUsers}
                  remove={remove}
                />
              );
            })}

            <Button
              value="Sətir əlavə et"
              onClick={() =>
                append({
                  name: "",
                  worker_id: "",
                  start_date: "",
                  end_date: "",
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
              value="Layihə yarat"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SubWork = ({
  field,
  fields,
  index,
  control,
  errors,
  companyUsers = [],
  remove,
}) => {
  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];

    return <FileIcon extension={ext} {...style} />;
  };

  const {
    fields: childFields,
    append: childAppend,
    remove: childRemove,
  } = useFieldArray({
    control,
    name: `sub_works.${index}.children`,
  });

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
              label="* Layihə adı"
              placeholder="Layihə adını daxil edin..."
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
            label="Layihə üçün Qeyd"
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
                    onChange(e.target.files?.length ? e.target.files[0] : [])
                  }
                  error={errors.file?.message}
                />
              )}
            </>
          );
        }}
      />

      <div className="flex flex-col gap-4">
        <h3 className="text-md font-semibold">Alt Layihələr</h3>
        {childFields.map((child, childIndex) => {
          return (
            <div
              key={child.id}
              className="flex flex-col gap-4 border border-gray-200 p-5"
            >
              <div className="grid md:grid-cols-5 grid-cols-1 gap-5 items-center">
                <Controller
                  name={`sub_works.${index}.children.${childIndex}.name`}
                  control={control}
                  render={({ field }) => (
                    <SecondInput
                      column
                      label="* Layihə adı"
                      placeholder="Layihə adını daxil edin..."
                      error={
                        errors.sub_works?.[index]?.children?.[childIndex]?.name
                          ?.message
                      }
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`sub_works.${index}.children.${childIndex}.worker_id`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      column
                      label="Cavabden şəxs"
                      options={companyUsers}
                      error={
                        errors.sub_works?.[index]?.children?.[childIndex]
                          ?.worker_id?.message
                      }
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`sub_works.${index}.children.${childIndex}.start_date`}
                  control={control}
                  render={({ field }) => (
                    <SecondInput
                      column
                      type="date"
                      label="* Başlama tarixi"
                      error={
                        errors.sub_works?.[index]?.children?.[childIndex]
                          ?.start_date?.message
                      }
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`sub_works.${index}.children.${childIndex}.end_date`}
                  control={control}
                  render={({ field }) => (
                    <SecondInput
                      column
                      type="date"
                      label="* Bitmə tarixi"
                      error={
                        errors.sub_works?.[index]?.children?.[childIndex]
                          ?.end_date?.message
                      }
                      {...field}
                    />
                  )}
                />
                <div className="mt-6">
                  <Button onClick={() => childRemove(childIndex)} value="Sil" />
                </div>
              </div>
              <Controller
                name={`sub_works.${index}.children.${childIndex}.description`}
                control={control}
                render={({ field }) => (
                  <TextArea
                    column
                    label="Layihə üçün Qeyd"
                    placeholder="Qeyd daxil edin..."
                    error={
                      errors.sub_works?.[index]?.children?.[childIndex]
                        ?.description?.message
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name={`sub_works.${index}.children.${childIndex}.file`}
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
                              e.target.files?.length ? e.target.files[0] : []
                            )
                          }
                          error={
                            errors.sub_works?.[index]?.children?.[childIndex]
                              ?.file?.message
                          }
                        />
                      )}
                    </>
                  );
                }}
              />
            </div>
          );
        })}
      </div>

      <Button
        value="Alt Layihə əlavə et"
        onClick={() => {
          childAppend({
            name: "",
            worker_id: null,
            file: null,
            start_date: "",
            end_date: "",
            description: "",
          });
        }}
      />
    </div>
  );
};

export default CreateWork;
