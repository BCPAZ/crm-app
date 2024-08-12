import Searchbar from "@/components/common/Searchbar";
import mails from "@/mocks/mails";
import mailLinks from "@/utils/mailLinks";
import { FaPen } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
const MailLayout = () => {
  return (
    <section className="py-10">
      <div className="siteContainer">
        <h1 className="font-bold text-2xl">Mail All (23)</h1>
        <div className="w-full bg-[#F4F6F8] rounded-lg h-full p-2 mt-10 flex justify-between gap-3">
          <div className="flex flex-col p-3 w-[20%]">
            <button className="text-md bg-black p-3 rounded-lg text-white font-bold flex items-center justify-center gap-2">
              <FaPen size={22} />
              Compose
            </button>
            <div className="p-3 flex flex-col">
              {mailLinks.map((link, index) => (
                <button
                  className="flex items-center w-full gap-4 p-2"
                  key={index}
                >
                  <img src={link.icon} alt={link.label} />
                  <span className="text-lg text-gray-500 font-medium">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg flex flex-col w-[35%] p-4 min-h-screen">
            <Searchbar simple />
            <div className="flex flex-col gap-2 mt-5">
              {mails.map((mail, index) => (
                <Link
                  className="w-full p-2 hover:bg-grey/20 rounded-lg"
                  to={`${mail.id}`}
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={mail.opponent.avatar_url}
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between gap-2 w-full">
                        <span className="text-md font-semibold">{mail.opponent.name}</span>
                        <span>3days</span>
                      </div>
                      <div className="w-full flex items-center justify-between relative">
                        <span className="line-clamp-1 ">{mail.message}</span>
                        <span className="w-[10px] h-[10px] bg-blue-500 absolute right-[5%] bottom-[20%] rounded-full"></span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MailLayout