import { Link } from "react-router-dom"
const Sidebar = () => {
  return (
    <aside className="p-3 border-r border-gray-300/30 w-full h-full">
      <div className="flex flex-col">
        <h1 className="text-xs text-gray-300 uppercase">Overview</h1>
        <nav className="flex flex-col mt-5 gap-4">
          <Link className="bg-blue-500/50 p-3 text-sm rounded-lg">Register Document</Link>
          <Link className="bg-blue-500/50 p-3 text-sm rounded-lg">Drawings</Link>
          <Link className="bg-blue-500/50 p-3 text-sm rounded-lg">Temporary files</Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar