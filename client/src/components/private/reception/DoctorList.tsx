import employee from "@/assets/images/employee.webp";
import { fetchDoctorsQuery } from "../employees/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchDoctorsAppointmentsThunk } from "@/redux/reception/receptionThunk";
import { selectDoctorAppointment } from "@/redux/reception/receptionSlice";

const DoctorList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const doctors = fetchDoctorsQuery();
  const [doctorId, setDoctorId] = useState<number>();

  const selectedAppointment = useSelector((state: RootState) => selectDoctorAppointment(state, doctorId!));

  useEffect(() => {
    dispatch(fetchDoctorsAppointmentsThunk()).unwrap();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 text-left">
        {doctors &&
          doctors?.data?.map((row, index: number) => (
            <li key={index} className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <img className="w-8 h-8 rounded-full" src={employee} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{row.name}</p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">{row.phone}</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <span
                    className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 cursor-pointer"
                    onClick={() => setDoctorId(row.id)}
                  >
                    View
                  </span>
                </div>
              </div>
            </li>
          ))}
      </ul>
      {selectedAppointment && selectedAppointment.length > 0 && (
        <div className="overflow-x-auto text-sm">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>day</th>
                <th>start time</th>
                <th>end time</th>
                <th>cases number</th>
              </tr>
            </thead>
            <tbody>
              {selectedAppointment.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.day}</td>
                  <td>{row.start_time}</td>
                  <td>{row.end_time}</td>
                  <td>{row.cases_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
