import { IoMdMenu } from "react-icons/io";
import ProfileCard from "./ProfileCard";
import { openMobileNav } from "@/data/slices/siteSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomNotification from "./CustomNotification";
import logo from "@/assets/images/logo.png";
const Header = () => {
  const dispatch = useDispatch();

  const openMobileMenu = () => {
    dispatch(openMobileNav());
  }
  return (
    <header className="h-16 flex items-center">
      <div className="siteContainer flex items-center justify-between">
        <Link to={'/'} className="logo">
          <img className="w-[50px]" src={logo} alt="" />
        </Link>
        <div className="flex items-center gap-2">
          <CustomNotification />
          <ProfileCard />
          <button onClick={openMobileMenu} className="lg:hidden block" type="button">
            <IoMdMenu size={24}/>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header