import { RootState } from "@/store";
import { FC } from "react";
import { HiChevronDoubleRight } from "react-icons/hi";

import { useSelector } from "react-redux";
import usePermission from "@/utils/hook/usePermission";
const Home: FC = () => {
  const selectNavigate = usePermission();
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen flex flex-col"
      style={{
        backgroundImage: "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="grid md:grid-cols-12 gap-4 p-6">
        <div className="md:col-span-4  flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              welcome ): {user && user.name}
            </h3>
            {user && (user.permission === "doctor" || user.permission === "reception") && (
              <>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  If you are a {user && user.permission}, please go to this page
                </p>
                <button
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 animate-pulse"
                  onClick={() => selectNavigate(user?.permission || "")}
                >
                  Go to your work
                  <HiChevronDoubleRight className="flex-shrink-0 size-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
