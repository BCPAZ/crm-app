import fileIcon from "@/assets/icons/FieldManagement/file.svg";
import Button from "@/components/common/Button";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import useToast from "@/hooks/useToast";
import { useState, useRef, useEffect } from "react";
import { useCreateIssueMutation } from "@/data/services/fieldService";
import { useGetCompanyUsersQuery } from "@/data/services/usersService";

const Reports = () => {
  const [createIssue, { isError, isSuccess, isLoading }] = useCreateIssueMutation();
  const { data: users = [] } = useGetCompanyUsersQuery();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [assigneeId, setAssigneeId] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileRef = useRef(null);
  const companyUsers = users?.users;
  const { showToast } = useToast();

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
      showToast('Bu sahələr boş buraxıla bilməz', 'error');
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
    if (isSuccess){ 
      showToast('Problem successfully created', 'success');
      setTitle('');
      setFiles(null);
      setDescription('');
      setAssigneeId(null);
      setFilePreview(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) showToast('Error occurred while creating the problem', 'error');
  }, [isError]);

  return (
    <section className="py-10">
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
                  Drop or select file
                </h4>
                <p className="text-xs font-medium text-center text-gray-500">
                  Drop files here or click to{" "}
                  <span className="text-green-600">browse</span> through your
                  machine.
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
