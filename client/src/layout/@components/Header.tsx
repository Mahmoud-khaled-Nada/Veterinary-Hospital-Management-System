import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { AvatarDropdown } from "./AvatarDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { formatTitle } from "@/utils/helper";
import { HiChevronDoubleRight } from "react-icons/hi";
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-gray-50 md:flex h-14 items-center border-b-2 border-gray-300 dark:bg-neutral900 dark:border-border_neutral700 gap-4 px-4">
      {pathname != "/" && (
        <>
          <div className="badge badge-info gap-2 text-base cursor-pointer" onClick={() => navigate("/")}>
            Home page
            <HiChevronDoubleRight className="inline-block w-4 h-4 mt-1 stroke-current" />
          </div>
          <div className="badge badge-success gap-2 text-white text-base">{formatTitle(pathname)}</div>
        </>
      )}
      <button className="md:hidden">
        <HiOutlineChevronLeft className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </button>
      <div className="ml-auto flex items-center space-x-2">
        <button className="btn btn-sm btn-outline">
          <IoSearchOutline className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
        <AvatarDropdown />
      </div>
    </header>
  );
};

export default Header;
