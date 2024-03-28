import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ListLinkes } from "../Navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-30">
      <div className="flex items-center h-14 px-2 border-b-2 border-layoutBorder">
        <Link to={"/"} className="flex items-center space-x-2">
          <FaHome className="h-6 w-6  text-white" />
          <span className="text-lg font-semibold text-white">Home</span>
        </Link>
        <button className="btn btn-sm btn-outline ml-2 text-white">Eng: Mahmoud Nada</button>
      </div>
      <nav className="flex-1 mt-3 overflow-auto">
        {ListLinkes.map((item, index) => (
          <ul className="space-x-2" key={index}>
            <li>
              <Link
                to={item.path}
                className={`h-14 flex items-center space-x-2 p-2 bg-opacity-50 dark:hover:bg-gray-800 dark:text-white dark:focus:outline-none
                
                ${item.path === currentPath && "text-blue-600 bg-gray-800 hover:bg-opacity-100"}
                `}
              >
                <div className={`flex items-center gap-2  ${item.path === currentPath && "text-blue-600"}`}>
                  {item.icon}
                  <span className="text-base font-medium ">{item.name}</span>
                </div>
              </Link>
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
