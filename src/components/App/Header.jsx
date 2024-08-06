import notifications from "@/assets/icons/notifications.svg";
import english from "@/assets/icons/english.svg";
import ProfileCard from "./ProfileCard";
const Header = () => {
  return (
    <header className="h-16 flex items-center">
      <div className="siteContainer flex items-center justify-between">
        <div className="logo">
          <img className="w-[50px]" src="https://cdn-icons-png.flaticon.com/512/906/906341.png" alt="" />
        </div>
        <div className="flex items-center gap-2">
          <button type="button">
            <img src={english} alt="Language changed" />
          </button>
          <button type="button">
            <img src={notifications} alt="Language changed" />
          </button>
          <ProfileCard />
        </div>
      </div>
    </header>
  )
}

export default Header