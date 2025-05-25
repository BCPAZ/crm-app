import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import TextArea from "@/components/common/TextArea";
import { useCreateProjectMutation } from "@/data/services/projectService";
import useToast from "@/hooks/useToast";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateWork = () => {
  const [createProject, { isSuccess, isError, isLoading }] =
    useCreateProjectMutation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      customer_id: null,
      sub_works: [
        {
          name: "",
          worker_id: "",
          file: null,
          start_date: null,
          end_date: null,
          children: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_works",
  });

  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Tapşırıq uğurlu şəkildə yaradıldı", "success");
      setProjectName("");
      setProjectCode("");
      navigate("/works");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Tapşırıq yaradıla bilmədi", "error");
    }
  }, [isError]);

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
              render={({ field: { onChange, value } }) => (
                <SecondInput
                  column
                  label="* Tapşırıq adı"
                  placeholder="Tapşırıq adını daxil edin..."
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                />
              )}
            />
            <Controller
              name="code"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SecondInput
                  column
                  label="* Tapşırıq kodu"
                  placeholder="Tapşırıq kodunu daxil edin..."
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                />
              )}
            />
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextArea
                column
                label="Qeyd"
                placeholder="Qeyd daxil edin..."
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            )}
          />

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-semibold">Alt tapşırıqlar</h3>
            {fields.map((field) => (
              <div className="flex flex-col gap-4 border border-gray-200 p-5">
                <div
                  key={field.id}
                  className="grid md:grid-cols-5 grid-cols-1 gap-5 items-center"
                >
                  <Controller
                    name={`sub_works.${field.id}.name`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SecondInput
                        column
                        label="* Tapşırıq adı"
                        placeholder="Tapşırıq adını daxil edin..."
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    name={`sub_works.${field.id}.worker_id`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SecondInput
                        column
                        label="* Tapşırıq müəllifi"
                        placeholder="Tapşırıq müəllifini daxil edin..."
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    name={`sub_works.${field.id}.start_date`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SecondInput
                        column
                        type="date"
                        label="* Başlama tarixi"
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    name={`sub_works.${field.id}.end_date`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SecondInput
                        column
                        type="date"
                        label="* Bitmə tarixi"
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                      />
                    )}
                  />
                  <div className="mt-6">
                    <Button
                      value="Sil"
                      onClick={() => remove(field.id)}
                      disabled={fields.length === 1}
                    />
                  </div>
                </div>
                <Controller
                  name={`sub_works.${field.id}.end_date`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextArea
                      column
                      type="date"
                      label="* Bitmə tarixi"
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                    />
                  )}
                />
              </div>
            ))}
            <Button
              value="Alt tapşırıq əlavə et"
              onClick={() =>
                append({
                  name: "",
                  worker_id: "",
                  start_date: null,
                  end_date: null,
                  file: null,
                })
              }
            />
          </div>

          <div className="w-fit mt-3">
            <Button
              isLoading={isLoading}
              value="Tapşırıq  yarat"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateWork;
