import { IoMdMenu } from "react-icons/io";
import ProfileCard from "./ProfileCard";
import { openMobileNav } from "@/data/slices/siteSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();

  const openMobileMenu = () => {
    dispatch(openMobileNav());
  }
  return (
    <header className="h-16 flex items-center">
      <div className="siteContainer flex items-center justify-between">
        <div className="logo">
          <img className="w-[50px]" src="https://cdn-icons-png.flaticon.com/512/906/906341.png" alt="" />
        </div>
        <div className="flex items-center gap-2">
          <ProfileCard />
          <button onClick={openMobileMenu} className="md:hidden block" type="button">
            <IoMdMenu size={24}/>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header