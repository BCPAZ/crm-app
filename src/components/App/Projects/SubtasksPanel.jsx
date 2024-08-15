import CheckboxElement from "@/components/common/CheckboxElement";
import { IoMdAdd } from "react-icons/io";

const SubtasksPanel = () => {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-2">
        <h6 className="text-sm text-black font-base">4 of 5</h6>
        <div className="w-full h-2 rounded-full bg-secondary/20 relative">
          <div className="w-[75%] h-full rounded-full absolute top-0 left-0 bg-secondary"></div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        <CheckboxElement  label="Complete the task"/>
        <CheckboxElement  label="Complete the task"/>
        <CheckboxElement  label="Complete the task"/>
        <CheckboxElement  label="Complete the task"/>
      </div>
      <button className="p-2 rounded-lg border text-sm font-semibold flex items-center gap-1 mt-6"><IoMdAdd size={20}/>Create Task</button>
    </section>
  )
}

export default SubtasksPanel