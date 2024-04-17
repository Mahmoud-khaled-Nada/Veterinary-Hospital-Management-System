import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  actionId: number | undefined;
  onDone: (id: number | undefined) => void;
}

const ConfirmedActionModel: FC<Props> = ({ openModal, setOpenModal, onDone, actionId }) => {
  return (
    <>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 z-50 flex justify-center items-center">
          <div className="rounded-xl max-w-[500px] border border-gray-100 bg-white p-4">
            <div className="flex items-start gap-4">
              <span className="text-red-600">
                <GiConfirmed className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <strong className="block font-medium text-gray-900">
                  Please confirm the deletion operation.
                </strong>
              </div>
              <button
                className="text-gray-500 transition hover:text-gray-600"
                onClick={() => setOpenModal(false)}
              >
                <span className="sr-only">Dismiss popup</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-start gap-4 mt-6">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => onDone(actionId)}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmedActionModel;