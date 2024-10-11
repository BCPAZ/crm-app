import img from "@/assets/images/img.png";
import PropTypes from "prop-types";
import moment from "moment";
const ActivityCard = ({user}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-3 py-[22px] border-b-2 border-grey/20">
        <img className="w-[40px] h-[40px] rounded-full" src={user.avatar_url || img} alt="" />
        <div className="flex flex-col justify-start items-start gap-2">
          <span className="text-md text-black font-medium">{user.name}</span>
          <span className="text-xs text-gray-400">{user.email}</span>
          <button className="p-3 rounded-lg text-gray-400 text-xs bg-gray-300/20 mt-4">{moment(user.created_at).fromNow()}</button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

ActivityCard.propTypes = {
  user: PropTypes.shape({
    avatar_url : PropTypes.string,
    name : PropTypes.string,
    email : PropTypes.string,
    created_at : PropTypes.string
  })
}

export default ActivityCard