import { IoSearchOutline } from "react-icons/io5";
import Button from "./Button";
const Searchbar = () => {
  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <div className="flex items-center p-3 gap-5 rounded-lg border border-grey/20 w-[90%]">
        <IoSearchOutline size={18} color="gray"/>
        <input className="bg-transparent w-full h-full outline-none border-none" placeholder="Search anything" type="search" autoComplete="false" />
      </div>
      <div className="flex flex-1">
        <Button value="Search" />
      </div>
    </div>
  )
}

export default Searchbar