import clsx from "clsx";
import moment from "moment";
import mails from "@/mocks/mails";
import mailLinks from "@/utils/mailLinks";
import Searchbar from "@/components/common/Searchbar";
import empty from "@/assets/icons/Mail/empty.svg";
import CreateMail from "@/components/App/Mail/CreateMail";
import disabled from "@/assets/icons/Mail/disabled.svg";
import { FaPen } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const MailLayout = () => {
  const [filterType, setFilterType] = useState("ALL");

  const filterMails = () => {
    switch (filterType) {
      case "ALL":
        return mails;
      case "STARRED":
        return mails.filter((mail) => mail.is_starred);
      case "IMPORTANT":
        return mails.filter((mail) => mail.is_important);
      default:
        return mails.filter((mail) => mail.type === filterType);
    }
  };

  const filteredMails = filterMails();

  return (
    <section className="py-10">
      <div className="siteContainer relative">
        <h1 className="font-bold text-2xl">
          Mail All ({filteredMails.length})
        </h1>
        <div className="fixed bottom-5 right-5 z-30">
        <CreateMail />
        </div>
        <div className="w-full bg-[#F4F6F8] rounded-lg h-full p-2 mt-10 flex justify-between gap-3">
          <aside className="flex flex-col p-3 w-[20%]">
            <button className="text-md bg-black p-3 rounded-lg text-white font-bold flex items-center justify-center gap-2">
              <FaPen size={22} />
              Compose
            </button>
            <div className="py-3 flex flex-col gap-2">
              {mailLinks.map((link, index) => (
                <button
                  className={clsx(
                    "flex items-center w-full gap-4 p-2 rounded-lg",
                    {
                      "bg-gray-300": filterType === link.type,
                      "bg-transparent": filterType !== link.type,
                    }
                  )}
                  key={index}
                  onClick={() => setFilterType(link.type)}
                >
                  <img src={link.icon} alt={link.label} />
                  <span
                    className={clsx("text-lg font-medium", {
                      "text-black": filterType === link.type,
                      "text-gray-500": filterType !== link.type,
                    })}
                  >
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <div className="bg-white rounded-lg flex flex-col w-[35%] p-4 min-h-screen">
            <Searchbar simple />
            <div className="flex flex-col gap-2 mt-5">
              {filteredMails.length > 0 ? (
                filteredMails.map((mail, index) => (
                  <NavLink
                    className={({ isActive }) =>
                      clsx("w-full p-2 rounded-lg", {
                        "bg-grey/20": isActive,
                        "bg-transparent hover:bg-grey/20 ": !isActive,
                      })
                    }
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
                          <span className="text-sm font-semibold">
                            {mail.opponent.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {moment(mail.created_at).fromNow()}
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-between relative">
                          <span
                            className={`line-clamp-1 w-3/4 text-sm ${
                              mail.is_read ? "text-gray-400" : "text-black"
                            }`}
                          >
                            {mail.message}
                          </span>
                          {!mail.is_read ? (
                            <span className="w-[10px] h-[10px] bg-blue-500 absolute right-[5%] bottom-[20%] rounded-full"></span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))
              ) : (
                <div className="text-center text-gray-500 text-lg h-screen flex items-center justify-center flex-col gap-3">
                  <img src={empty} alt="Empty" />
                  <h1 className="text-gray-400 text-lg font-semibold">
                    Nothing in here
                  </h1>
                  <p className="text-xs text-gray-400 font-base">
                    This folder is empty
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3">
            {filteredMails.length > 0 ? (
              <Outlet />
            ) : (
              <div className="flex items-center justify-center h-full">
                <img src={disabled} alt="Here is empty" />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MailLayout;
