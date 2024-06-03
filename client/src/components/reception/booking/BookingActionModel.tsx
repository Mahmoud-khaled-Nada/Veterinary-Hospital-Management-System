import { FC, useState } from "react";
import { toast } from "react-toastify";
import { processTransferToDoctorMutation } from "./process";
import FormModelContainer from "@/components/common/models/FormModelContainer";
interface ModelProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookingId: number | undefined;
}
const BookingActionModel: FC<ModelProps> = ({ openModal, setOpenModal, bookingId }) => {
  const [changeStatus, setChangeStatus] = useState<string>("");
  const mutation = processTransferToDoctorMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (true) {
      case !bookingId:
        toast.warning("Please enter booking information");
        break;
      case !changeStatus:
        toast.warning("Please choose status");
        break;
      case changeStatus === "choose":
        toast.warning("Please choose status");
        break;
      default: {
        await mutation.mutateAsync({
          booking_id: bookingId,
          booking_status: changeStatus,
        });
        break;
      }
    }
  };
  return (
    <>
      {openModal && (
        <FormModelContainer
          onClose={() => setOpenModal(false)}
          title="Please confirm the edit operation."
          onSubmit={handleSubmit}
          isLoading={mutation.isPending}
        >
          <div className="col-span-6">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-400 p-1">
              Change Status of booking
            </label>
            <select
              id="permission"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral400 dark:placeholder-neutral500 dark:focus:ring-neutral600"
              onChange={(e) => setChangeStatus(e.target.value)}
            >
              <option disabled>choose</option>
              <option value="in_progress">transfer to doctor</option>
              <option value="cancel">cancel</option>
            </select>
          </div>
        </FormModelContainer>
      )}
    </>
  );
};

export default BookingActionModel;
