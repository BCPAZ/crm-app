const ActivityCard = ({activity}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-3 py-[22px] border-b-2 border-grey/20">
        <img src={activity.avatar} alt="" />
        <div className="flex flex-col justify-start items-start gap-2">
          <span className="text-md text-black font-medium">{activity.name}</span>
          <span className="text-xs text-gray-400">{activity.location}</span>
          <button className="p-3 rounded-lg text-gray-400 text-xs bg-gray-300/20 mt-4">View Activity</button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ActivityCard