import notifications from "@/assets/icons/notifications.svg";
import english from "@/assets/icons/english.svg";
import avatar from "@/assets/images/avatar.jpg";
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
          <button className="w-[40px] h-[40px] overflow-hidden p-1 rounded-full border-2 border-gray-300/20">
            <img className="w-full h-full object-cover object-center" src={avatar} alt="" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header