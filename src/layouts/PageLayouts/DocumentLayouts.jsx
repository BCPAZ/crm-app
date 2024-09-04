import { Outlet } from "react-router-dom"
import { navigationLinks } from "@/utils/constants";
import Sidebar from "@/components/App/Documents/Sidebar";

const DocumentLayout = () => {
  const documentLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'sənədlər').elements;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-grow">
        <div className="w-[20%] lg:block hidden h-screen">
          <Sidebar links={documentLinks} />
        </div>
        <main className="lg:w-[80%] w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DocumentLayout