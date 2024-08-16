import { Outlet } from "react-router-dom"
import { navigationLinks } from "@/utils/constants";
import Sidebar from "@/components/App/Documents/Sidebar";

const DocumentLayout = () => {
  const documentLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'documents').elements;
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">Project Settings</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="w-[25%] h-full">
          <Sidebar links={documentLinks} />
        </div>
        <main className="w-[75%] h-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DocumentLayout