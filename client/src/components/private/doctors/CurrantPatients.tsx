import staticDog from "@/assets/images/static-dog.jpg";
import { getPatientsQueuetoDoctorThunk } from "@/redux/doctor/doctorThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import DoctorReportToPatientMode from "./view/DoctorReportToPatientMode";
import { bookingFinishedMutation } from "./actions";
const CurrantPatients = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const patient = useSelector((state: RootState) => state.doctor.patientsQueue[0]);
  useEffect(() => {
    dispatch(getPatientsQueuetoDoctorThunk());
    // .unwrap()
    // .then((data) => setPatient(data[0]));
  }, []);

  const mutation = bookingFinishedMutation(bookingId!);

  const isCaseDone = (id: number) => {
    if (!id) return;
    setBookingId(id)
    mutation.mutateAsync({
      booking_id: id,
      booking_status: "done",
    });
  };


  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img className="min-w-80 h-96" src={staticDog} alt="Movie" />
      </figure>
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white text-base">
                <th>Owner name</th>
                <th>Animal name</th>
                <th>Animal type</th>
              </tr>
            </thead>
            <tbody>
              {patient && (
                <tr className="bg-base-200 text-white">
                  <td>{patient.owner_name}</td>
                  <td>{patient.animal_name}</td>
                  <td>{patient.animal_type}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute top-3/4 left-1/2">
          <button className="btn bg-blue-600 text-white mr-2" onClick={() => setOpenModal(true)}>
            Add Report
          </button>
          <button className="btn bg-emerald-600 text-white" onClick={() => isCaseDone(patient.booking_id)}>
            Done
          </button>
          {patient && (
            <DoctorReportToPatientMode
              openModal={openModal}
              setOpenModal={setOpenModal}
              bookingId={patient?.booking_id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrantPatients;
