import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/datepicker.css";
import { BsCalendar2DateFill } from "react-icons/bs";


const CustomDatePicker = ({label}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="relative">
      <label htmlFor="" className="text-sm">{label}</label>
      <div className="flex items-center justify-between border border-grey/20 p-3 rounded-lg">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="w-full rounded-lg h-full bg-transparent text-sm text-gray-500"
        dateFormat="yyyy/MM/dd"
        placeholderText="YYYY/MM/DD"
      />
      <BsCalendar2DateFill className="text-gray-500" />
    </div>
    </div>
  );
};

export default CustomDatePicker;
