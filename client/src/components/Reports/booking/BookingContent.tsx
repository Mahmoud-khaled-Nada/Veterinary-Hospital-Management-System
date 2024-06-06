import SmallButton from "@/components/common/button/SmallButton";
import { deleteBookingReportAPI } from "@/utils/apis";
import { formatDay } from "@/utils/helper";
import { BookingDetails } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { toast } from "react-toastify";

type Props = {
  booking: BookingDetails[];
};

const BookingContent: FC<Props> = ({ booking }) => {


  const mutation = useMutation({
    mutationKey: ["deleteBookingReport"],
    mutationFn: async (id: number) => {
      return await deleteBookingReportAPI(id); // calling API
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
    },
    onError: (error) => {
      console.log("Create Specialty Error");
      console.log(error);
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Specialty</th>
              <th>Doctor</th>
              <th>Owner name</th>
              <th>Booking Status</th>
              <th>Medications</th>
              <th>Doctor Report</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((booking, index) => (
                  <tr key={index} className="text-white">
                    <th>{index + 1}</th>
                    <td>{booking.specialty_name}</td>
                    <td>{booking.doctor_name}</td>
                    <td>{booking.owner_name}</td>
                    <td>{booking.booking_status}</td>
                    <td>{booking.medications}</td>
                    <td>{booking.doctor_report}</td>
                    <td>{formatDay(booking.created_at)}</td>
                    <td>
                      <SmallButton
                        title="delete"
                        onClick={() => mutation.mutateAsync(booking.id)}
                        color="red"
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingContent;
