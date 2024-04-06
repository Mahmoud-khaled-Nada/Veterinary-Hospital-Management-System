import { FC, ReactNode, Dispatch, SetStateAction, useState } from "react";

export type TabProps = {
  title: string;
  icon?: ReactNode;
  content: ReactNode;
};

interface Props {
  tabContent: TabProps[];
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}


const TabsNavigator: FC<Props> = ({ tabContent }) => {
  const [active, setActive] = useState<number>(0);
  return (
    <>
      <ul className="flex flex-wrap -mb-px h-16 text-sm font-medium text-center text-gray-700 dark:text-gray-400">
        {tabContent.map((tab, index: number) => (
          <li key={index} className="me-2">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-3 ${
                index === active
                  ? "border-b-2 border-blue-600 dark:focus:text-gray-200 dark:border-blue-600 dark:bg-gray-800 group"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
              }`}
              onClick={() => setActive(index)}
            >
              {tab.icon && (
                <span
                  className={`w-4 h-4 me-2  
                    ${
                      index === active
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                    }
                    `}
                >
                  {tab.icon}
                </span>
              )}
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="m-4">{tabContent[active].content}</div>
    </>
  );
};

export default TabsNavigator;
