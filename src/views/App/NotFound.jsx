import { IoWarning } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="w-full h-full">
      <div className="siteContainer">
        <div className="flex items-center flex-col justify-center h-dvh gap-5">
          <IoWarning size={96} color="#003458" />
          <h1 className="text-8xl font-semibold text-secondary">404</h1>
          <p className="text-lg font-medium text-center text-secondary">Belə bir səhifə tapılmadı</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound