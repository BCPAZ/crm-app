import toast from "react-hot-toast";

const useToast = () => {
  const showToast = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast(message, { icon: "⚠️" });
        break;
      default:
        toast(message);
    }
  };
  return {showToast}
};

export default useToast;
