import { IoClose } from "react-icons/io5";
import { FormEvent, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const FormModelContainer: React.FC<Props> = ({ onClose, children, title, onSubmit, isLoading }) => {
  return (
    <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none animate__animated animate__fadeInDown">
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
            <button
              type="button"
              className="hs-dropup-toggle flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <IoClose className="flex-shrink-0 size-4" />
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="p-4 overflow-y-auto">{children}</div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropup-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading && (
                  <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"></span>
                )}
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModelContainer;
