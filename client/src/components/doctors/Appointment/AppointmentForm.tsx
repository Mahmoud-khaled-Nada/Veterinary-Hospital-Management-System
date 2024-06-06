import { AppointmentsParam } from "@/utils/types";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import InputFieldWithError from "../../common/inputs/InputFieldWithError";
import Button from "../../common/button/Button";
import { isFutureOrToday } from "@/utils/helper";
import { toast } from "react-toastify";
import { addDoctorAppointmentsMutation } from "../process";

const AppointmentForm = () => {
  // process...
  const mutation = addDoctorAppointmentsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentsParam>();

  const onSubmit: SubmitHandler<AppointmentsParam> = async (data: AppointmentsParam) => {
    if (!isFutureOrToday(data.day)) {
      toast.warn("Please select a today date or a future date");
      return;
    }
    await mutation.mutateAsync(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-4">
        <InputFieldWithError
          title="Doctor appointments day *"
          register={register}
          name="day"
          typeInput="date"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
        <InputFieldWithError
          title="From time (PM)*"
          register={register}
          name="start_time"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
        <InputFieldWithError
          title="To time (PM)*"
          register={register}
          name="end_time"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
        <InputFieldWithError
          title="Cases number *"
          register={register}
          name="cases_number"
          typeInput="number"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
      </div>
      <div className=" flex justify-center items-center gap-5 pt-6">
        <Button inputType="submit" title="Add doctor" isLoading={mutation?.isPending} />
        <Button title="reset" color="red" onClick={() => reset()} />
      </div>
    </form>
  );
};

export default AppointmentForm;
