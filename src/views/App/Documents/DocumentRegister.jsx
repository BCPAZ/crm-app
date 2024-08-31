import { useState } from "react";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import DocumentsTable from "@/components/App/Documents/DocumentsTable";

const DocumentRegister = () => {
  const options = [
    { id: 'register', name: 'Reyestr' },
    { id: 'drawings', name: 'Çertyoj' },
    { id: 'temporary', name: 'Müvəqqəti' },
  ];
  
  const [filters, setFilters] = useState({
    name: "",
    documentNo: "",
    startDate: null,
    endDate: null,
    type: null,
  });

  const handleChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const cleanFilters = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null && value !== "")
    );
  };

  return (
    <section className="h-full">
      <div className="flex justify-between relative h-full">
        <div className="w-full h-full absolute top-0 right-0 flex flex-col justify-between px-5 gap-10 pt-10 pb-[100px]">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <SecondInput
              onChange={(e) => handleChange("name", e.target.value)}
              column
              label="Şablon adı"
              placeholder="Şablon adı daxil edin"
              type="text"
            />
            <SecondInput
              onChange={(e) => handleChange("documentNo", e.target.value)}
              column
              label="Sənəd nömrəsi"
              placeholder="Sənəd nömrəsi daxil edin"
              type="text"
            />
            <CustomDatePicker
              onChange={(e) => handleChange("startDate", e.target.value)}
              label="Başlanğıc tarixi seçin"
            />
            <CustomDatePicker
              onChange={(e) => handleChange("endDate", e.target.value)}
              label="Bitiş tarixi seçin"
            />
            <Select
              onChange={(e) => handleChange("type", e.target.value)}
              label="Tip"
              options={options}
              column
            />
          </div>
          <div className="py-10">
            <div>
              <DocumentsTable filters={cleanFilters(filters)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentRegister;
