import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import ContenerForm from "@/components/common/main-form/ContenerForm";
import { toast } from "react-toastify";
import { processTransferToDoctorMutation } from "../actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getPatientsQueuetoDoctorThunk } from "@/redux/doctor/doctorThunk";
import { changeStatusBooking } from "@/redux/booking/bookingSlice";
// import { deleteBookingById } from "@/redux/booking/bookingSlice";
interface ModelProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  sendId: number | undefined;
}

const BookingActionModel: FC<ModelProps> = ({ openModal, setOpenModal, sendId }) => {
  const [changeStatus, setChangeStatus] = useState<string>("");
  const mutation = processTransferToDoctorMutation(sendId!);
  const handleTransferSubmit = () => {
    switch (true) {
      case !sendId:
        toast.warning("Please enter booking information");
        break;
      case !changeStatus:
        toast.warning("Please choose status");
        break;
      case changeStatus === "choose":
        toast.warning("Please choose status");
        break;
      default: {
        mutation.mutateAsync({
          booking_id: sendId,
          booking_status: changeStatus,
        });
        break;
      }
    }
  };
  return (
    <>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 z-50 flex justify-center items-center">
          <ContenerForm>
            <div className="flex items-start gap-4">
              <span className="text-red-600">
                <GiConfirmed className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <strong className="block font-medium text-white">Please confirm the edit operation.</strong>
              </div>
              <button
                className="text-gray-300 transition hover:text-gray-400"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <span className="sr-only">Dismiss popup</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <form method="dialog" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="Name" className="block text-sm font-medium text-gray-400 p-1">
                  Change Status of booking
                </label>
                <select
                  id="permission"
                  className="select select-bordered w-full"
                  onChange={(e) => setChangeStatus(e.target.value)}
                >
                  <option>choose</option>
                  <option value="waiting">waiting</option>
                  <option value="in_progress">transfer to doctor</option>
                  <option value="cancel">cancel</option>
                </select>
              </div>

              <button type="button" className="btn btn-accent" onClick={handleTransferSubmit}>
                Save
              </button>
              <button
                type="button"
                className="btn text-red-600"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Close
              </button>
            </form>
          </ContenerForm>
        </div>
      )}
    </>
  );
};

export default BookingActionModel;
