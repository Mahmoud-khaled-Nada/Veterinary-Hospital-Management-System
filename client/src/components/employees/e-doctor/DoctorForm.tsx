import SelectPermissions from "@/components/common/select/SelectPermissions";
import { EmployeeParams } from "@/utils/types";
import { FC } from "react";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import TextareaField from "@/components/common/inputs/TextareaField";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";
import FormContener from "../../common/forms/FormContener";
import Button from "../../common/button/Button";
import SelectSpecialty from "../../common/select/SelectSpecialty";
import { addEmployeeMutation } from "../process";
import { toast } from "react-toastify";
const DoctorForm: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EmployeeParams>();
  setValue("is_doctor", true);
  const mutation = addEmployeeMutation();
  const onSubmit: SubmitHandler<EmployeeParams> = async (data: EmployeeParams) => {
    try {
      await mutation.mutateAsync(data);
      toast.success("Employee added successfully");
      reset();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <FormContener>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <InputFieldWithError
              title="Dr: Name *"
              name="name"
              register={register}
              errors={errors as FieldErrorsImpl<EmployeeParams>}
            />
            <InputFieldWithError
              title="Dr: Email *"
              name="email"
              register={register}
              errors={errors as FieldErrorsImpl<EmployeeParams>}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <InputFieldWithError
              title="Dr: Phone *"
              name="phone"
              register={register}
              errors={errors as FieldErrorsImpl<EmployeeParams>}
            />
            <InputFieldWithError
              title="Dr: Password *"
              name="password"
              typeInput="password"
              register={register}
              errors={errors as FieldErrorsImpl<EmployeeParams>}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <SelectSpecialty register={register} errors={errors as FieldErrorsImpl<EmployeeParams>} />
            <SelectPermissions register={register} errors={errors as FieldErrorsImpl<EmployeeParams>} />
          </div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-1">
            <TextareaField name="extra_info" cols={90} register={register} />
          </div>

          <div className=" flex justify-center items-center gap-5 pt-6">
            <Button inputType="submit" title="Add doctor" isLoading={mutation.isPending} />
            <Button title="reset" color="red" />
          </div>
        </form>
      </FormContener>
    </>
  );
};

export default DoctorForm;
