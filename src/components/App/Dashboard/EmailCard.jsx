const EmailCard = ({ email }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-3 py-[22px] border-b-2 border-grey/20">
        <div className="flex items-center gap-4 lg:justify-between justify-start w-full">
          <img src={email.avatar} alt="" />
          <div className="flex flex-col justify-start items-start gap-2">
            <span className="text-md text-black font-medium">{email.name}</span>
            <span className="text-xs text-gray-400">{email.description}</span>
          </div>
        </div>
        <span className="text-xs text-gray-400">{email.timeStamp}m</span>
      </div>
      <div></div>
    </div>
  );
};

export default EmailCard;
