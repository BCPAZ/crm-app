import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumb my-4">
      <ul className="flex space-x-2 text-sm">
        <li>
          <Link to="/" className="text-black hover:underline px-2">Dashboard</Link>
        </li>/
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("﹒")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to} className="flex items-center">
              {!isLast ? (
                <Link to={to} className="text-black px-2 hover:underline capitalize">
                  {value}
                </Link>
              ) : (
                <span className="text-gray-500 px-2 capitalize">{value}</span>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
