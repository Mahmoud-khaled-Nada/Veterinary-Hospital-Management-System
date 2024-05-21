import { Outlet } from "react-router-dom";
import Sidebar from "./@components/Sidebar";
import Header from "./@components/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function DefaultLayout() {
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <>
      {user?.permission === "sub_admin" || user?.permission === "admin" ? (
        <div className="flex min-h-screen w-full grid md:grid-cols-12">
          <div className="flex flex-col md:col-span-3 border-r-2 border-gray-300 dark:bg-neutral900 dark:border-border_neutral700">
            <Sidebar />
          </div>
          <div className="md:col-span-9 flex flex-col">
            <Header />
            <main className={`flex-1 flex flex-col dark:bg-neutral900 overflow-auto`}>
              <Outlet />
            </main>
          </div>
        </div>
      ) : ( 
        <div className="w-5/6 mx-auto min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 dark:bg-neutral900 overflow-auto">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
