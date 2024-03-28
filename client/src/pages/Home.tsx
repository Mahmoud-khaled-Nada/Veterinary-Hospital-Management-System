import { FC } from "react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
const Home: FC = () => {
  const {user} = useSelector((state: RootState) => state.users);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      {/* start test code */}
      <ul className="text-sm text-gray-600 bg-white p-2 m-4">
        <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
          FAQ
        </li>
        <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
          License
        </li>
        <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
          Terms & Conditions
        </li>
      </ul>

      {/* end test .... */}

      <div className="grid md:grid-cols-12 gap-4 p-6">
        <div className="md:col-span-4 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4  flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Card title
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a
              className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Card link
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="m-auto w-[60%] ">
        <article className="rounded-xl border-2 h-[200px] border-gray-100 bg-white">
          <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
            <a href="#" className="block shrink-0">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                className="size-14 rounded-lg object-cover"
              />
            </a>loading

            <div>
              <h3 className="font-medium sm:text-lg">
                <a href="#" className="hover:underline">
                  <span className="t text-red-500">Wolcame: </span> {user && user.name}
                </a>
              </h3>

              <p className="line-clamp-2 text-sm text-gray-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus, accusantium temporibus iure delectus ut totam natus
                nesciunt ex? Ducimus, enim.
              </p>
              <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                <span className="hidden sm:block" aria-hidden="true">
                  &middot;
                </span>
                <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                  Posted by
                  <a
                    href="#"
                    className="font-medium underline hover:text-gray-700"
                  >
                    John
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;
