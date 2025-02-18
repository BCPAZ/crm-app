const useSubdomain = () => {
    const host = window.location.hostname;
    const parts = host.split(".");
  
    return parts.length > 2 ? parts[0] : null;
  };
  
  export default useSubdomain;
  