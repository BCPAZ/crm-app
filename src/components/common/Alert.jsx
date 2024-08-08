import { IoMdInformationCircle } from "react-icons/io";
const Alert = () => {
  return (
    <div className="flex items-center gap-2 bg-sky-300 p-3 rounded-lg">
      <IoMdInformationCircle size={36} color="white" />
      <p className="text-md text-white">
      The rules for completing individual stages can also be changed in the constructor.
      </p>
    </div>
  )
}

export default Alert