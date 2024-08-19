import CheckboxElement from "@/components/common/CheckboxElement";
import templates from "@/mocks/templates";
import { GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { HiMiniTrash } from "react-icons/hi2";

const TemplateTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px] border">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
              <CheckboxElement />
              <span className="flex items-center gap-2">
                Template name <GoArrowDown />
              </span>
            </th>
            <th className="text-sm font-medium w-[20%] text-gray-500">
              Total day
            </th>
            <th className="text-sm font-medium w-[20%] text-gray-500">
              Organization
            </th>
            <th className="text-sm font-medium w-[10%] text-gray-500 rounded-e-lg">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          {templates.map((template, index) => (
            <div className="group" key={index}>
              <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed  w-full flex items-center justify-between gap-5 min-h-[76px]">
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                  <CheckboxElement />
                  <div className="flex items-center gap-4">
                    <Link
                      to={`${template.id}`}
                      className="text-sm text-secondary hover:underline"
                    >
                      {template.title}
                    </Link>
                  </div>
                </th>
                <td className="text-sm font-medium text-gray-500 w-[20%]">
                  <div className="flex flex-col">
                    <h3 className="text-sm text-secondary ">{template.totalDay}</h3>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[20%]">
                  <div className="flex flex-col">
                    <h3 className="text-sm text-secondary">
                      {template.organization}
                    </h3>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[10%] flex items-center gap-2">
                  <button className="outline-none border-none text-red-600 hover:bg-red-600/40 p-2 rounded-lg" type="button">
                    <HiMiniTrash size={20} />
                  </button>
                </td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateTable;
