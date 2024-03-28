import ContenerForm from "@/components/common/main-form/ContenerForm";
import AppointmentForm from "./view/AppointmentForm";
import AppointmentTable from "./view/AppointmentTable";


const DoctorsAppointments = () => {
  return (

    <section className="px-10">
    <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
    <ContenerForm>
        <AppointmentForm />
        </ContenerForm>
    </div>
    <div className="divider"></div>
    <AppointmentTable />
  </section>

  );
};

export default DoctorsAppointments;
