/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";
import LoadingButton from "@/components/common/button/LoadingButton";
import { AppointmentsParam } from "@/utils/types";
import { addDoctorAppointmentsMutation } from "../actions";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const { user } = useSelector((state: RootState) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentsParam>();
  if (!user?.id) return;
  const mutation = addDoctorAppointmentsMutation(user?.id);
  const onSubmit: SubmitHandler<AppointmentsParam> = async (data: AppointmentsParam) => {
    if (!user.is_doctor) {
      toast.warn("Doctor not found");
      return;
    }

    mutation?.mutateAsync(data);
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
          title="From time *"
          register={register}
          name="start_time"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
        <InputFieldWithError
          title="To time *"
          register={register}
          name="end_time"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
        <InputFieldWithError
          title="Maximum patient *"
          register={register}
          name="cases_number"
          typeInput="number"
          errors={errors as FieldErrorsImpl<AppointmentsParam>}
        />
      </div>
      <div className=" flex justify-center items-center gap-5 pt-6">
        <LoadingButton inputType="submit" title="Add doctor" isLoading={mutation?.isPending} />
        <LoadingButton title="reset" color="red" />
      </div>
    </form>
  );
};

export default AppointmentForm;
