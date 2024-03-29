import React from "react";
import dog from "@/assets/images/static-dog.jpg";
const NotificationsList = () => {
  return (
    <button className="flex px-4 py-3 bg-white max-w-80">
      <div className="flex-shrink-0">
        <img className="rounded-full w-11 h-11" src={dog} alt="Jese image" />
      </div>
      <div className="w-full ps-3  text-left">
        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
          New message from
          <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey,
          what's up? All set for the presentation?"
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
      </div>
    </button>
  );
};

export default NotificationsList;
