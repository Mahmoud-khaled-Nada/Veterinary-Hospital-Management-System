import { formatDay } from "@/utils/helper";
import { BookingDetails } from "@/utils/types";
import { FC, Fragment } from "react";

type Props = {
  booking: BookingDetails[];
  isLoading: boolean;
};

const BookingContent: FC<Props> = ({ booking, isLoading }) => {
  
  function printBookingDetails(areaId: string) {
  const prtContent = document.getElementById(areaId);
  if (!prtContent) {
      console.error(`Element with ID ${areaId} not found.`);
      return;
  }

  const index = prtContent.querySelector<Element>("td:nth-child(1)")?.textContent;
  const specialtyName = prtContent.querySelector<Element>("td:nth-child(2)")?.textContent;
  const doctorName = prtContent.querySelector<Element>("td:nth-child(3)")?.textContent;
  const ownerName = prtContent.querySelector<Element>("td:nth-child(4)")?.textContent;
  const bookingStatus = prtContent.querySelector<Element>("td:nth-child(5)")?.textContent;
  const medications = prtContent.querySelector<Element>("td:nth-child(6)")?.textContent;
  const doctorReport = prtContent.querySelector<Element>("td:nth-child(7)")?.textContent;
  const createdAt = prtContent.querySelector<Element>("td:nth-child(8)")?.textContent;

  const WinPrint = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0");
  if (!WinPrint) {
      console.error("Failed to open print window.");
      return;
  }

  WinPrint.document.write(`
      <html>
      <head>
          <title>Booking Details</title>
          <style>
              .table {
                  width: 100%;
                  border-collapse: collapse;
              }
              .table th, .table td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
              }
              .table th {
                  background-color: #f2f2f2;
              }
              .text-white {
                  color: #fff;
              }
          </style>
      </head>
      <body>
          <table class="table">
              <thead>
                  <tr> 
                      <th>Specialty</th>
                      <th>Doctor</th>
                      <th>Owner name</th>
                      <th>Booking Status</th>
                      <th>Medications</th>
                      <th>Doctor Report</th>
                      <th>Created At</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="text-white">
                  <td></td>
                      <td>${specialtyName ?? ''}</td>
                      <td>${doctorName ?? ''}</td>
                      <td>${ownerName ?? ''}</td>
                      <td>${bookingStatus ?? ''}</td>
                      <td>${medications ?? ''}</td>
                      <td>${doctorReport ?? ''}</td>
                      <td>${createdAt ?? ''}</td>
                  </tr>
              </tbody>
          </table>
      </body>
      </html>
  `);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}


  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <th>Specialty</th>
                <th>Doctor</th>
                <th>Owner name</th>
                <th>Booking Status</th>
                <th>Medications</th>
                <th>Doctor Report</th>
                <th>Created At</th>
              </th>
              <th>Print Report</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? "Loading..."
              : booking.map((booking, index) => (
                  <tr key={index} className="text-white">
                    <th>{index + 1}</th>
                    <td id={`print-area-${index}`}>
                      <td>{booking.specialty_name}</td>
                      <td>{booking.doctor_name}</td>
                      <td>{booking.owner_name}</td>
                      <td>{booking.booking_status}</td>
                      <td>{booking.medications}</td>
                      <td>{booking.doctor_report}</td>
                      <td>{formatDay(booking.created_at)}</td>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                        onClick={() => printBookingDetails(`print-area-${index}`)}
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
