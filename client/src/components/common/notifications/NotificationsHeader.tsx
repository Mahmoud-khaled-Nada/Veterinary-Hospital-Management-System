import { IoNotificationsOutline } from "react-icons/io5";
import { BiShow } from "react-icons/bi";
import dog from "@/assets/images/static-dog.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getbookingNotificationsThunk } from "@/redux/notification/notificationThunk";

const NotificationsHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const notification = useSelector((state: RootState) => state.notification.bookingNotifications);

  useEffect(() => {
    if (notification.length == 0) dispatch(getbookingNotificationsThunk()).unwrap();
  }, []);

  console.log("notification");
  console.log(notification);

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
          <IoNotificationsOutline className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-8 dark:border-gray-900"></div>
        </div>
        {notification.length > 0 && (
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[500px]"
          >
            {notification.map((row, index) => (
              <li key={index} className="divide-y text-right divide-gray-100 dark:divide-gray-700">
                <button className="flex px-4 py-3">
                  <div className="flex-shrink-0">
                    <img className="rounded-full w-11 h-11" src={dog} alt="Jese image" />
                  </div>
                  <div className="w-full ps-3  text-left">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      Owner name: {row.owner_name}
                    </div>
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      Animal type: {row.animal_type}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">{row.booking_at}</div>
                  </div>
                </button>
              </li>
            ))}
            <li>
              <button className="block py-2 mt-3 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <div className="inline-flex items-center ">
                  <BiShow className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
                  View all
                </div>
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default NotificationsHeader;
