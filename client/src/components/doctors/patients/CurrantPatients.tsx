import staticDog from "@/__assets__/images/static-dog.jpg";
import { getPatientsQueuetoDoctorThunk } from "@/store/doctor/doctorThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import AddExaminationReportForPatientModel from "./AddExaminationReportForPatientModel";

const CurrantPatients = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const patient = useSelector((state: RootState) => state.doctor.queue[0]);
  useEffect(() => {
    !patient && dispatch(getPatientsQueuetoDoctorThunk());
  }, [patient]);

  return (
    <>
      {patient == undefined && (
        <div className="m-auto mt-2 w-[70%] bg-yellow-500 text-sm text-white rounded-lg p-4" role="alert">
          <span className="font-bold">Warning</span> You not have booking today
        </div>
      )}
      {patient && (
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
                  <tr className="bg-base-200 text-white">
                    <td>{patient.owner_name}</td>
                    <td>{patient.animal_name}</td>
                    <td>{patient.animal_type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="absolute top-3/4 left-1/2">
              <button className="btn bg-blue-600 text-white mr-2" onClick={() => setOpenModal(true)}>
                Add Report
              </button>
              {patient && (
                <AddExaminationReportForPatientModel
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  bookingId={patient?.booking_id}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrantPatients;
