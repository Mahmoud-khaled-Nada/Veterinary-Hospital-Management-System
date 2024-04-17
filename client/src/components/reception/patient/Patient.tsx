import { useEffect } from "react";
import PatientContent from "./PatientContent";
import AddPatientForm from "./PatientForm";
import { getAllAppointmentsThunk } from "@/store/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const Patient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const patient = useSelector((state: RootState) => state.patient.patient);
  useEffect(() => {
    !patient && dispatch(getAllAppointmentsThunk());
  }, []);

  return (
    <section className="px-10">
      <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <AddPatientForm />
      </div>
      <div className="divider"></div>
      <PatientContent patient={patient} />
    </section>
  );
};

export default Patient;
