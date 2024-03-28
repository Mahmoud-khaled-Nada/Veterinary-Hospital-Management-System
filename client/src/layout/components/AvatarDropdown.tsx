import employee from "@/assets/images/employee.webp";
import { removeCookie } from "@/utils/hook/useCookies";
import { logoutUserAPI } from "@/utils/apis";

export const AvatarDropdown = () => {
  const logoutUser = () => {
    logoutUserAPI().finally(() => {
      removeCookie("access_token");
      location.href = "/login";
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={employee} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={() => logoutUser()}>Logout</a>
        </li>
      </ul>
    </div>
  );
};
