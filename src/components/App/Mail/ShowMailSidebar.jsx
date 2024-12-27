import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/common/Spinner";
import Searchbar from "@/components/common/Searchbar";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import empty from "@/assets/icons/Mail/empty.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";

const ShowMailSidebar = ({
  handleSearchInput,
  fetchNextPage,
  mails,
  meta,
  toggleMailsSidebar,
  mailsRef,
  closeMailsSidebar,
}) => {
  const location = useLocation();

  useEffect(() => {
    closeMailsSidebar();
  }, [location.pathname]);
  return (
    <div
      ref={mailsRef}
      className={`bg-white rounded-lg md:hidden flex flex-col sm:w-1/2 w-full p-4 min-h-full top-0 fixed z-20 ${
        toggleMailsSidebar ? "left-0" : "-left-full"
      } transition-all duration-300`}
    >
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
                            <FaUser size={30} />
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
  );
};

ShowMailSidebar.propTypes = {
  handleSearchInput: PropTypes.func,
  fetchNextPage: PropTypes.func,
  mails: PropTypes.array,
  toggleMailsSidebar: PropTypes.bool,
  mailsRef: PropTypes.any,
  meta: PropTypes.object,
  closeMailsSidebar : PropTypes.func
};

export default ShowMailSidebar;
