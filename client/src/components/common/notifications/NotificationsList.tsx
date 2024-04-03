import dog from "@/assets/images/static-dog.jpg";
import { getbookingNotificationsThunk } from "@/redux/notification/notificationThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
const NotificationsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const notification = useSelector((state: RootState) => state.notification.allNotifications);
  const memoizedNotification = useMemo(() => notification, [notification]);
  useEffect(() => {
    dispatch(getbookingNotificationsThunk()).unwrap();
  }, []);

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 p-4">
      {memoizedNotification &&
        memoizedNotification?.map((row, index: number) => (
          <li key={index} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={dog} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center text-left gap-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.owner_name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.owner_email}
                  </p>
                </div>
                <div className="flex items-center text-left gap-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.animal_name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.animal_type}
                  </p>
                </div>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{row.booking_at}</p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default NotificationsList;
