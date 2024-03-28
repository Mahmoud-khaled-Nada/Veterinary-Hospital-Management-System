import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const [isWidth, setIsWidth] = useState(document.body.offsetWidth);

  useEffect(() => {

    const handleResize = () => setIsWidth(document.body.offsetWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWidth]);
  return (
    <div className="h-screen w-full grid md:grid-cols-12">
      <div className={`${isWidth <= 750 ? "hidden" : " bg-headerBody md:col-span-3 border-r-2 border-layoutBorder  flex flex-col"}`}>
        {/* i need to md:col-span-2.5 */}
        <Sidebar />
      </div>
      <div className="md:col-span-9  flex flex-col">
        {/* i need to md:col-span-9.5.5 */}
        <Header />
        <main className={`flex-1 flex flex-col bg-mainBody overflow-auto`}>
          {/* Here is gap-4 p-4 */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
