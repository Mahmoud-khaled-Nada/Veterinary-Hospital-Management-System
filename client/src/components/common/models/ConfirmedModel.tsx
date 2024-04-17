import { FC } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmAction: () => void;
  actionName?: string;
}

const ConfirmedModel: FC<Props> = ({ openModal, setOpenModal, handleConfirmAction, actionName = "Confirm" }) => {
  return (
    <>
      {openModal && (
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none bg-gray-800 bg-opacity-50">
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center animate__animated animate__fadeInDown">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3 className="font-bold text-gray-800 dark:text-white">Confirmation</h3>
                <button
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                  onClick={() => setOpenModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="text-gray-800 dark:text-neutral-400">
                  Are you sure you want to {actionName.toLowerCase()}?
                </p>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => {
                    handleConfirmAction();
                    setOpenModal(false);
                  }}
                >
                  {actionName}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmedModel;
