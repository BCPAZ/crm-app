import fileIcon from "@/assets/icons/FieldManagement/file.svg";
import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import { useCreateIssueMutation } from "@/data/services/fieldService";
import { useGetUserQuery } from "@/data/services/usersService";
import useToast from "@/hooks/useToast";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [createIssue, { isError, isSuccess, isLoading }] =
    useCreateIssueMutation();
  const { data: users = [] } = useGetUserQuery({
    limit: 1000000,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [assigneeId, setAssigneeId] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileRef = useRef(null);
  const companyUsers = users?.users;
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      setFiles(selectedFiles);

      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileClick = () => fileRef.current.click();

  const handleAssigneeChange = (id) => {
    setAssigneeId(id);
  };

  const handleSubmit = () => {
    if (!title || !description || !files) {
      showToast("Bu sahələr boş buraxıla bilməz", "error");
      return;
    }

    createIssue({
      name: title,
      description,
      assignee_id: assigneeId,
      files,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setFiles(null);
      setDescription("");
      setAssigneeId(null);
      setFilePreview(null);
      showToast("Report uğurlu şəkildə yaradıldı", "success");
      navigate("/issues");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) showToast("Report yaranan zaman xəta baş verdi", "error");
  }, [isError]);

  return (
    <section className="py-10">
      <Toaster />
      <div className="siteContainer grid lg:grid-cols-2 gap-10">
        <div
          onClick={handleFileClick}
          className="h-[250px] bg-grey/10 p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer"
        >
          {filePreview ? (
            <div className="flex items-center justify-center w-[100px] h-[100px]">
              <img
                src={filePreview}
                alt="Selected File Preview"
                className="mt-4 w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src={fileIcon} alt="File Icon" className="w-16 h-16" />
              <div className="flex items-center flex-col gap-2 mt-2">
                <h4 className="text-md font-semibold text-center">
                  Basın və fayl seçin
                </h4>
                <p className="text-xs font-medium text-center text-gray-500">
                  Bu hissəyə klik edərək kompüterinizdə{" "}
                  <span className="text-green-600">axtarış</span> edin və fayl
                  seçin
                </p>
                <input
                  className="hidden"
                  type="file"
                  ref={fileRef}
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <SecondInput
            onChange={handleChangeTitle}
            column
            placeholder="Başlıq"
            type="text"
            value={title}
          />
          <SecondInput
            onChange={handleDescriptionChange}
            column
            placeholder="Təfərrüat"
            type="text"
            value={description}
          />
          <Select
            options={companyUsers}
            column
            absolute
            label="Tapşırıq verilən şəxs"
            onChange={handleAssigneeChange}
            mode="id"
          />
          <Button
            isLoading={isLoading}
            value="Yükləyin"
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default Reports;
