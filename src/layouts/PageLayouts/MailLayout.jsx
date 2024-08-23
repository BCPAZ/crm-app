import clsx from "clsx";
import moment from "moment";
import { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useGetMailsQuery } from "@/data/services/mailService";
import Searchbar from "@/components/common/Searchbar";
import empty from "@/assets/icons/Mail/empty.svg";
import CreateMail from "@/components/App/Mail/CreateMail";
import disabled from "@/assets/icons/Mail/disabled.svg";
import { FaPen } from "react-icons/fa";
import mailLinks from "@/utils/mailLinks";
import { LuUserCircle2 } from "react-icons/lu";
import LoadingScreen from "@/components/common/LoadingScreen";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/common/Spinner";

const MailLayout = () => {
  const [filterType, setFilterType] = useState("ALL");
  const [mailModal, setMailModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const openMailModal = () => {
    setMailModal(true);
  };
  const closeMailModal = () => {
    setMailModal(false);
  };

  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    setFilter((state) => ({
      ...state,
      search: searchInput,
    }));
  }, [searchInput]);

  useEffect(() => {
    switch (filterType) {
      case "INBOX":
        setFilter({ type: "RECEIVE", page: 1, limit: 10 });
        break;
      case "SENT":
        setFilter({ type: "SEND", page: 1, limit: 10 });
        break;
      case "STARRED":
        setFilter({ is_starred: true, page: 1, limit: 10 });
        break;
      case "TRASH":
        setFilter({ is_deleted: true, page: 1, limit: 10 });
        break;
      case "IMPORTANT":
        setFilter({ is_important: true, page: 1, limit: 10 });
        break;
      case "ALL":
      default:
        setFilter({ page: 1, limit: 10 });
    }
  }, [filterType]);

  useEffect(() => {
    setPage(filter.page);
  }, [filter.page]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const { data, isLoading, isError } = useGetMailsQuery(filter);

  const mails = data?.mails || [];
  const meta = data?.meta || {};

  const fetchNextPage = useCallback(() => {
    if (!isLoading && hasMore) {
      setFilter((state) => ({
        ...state,
        page: page + 1,
      }));
    }
  }, [isLoading, hasMore, page]);

  useEffect(() => {
    if (meta.current_page >= meta.last_page) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [meta.current_page, meta.last_page]);

  if (isLoading && !data) return <LoadingScreen />;
  if (isError) return <p>Error loading mails</p>;

  return (
    <section className="py-10">
      <div className="siteContainer relative">
        <h1 className="font-bold text-2xl">Mail All ({mails.length})</h1>
        <div
          className={`fixed bottom-5 right-5 z-30 ${
            mailModal ? "block" : "hidden"
          }`}
        >
          <CreateMail closeMailModal={closeMailModal} />
        </div>
        <div className="w-full bg-[#F4F6F8] rounded-lg h-[480px] p-2 mt-10 flex justify-between gap-3">
          <aside className="md:flex hidden flex-col p-3 w-[20%]">
            <button
              onClick={openMailModal}
              className="text-md bg-black p-3 rounded-lg text-white font-bold flex items-center justify-center gap-2"
            >
              <FaPen size={22} />
              <span className="md:block hidden">Compose</span>
            </button>
            <div className="py-3 flex flex-col gap-2">
              {mailLinks.map((link, index) => (
                <button
                  className={clsx(
                    "flex items-center md:justify-start justify-center w-full gap-4 p-2 rounded-lg",
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
                    className={clsx("text-md font-medium md:block hidden", {
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
          <div className="bg-white rounded-lg md:flex hidden flex-col w-[35%] p-4 min-h-full">
            <Searchbar onChange={handleSearchInput} simple />
            <div className="h-full overflow-y-scroll mt-2">
              <InfiniteScroll
                dataLength={mails.length}
                next={fetchNextPage}
                hasMore={mails?.length < meta?.total}
                loader={
                  <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                  </div>
                }
                className="flex flex-col gap-2 mt-5 overflow-y-scroll"
              >
                {mails.length > 0 ? (
                  mails.map((mail, index) => (
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
                        {mail.opponent?.avatar_url ? (
                          <img
                            className="w-[40px] h-[40px] rounded-full"
                            src={!mail.opponent.avatar_url}
                            alt={mail.opponent.name}
                          />
                        ) : (
                          <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500">
                            <LuUserCircle2 size={30} />
                          </div>
                        )}
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
              </InfiniteScroll>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-3">
            {mails.length > 0 ? (
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
