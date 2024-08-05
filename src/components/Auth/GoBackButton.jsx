import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
const GoBackButton = () => {
  return (
    <Link className="flex items-center gap-1 text-sm w-full text-start"><IoIosArrowRoundBack size={18}/>Geri qayıt</Link>
  )
}

export default GoBackButton