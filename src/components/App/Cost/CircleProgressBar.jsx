import PropTypes from "prop-types";
const CircleProgressBar = ({ progress }) => {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-14 h-14">
      <svg
        className="absolute transform -rotate-90"
        width="56" 
        height="56"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#919EAB29"
          strokeWidth="3" 
          fill="none"
          className="rounded-lg"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#22C55E"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-transform duration-300 rounded-lg"
        />
      </svg>
    </div>
  );
};

CircleProgressBar.propTypes = {
  progress : PropTypes.number
}

export default CircleProgressBar;
