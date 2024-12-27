import Button from "@/components/common/Button";
import FileUploader from "@/components/common/FileUploader";
import SecondInput from "@/components/common/SecondInput";
import SecondTextArea from "@/components/common/SecondTextArea";
import Select from "@/components/common/Select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useUploadDocumentMutation } from "@/data/services/documentService";
import { useSelector } from "react-redux";
import { defaultStyles, FileIcon } from "react-file-icon";
import { MdClose } from "react-icons/md";
import { useGetTemplatesQuery, useGetInternalTemplatesQuery } from "@/data/services/templateService";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const uploadFormSchema = Yup.object().shape({
  name: Yup.string().required("Sənədin adını daxil edin"),
  comment: Yup.string().nullable(),
  page_size: Yup.number().nullable().min(1),
  template_id: Yup.number().nullable().min(1),
  internal_template_id: Yup.number().nullable().min(1),
  file: Yup.mixed(),
  document_no: Yup.string().nullable(),
  author: Yup.string().nullable(),
  type: Yup.string().required("Sənədin tipini daxil edin"),
});

const documentTypes = [
  {
    id: "register",
    name: "Reestr",
  },
  {
    id: "drawings",
    name: "Çertyoj",
  },
  {
    id: "temporary",
    name: "Müvəqqəti",
  },
];

const UploadNewDocument = () => {
  const [uploadDocument, { isLoading, isSuccess, isError }] =
    useUploadDocumentMutation();

  const { data: templates = [] } = useGetTemplatesQuery();
  const { data: internalTemplates = [] } = useGetInternalTemplatesQuery();

  const { user } = useSelector((state) => state.auth);

  const { showToast } = useToast();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(uploadFormSchema),
    defaultValues: {
      author: user?.company?.name,
      comment: "",
    },
  });

  const onSubmit = (data) => {
    uploadDocument(data);
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];

    return <FileIcon extension={ext} {...style} />;
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Sənəd uğurla yükləndi", "success");
      navigate('/document-register')
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Sənəd yükləməsi uğursuz oldu", "error");
    }
  }, [isError]);

  return (
    <section className="w-full h-full">
      <div className="max-w-[1080px] w-full flex lg:flex-row flex-col justify-between mx-auto px-5 gap-10 py-10">
        <form
          className="lg:w-1/2 w-full flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <SecondInput
                column
                label="Sənədin adı"
                placeholder="Sənədin adını daxil edin"
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="document_no"
            render={({ field: { onChange, value } }) => (
              <SecondInput
                column
                label="Sənədin nömrəsi"
                placeholder="Sənədin nömrəsini daxil edin"
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                error={errors.document_no?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                column
                label="Sənədin tipi"
                options={documentTypes}
                onChange={(e) => onChange(e)}
                value={value}
                error={errors.type?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="template_id"
            render={({ field: { onChange, value } }) => (
              <Select
                column
                label="Xarici Şablon"
                options={templates}
                onChange={(e) => onChange(e || null)}
                value={value || null}
                error={errors.template_id?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="internal_template_id"
            render={({ field: { onChange, value } }) => (
              <Select
                column
                label="Daxili Şablon"
                options={internalTemplates}
                onChange={(e) => onChange(e || null)}
                value={value || null}
                error={errors.internal_template_id?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="author"
            render={({ field: { onChange, value } }) => (
              <SecondInput
                column
                label="Müəllif"
                placeholder="Müəllifi daxil edin"
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                error={errors.author?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="page_size"
            render={({ field: { onChange, value } }) => (
              <SecondInput
                column
                label="Səhifə sayı"
                placeholder="Səhifə sayını daxil edin"
                type="number"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                error={errors.page_size?.message}
                step="1"
                min="0"
              />
            )}
          />
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <SecondTextArea
                column
                label="Şərh"
                placeholder="Şərh yazın"
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                error={errors.comment?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="file"
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
                        onClick={() => resetField("file")}
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
                      error={errors.file?.message}
                    />
                  )}
                </>
              );
            }}
          />
          <Button value="Yüklə" isLoading={isLoading} />
        </form>
      </div>
      <Toaster />
    </section>
  );
};

export default UploadNewDocument;
