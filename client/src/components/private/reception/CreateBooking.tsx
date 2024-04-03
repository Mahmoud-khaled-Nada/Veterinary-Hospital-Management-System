/* eslint-disable @typescript-eslint/no-explicit-any */
import ContenerForm from "@/components/common/main-form/ContenerForm";
import DoctorsByDateAndSpecialty from "./view/DoctorsByDateAndSpecialty";
import { useState } from "react";
import { DoctorAppointmentsDetails, PatientBookingParams } from "@/utils/types";
import ShowDoctorCardList from "@/components/common/ShowDoctorCardList";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "@/components/common/button/LoadingButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSpecialtyByName } from "@/redux/specialty/specialtySlice";
import { RootState } from "@/redux/store";
import { addPatientBookingMutation } from "./actions";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";

const CreateBooking = () => {
  const { id: patient_id }: any = useParams();
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAppointmentsDetails[]>([]);
  const [doctor_id, setDoctorId] = useState<number>();
  const [booking_date, setDate] = useState<string>();
  const [specialtyName, setspecialtyName] = useState<string>();

  const specialty: any = useSelector((state: RootState) => selectSpecialtyByName(state, specialtyName!));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientBookingParams>();

  const mutation = addPatientBookingMutation();
  const onSubmit: SubmitHandler<PatientBookingParams> = async (data: PatientBookingParams) => {
    mutation.mutateAsync(data)
  };

  setValue("patient_id", parseInt(patient_id));
  setValue("user_id", doctor_id);
  setValue("specialty_id", specialty?.id);
  setValue("booking_date", booking_date);
  // JSX
  return (
    <div className="flex justify-center items-start mt-10 gap-10 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[60%]">
        <ContenerForm>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="block text-sm font-medium dark:text-white">Booking date</span>
              </div>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="input input-bordered w-full border"
              />
            </label>
            <DoctorsByDateAndSpecialty
              setspecialtyValue={setspecialtyName}
              setSelectedDoctor={setSelectedDoctor}
              date={booking_date}
            />
            <div className="mt-2">
              <InputFieldWithError
                title="Detection price"
                register={register}
                name="detection_price"
                errors={errors as FieldErrorsImpl<PatientBookingParams>}
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <LoadingButton inputType="submit" title="save" isLoading={mutation.isPending} />
          </div>
        </ContenerForm>
      </form>
      <div className="w-[30%]">
        <ShowDoctorCardList title="Available Doctors" data={selectedDoctor} setDoctorId={setDoctorId} />
      </div>
    </div>
  );
};

export default CreateBooking;
