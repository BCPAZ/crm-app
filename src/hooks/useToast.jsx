import toast from "react-hot-toast";

const useToast = () => {
  const showToast = (message, type = "info") => {
    const duration = 5000;
    switch (type) {
      case "success":
        toast.success(message, {duration});
        break;
      case "error":
        toast.error(message, {duration});
        break;
      case "info":
        toast.info(message, {duration});
        break;
      case "warning":
        toast(message, { icon: "⚠️" }, {duration});
        break;
      default:
        toast(message, {duration});
    }
  };
  return {showToast}
};

export default useToast;
