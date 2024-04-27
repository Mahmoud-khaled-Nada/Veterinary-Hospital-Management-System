import SmallButton from "@/components/common/button/SmallButton";
import { formatDay } from "@/utils/helper";
import { SafeReportParams } from "@/utils/types";
import { FC } from "react";

type Props = {
  safe: SafeReportParams[];
  total: number;
  isLoading: boolean;
};

const SafeContent: FC<Props> = ({ safe, isLoading, total }) => {
  function printSafeContent() {
    window.print();
  }

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
              <th>detection_price</th>
              <th>Booking Date</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? "Loading"
              : safe.map((row, index) => (
                  <tr key={index} className="text-white">
                    <th>{index + 1}</th>
                    <td>{row.specialty_name}</td>
                    <td>{row.doctor_name}</td>
                    <td>{row.owner_name}</td>
                    <td>{row.booking_status}</td>
                    <td>{row.detection_price}</td>
                    <td>{row.booking_date}</td>
                    <td>{formatDay(row.created_at)}</td>
                  </tr>
                ))}
            {/* Total row */}
            {!isLoading && (
              <tr>
                <td colSpan={4}></td>
                <td className="text-red-600">
                  <strong>Total:</strong>
                </td>
                <td className="text-yellow-600">
                  <strong>{total}</strong>
                </td>
                <td colSpan={2}></td>
              </tr>
            )}
          </tbody>
          <div className=" text-center">
            <SmallButton title="Print" onClick={printSafeContent} />
          </div>
        </table>
      </div>
    </>
  );
};

export default SafeContent;
