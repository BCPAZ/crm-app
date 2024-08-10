import { PiWarningOctagon } from "react-icons/pi";
import PropTypes from "prop-types";
const NotFound = ({ name }) => {
  return (
    <section className="h-screen">
      <div className="siteContainer flex items-center flex-col justify-center h-full">
        <span className="text-gray-400">
          <PiWarningOctagon size={64} />
        </span>
        <span>{name} page not found</span>
      </div>
    </section>
  );
};

NotFound.propTypes = {
  name : PropTypes.string.isRequired
}

export default NotFound;
