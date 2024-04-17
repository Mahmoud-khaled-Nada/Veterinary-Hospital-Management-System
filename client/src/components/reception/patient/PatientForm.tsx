import Button from "@/components/common/button/Button";
import FormContener from "@/components/common/forms/FormContener";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";
import { CreatePatientParams } from "@/utils/types";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { addPatientMutation } from "./process";
const AddPatientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePatientParams>();
  const postMutation = addPatientMutation();
  const onSubmit: SubmitHandler<CreatePatientParams> = async (data: CreatePatientParams) =>
    await postMutation.mutateAsync(data);

  return (
    <FormContener>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <InputFieldWithError
            title="Owner Name"
            name="owner_name"
            register={register}
            errors={errors as FieldErrorsImpl<CreatePatientParams>}
          />
          <InputFieldWithError
            title="Owner email"
            register={register}
            name="owner_email"
            errors={errors as FieldErrorsImpl<CreatePatientParams>}
            typeInput="email"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <InputFieldWithError
            title="Owner phone number"
            register={register}
            name="owner_number"
            errors={errors as FieldErrorsImpl<CreatePatientParams>}
          />
          <InputFieldWithError
            title="Animal Name"
            register={register}
            name="animal_name"
            errors={errors as FieldErrorsImpl<CreatePatientParams>}
          />
          <InputFieldWithError
            title="Animal name"
            register={register}
            name="animal_type"
            errors={errors as FieldErrorsImpl<CreatePatientParams>}
          />
        </div>
        <div className="f flex justify-center items-center gap-5">
          <Button inputType="submit" title="save" isLoading={postMutation.isPending} />
          <Button onClick={() => reset()} title="reset" color="red" />
        </div>
      </form>
    </FormContener>
  );
};

export default AddPatientForm;
