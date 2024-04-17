import Button from "@/components/common/button/Button";
import FormContener from "@/components/common/forms/FormContener";
import SelectSpecialtyByName from "@/components/common/select/SelectSpecialtyByName";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { createBookingMutation, filterDoctorsByDateAndSpecialty } from "./process";
import ShowDoctorCardList from "./ShowDoctorCardList";
import { DoctorAppointmentsDetails } from "@/utils/types";
import { getAllAppointmentsThunk } from "@/store/appointmentSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { selectSpecialtyByName } from "@/store/specialtySlice";

const CreateBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const [bookingData, setBookingData] = useState({
    day: "",
    specialty: "",
    doctorId: null as number | null,
    detectionPrice: "",
    patientId: id ? parseInt(id) : null,
  });

  const [doctors, setDoctors] = useState<DoctorAppointmentsDetails[]>([]);

  const doctorsAppointment = useSelector((state: RootState) => state.appointment.allAppointments);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (doctorsAppointment.length === 0) dispatch(getAllAppointmentsThunk());
  }, []);

  useEffect(() => {
    setDoctors(filterDoctorsByDateAndSpecialty(doctorsAppointment, bookingData.specialty, bookingData.day));
  }, [bookingData.day, bookingData.specialty, doctorsAppointment]);

  const selectSpecialty = useSelector((state: RootState) =>
    selectSpecialtyByName(state, bookingData.specialty)
  );

  const createBooking = createBookingMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { day, doctorId, patientId, detectionPrice } = bookingData;
      if (!day || !selectSpecialty?.id || !doctorId || !patientId) {
        toast.warn("Please fill all the fields");
        return;
      }
      await createBooking.mutateAsync({
        patient_id: patientId,
        user_id: doctorId,
        specialty_id: selectSpecialty?.id,
        detection_price: detectionPrice,
        booking_date: day,
      });
    } catch (error) {
      console.log("error from create booking function");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-start mt-10 gap-10">
      <FormContener>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="block text-sm font-medium dark:text-white">Booking date</span>
              </div>
              <input
                onChange={handleInputChange}
                name="day"
                type="date"
                value={bookingData.day}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
            </label>
            <div className="mt-2">
              <SelectSpecialtyByName
                selectSpecialty={(value) => setBookingData({ ...bookingData, specialty: value })}
              />
            </div>
            <label className="form-control w-full">
              <div className="label">
                <span className="block text-sm font-medium dark:text-white">Detection price</span>
              </div>
              <input
                onChange={handleInputChange}
                name="detectionPrice"
                value={bookingData.detectionPrice}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
            </label>
          </div>
          <div className="mt-6 text-end">
            <Button inputType="submit" title="save" isLoading={createBooking.isPending} />
          </div>
        </form>
      </FormContener>
      <div className="w-[30%]">
        <ShowDoctorCardList
          title="Available Doctors"
          setDoctor={doctors}
          setDoctorId={(id) => setBookingData({ ...bookingData, doctorId: id })}
        />
      </div>
    </div>
  );
};

export default CreateBooking;
