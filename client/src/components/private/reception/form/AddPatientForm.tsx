import LoadingButton from "@/components/common/button/LoadingButton";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";
import ContenerForm from "@/components/common/main-form/ContenerForm";
import { CreatePatientDetails } from "@/utils/types";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { addPatientMutation } from "../actions";
const AddPatientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePatientDetails>();

  const mutation = addPatientMutation(reset);

  const onSubmit: SubmitHandler<CreatePatientDetails> = async (data: CreatePatientDetails) =>
    mutation.mutateAsync(data);

  return (
    <ContenerForm>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <InputFieldWithError
            title="Owner Name"
            name="owner_name"
            register={register}
            errors={errors as FieldErrorsImpl<CreatePatientDetails>}
           
          />
          <InputFieldWithError
            title="Owner email"
            register={register}
            name="owner_email"
            errors={errors as FieldErrorsImpl<CreatePatientDetails>}
            typeInput="email"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <InputFieldWithError
            title="Owner phone number"
            register={register}
            name="owner_number"
            errors={errors as FieldErrorsImpl<CreatePatientDetails>}
          />
          <InputFieldWithError
            title="Animal Name"
            register={register}
            name="animal_name"
            errors={errors as FieldErrorsImpl<CreatePatientDetails>}
          />
          <InputFieldWithError
            title="Animal name"
            register={register}
            name="animal_type"
            errors={errors as FieldErrorsImpl<CreatePatientDetails>}
          />
        </div>
        <div className="f flex justify-center items-center gap-5">
          <LoadingButton inputType="submit" title="save" isLoading={mutation.isPending} />
          <LoadingButton onClick={() => reset()} title="reset" color="red" />
        </div>
      </form>
    </ContenerForm>
  );
};

export default AddPatientForm;
