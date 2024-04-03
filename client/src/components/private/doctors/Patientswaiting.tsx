import { getPatientsQueuetoDoctorThunk } from "@/redux/doctor/doctorThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Patientswaiting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const patientsQueue = useSelector((state: RootState) => state.doctor.patientsQueue);


  useEffect(() => {
    if (patientsQueue.length === 0) {
      dispatch(getPatientsQueuetoDoctorThunk()).unwrap();
    }
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Owner name</th>
            <th>Animal name</th>
            <th>Animal type</th>
            <th>Booking Status</th>
            <th>Booking date</th>
          </tr>
        </thead>
        <tbody>
          {patientsQueue.length > 0 &&
            patientsQueue.map((row, index: number) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{row.owner_name}</td>
                <td>{row.animal_name}</td>
                <td>{row.animal_type}</td>
                <td>{row.booking_status}</td>
                <td>{row.booking_date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patientswaiting;
