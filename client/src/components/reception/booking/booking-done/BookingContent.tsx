
import { formatDay } from "@/utils/helper";
import { BookingDetails } from "@/utils/types";
import { FC } from "react";

type Props = {
  booking: BookingDetails[];
  isLoading: boolean;
};

const BookingContent: FC<Props> = ({ booking, isLoading }) => {
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
              <th>Print Report</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? "Loading..."
              : booking.map((booking, index) => (
                  <tr key={index} className="text-white">
                    <th>{index + 1}</th>
                    <td>{booking.specialty_name}</td>
                    <td>{booking.doctor_name}</td>
                    <td>{booking.owner_name}</td>
                    <td>{booking.booking_status}</td>
                    <td>{booking.medications}</td>
                    <td>{booking.doctor_report}</td>
                    <td>{formatDay(booking.created_at)}</td>
                    <td className=" flex items-center gap-3">
                      <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                      >
                        report
                      </button>
                  
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
