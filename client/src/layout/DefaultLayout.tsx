import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./@components/Sidebar";
import Header from "./@components/Header";

export default function DefaultLayout() {
  const [width, setWidth] = useState(document.body.offsetWidth);
  useEffect(() => {
    const handleResize = () => setWidth(document.body.offsetWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <div className="flex min-h-screen w-full grid md:grid-cols-12">
      <div
        className={`${
          width <= 750
            ? "hidden"
            : "flex flex-col md:col-span-3 border-r-2 border-gray-300 dark:bg-dark_header_body dark:border-dark_border"
        }`}
      >
        <Sidebar />
      </div>
      <div className="md:col-span-9 flex flex-col">
        <Header />
        <main className={`flex-1 flex flex-col dark:bg-dark_Body overflow-auto`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}