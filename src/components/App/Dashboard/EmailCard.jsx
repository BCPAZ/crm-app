import PropTypes from 'prop-types';
import moment from 'moment';

const EmailCard = ({ mail }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-3 py-[22px] border-b-2 border-grey/20">
        <div className="flex items-center gap-4 lg:justify-between justify-start w-full">
          <div className="flex flex-col justify-start items-start gap-2">
            <span className="text-md text-black font-medium">{mail.subject}</span>
            <span className="text-xs text-gray-400">{mail.message}</span>
          </div>
        </div>
        <span className="text-xs text-gray-400">{moment(mail.created_at).fromNow()}</span>
      </div>
      <div></div>
    </div>
  );
};

EmailCard.propTypes = {
  mail: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailCard;
