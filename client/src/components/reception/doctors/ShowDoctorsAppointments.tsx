/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectDoctorAppointment } from "@/store/appointmentSlice";
import { fetchDoctorsQuery } from "@/components/employees/process";
import employee from "@/__assets__/images/employee.webp";

const ShowDoctorsAppointments = () => {
  const doctorsQuery = fetchDoctorsQuery();
  const [doctorId, setDoctorId] = useState<number | undefined>();
  const selectedAppointment = useSelector((state: RootState) =>
    selectDoctorAppointment(state, doctorId!)
  );

  if (doctorsQuery.isLoading) return "Loading...";

  return (
    <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 text-left">
        {doctorsQuery.data?.map((doctor: any, index: number) => (
          <li key={`doctor-${doctor.id}`} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={employee} alt="Employee" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {doctor.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {doctor.phone}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <span
                  className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 cursor-pointer"
                  onClick={() => setDoctorId(doctor.id)}
                >
                  View
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedAppointment.length === 0 ? (
        "No appointments"
      ) : (
        <div className="overflow-x-auto text-sm">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Cases Number</th>
              </tr>
            </thead>
            <tbody>
              {selectedAppointment.map((appointment: any, index: number) => (
                <tr key={`appointment-${index}`}>
                  <td>{index + 1}</td>
                  <td>{appointment.day}</td>
                  <td>{appointment.start_time}</td>
                  <td>{appointment.end_time}</td>
                  <td>{appointment.cases_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowDoctorsAppointments;
