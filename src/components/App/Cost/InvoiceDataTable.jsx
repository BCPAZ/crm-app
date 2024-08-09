import CheckboxElement from "@/components/common/CheckboxElement";
import avatar from "@/assets/images/img.png";
import { GoArrowDown } from "react-icons/go";

const InvoiceDataTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
              <CheckboxElement />
              <span className="flex items-center gap-2">No Document <GoArrowDown /></span>
            </th>
            <th className="text-sm font-medium w-[10%] text-gray-500">Stage</th>
            <th className="text-sm font-medium w-[10%] text-gray-500">Results</th>
            <th className="text-sm font-medium w-[10%] text-gray-500">Deadline</th>
            <th className="text-sm font-medium w-[10%] text-gray-500 text-right">Executor</th>
            <th className="text-sm font-medium w-[10%] text-gray-500 rounded-e-lg">Status results</th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left mt-5">
          <tr className="p-5 border-b border-grey/20  w-full flex items-center justify-between gap-5 min-h-[76px]">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
              <CheckboxElement />
              <span>fraction-health-sao-tome-and-principe-helen-reddy-045706-sm-151104-ulan-bator.jpg</span>
            </th>
            <td className="text-sm font-medium text-gray-500 w-[10%]">Structure 1</td>
            <td className="text-sm font-medium text-gray-500 w-[10%]">Rejected</td>
            <td className="text-sm font-medium text-gray-500 w-[10%] flex flex-col gap-1">
              <span className="text-xs">09 Aug 2022</span>
              <span className="text-xs">10:37 AM</span>
            </td>
            <td className="text-sm font-medium text-gray-500 w-[10%] text-right flex items-center justify-end">
              <img src={avatar} alt="" />
              <img src={avatar} alt="" />
              <img src={avatar} alt="" />
            </td>
            <td className="text-sm font-medium text-gray-500 w-[10%] rounded-e-lg">Approved</td>
          </tr>
          <tr className="p-5 border-b border-grey/20 w-full flex items-center justify-between gap-5 min-h-[76px]">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
              <CheckboxElement />
              <span>fraction-health-sao-tome-and-principe-helen-reddy-045706-sm-151104-ulan-bator.jpg</span>
            </th>
            <td className="text-sm font-medium text-gray-500 w-[10%]">Structure 1</td>
            <td className="text-sm font-medium text-gray-500 w-[10%]">Rejected</td>
            <td className="text-sm font-medium text-gray-500 w-[10%] flex flex-col gap-1">
              <span className="text-xs">09 Aug 2022</span>
              <span className="text-xs">10:37 AM</span>
            </td>
            <td className="text-sm font-medium text-gray-500 w-[10%] text-right flex items-center justify-end">
              <img src={avatar} alt="" />
              <img src={avatar} alt="" />
              <img src={avatar} alt="" />
            </td>
            <td className="text-sm font-medium text-gray-500 w-[10%] rounded-e-lg">Approved</td>
          </tr>
          <tr className="p-5 border-b border-grey/20 w-full flex items-center justify-between gap-5 min-h-[76px]">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
              <CheckboxElement />
              <span>fraction-health-sao-tome-and-principe-helen-reddy-045706-sm-151104-ulan-bator.jpg</span>
            </th>
            <td className="text-sm font-medium text-gray-500 w-[10%]">Structure 1</td>
            <td className="text-sm font-medium text-gray-500 w-[10%]">Rejected</td>
            <td className="text-sm font-medium text-gray-500 w-[10%] flex flex-col gap-1">
              <span className="text-xs">09 Aug 2022</span>
              <span className="text-xs">10:37 AM</span>
            </td>
            <td className="text-sm font-medium text-gray-500 w-[10%] text-right flex items-center justify-end">
              <img src={avatar} alt="" />
              <img src={avatar} alt="" />
              <img src={avatar} alt="" />
            </td>
            <td className="text-sm font-medium text-gray-500 w-[10%] rounded-e-lg">Approved</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InvoiceDataTable