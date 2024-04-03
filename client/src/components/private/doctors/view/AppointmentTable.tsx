import { deleteAppointments } from "@/redux/doctor/doctorSlice";
import { deleteAppointmentsThunk, getDoctorAppointmentsThunk } from "@/redux/doctor/doctorThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { formatDay } from "@/utils/helper";
import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AppointmentTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user: doctorId } = useSelector((state: RootState) => state.users);
  const appointments = useSelector((state: RootState) => state.doctor.appointments);

  useEffect(() => {
    if (!doctorId?.id) {
      console.log("doctor id is undefined *****");
      toast.warning("users not found");
      return;
    }
    if (appointments.length == 0) dispatch(getDoctorAppointmentsThunk(doctorId.id!)).unwrap();
  }, []);

  const deleteAppointment = (id: number) => {
    if (!id) return;
    dispatch(deleteAppointments(id));
    dispatch(deleteAppointmentsThunk(id))
      .unwrap()
      .then((data) => {
        console.log(data);
        // dispatch(deleteAppointments(id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="overflow-x-auto text-sm">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Dr: Name</th>
            <th>Day</th>
            <th>From</th>
            <th>To</th>
            <th>patient number</th>
            <th>Created at</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 &&
            appointments.map((row, index: number) => (
              <tr key={index} className="text-white">
                <th>{index + 1}</th>
                <th>{doctorId?.name}</th>
                <th>
                  <div className="badge badge-secondary badge-outline">{row.day}</div>
                </th>
                <td>
                  <div className="badge badge-primary badge-outline"> {row.start_time}</div>
                </td>
                <td>
                  <div className="badge badge-secondary badge-outline">{row.end_time}</div>
                </td>
                <td> {row.cases_number}</td>
                <td>{formatDay(row.created_at)}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => deleteAppointment(row.id)}
                    size={20}
                    color="red"
                    cursor={"pointer"}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
