import SettingIcon from "@/assets/icons/ic-settings.svg";
const AuthHeader = () => {
  return (
    <header className="h-[80px] flex items-center">
      <div className="siteContainer">
        <nav className="flex items-center justify-between">
          <div className="text-md font-semibold">Logo</div>
          <div className="flex items-center gap-4">
            <button className="hover:bg-gray-200 outline-none border-none rounded-full" type="button">
              <img className="w-[30px] h-[30px] p-1" src={SettingIcon} alt="" />
            </button>
            <span className="text-sm font-semibold leading-[22px]">
              Kömək lazımdır?
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;
