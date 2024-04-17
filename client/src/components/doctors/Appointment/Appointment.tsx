import { useDispatch, useSelector } from "react-redux";
import FormContener from "../../common/forms/FormContener";
import AppointmentContent from "./AppointmentContent";
import AppointmentForm from "./AppointmentForm";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { getDoctorAppointmentsThunk } from "@/store/appointmentSlice";

const Appointment = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDoctorAppointmentsThunk());
  }, []);

  const { appointments } = useSelector((state: RootState) => state.appointment);
  return (
    <section className="px-10">
      <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <FormContener>
          <AppointmentForm />
        </FormContener>
      </div>
      <div className="divider"></div>
      <AppointmentContent appointments={appointments} />
    </section>
  );
};

export default Appointment;
