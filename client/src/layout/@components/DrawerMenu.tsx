import { useLocation, useNavigate } from "react-router-dom";
import { ListLinkes } from "../Navigation";
import { Fragment, useEffect, useState } from "react";

const DrawerMenu = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {ListLinkes.map((list, index) => (
            <Fragment key={index}>
              <li>
                <div
                  onClick={() => navigate(list.path)}
                  className={`flex justify-start align-center gap-3 rounded-lg hover:bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 ${
                    list.path === currentPath ? "bg-gray-100" : ""
                  }`}
                >
                  <span className="text-base opacity-75">{list?.icon}</span>
                  {list?.name}
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrawerMenu;