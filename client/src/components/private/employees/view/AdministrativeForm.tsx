/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import LoadingButton from "@/components/common/button/LoadingButton";
import InputField from "@/components/common/inputs/InputFieldWithError";
import SelectPermissions from "@/components/common/select/SelectPermissions";
import { AddDoctorParams, UserPermissionFixed } from "@/utils/types";
import { FC, useState } from "react";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { addDoctorMutation } from "../action";
import { useToast } from "@/utils/hook/useToast";
import TextareaField from "@/components/common/inputs/TextareaField";
import ContenerForm from "@/components/common/main-form/ContenerForm";
const { error } = useToast({ theme: "dark" });
const AdministrativeForm: FC = () => {
  const [selectedPermission, setSelectdPermission] = useState<UserPermissionFixed | undefined>();

  const handleSelectdPermission = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectdPermission(event.target.value as unknown as UserPermissionFixed);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddDoctorParams>();

  const mutation = addDoctorMutation(reset);
  const onSubmit: SubmitHandler<AddDoctorParams> = async (data: AddDoctorParams) => {
    if (!data.permission) {
      error("pleas choose specialty");
      return;
    }
    mutation.mutateAsync(data);
  };
  setValue("is_doctor", false);
  setValue("permission", selectedPermission!);

  return (
    <>
       <ContenerForm>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <InputField
            title="Mr: Name *"
            name="name"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
          <InputField
            title="Mr: Email *"
            name="email"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <InputField
            title="Mr: Phone *"
            name="phone"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
          <InputField
            title="Mr: Password *"
            name="password"
            typeInput="password"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-1">
          <SelectPermissions onChange={handleSelectdPermission} errors={errors.permission?.message} />
        </div>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-1">
          <TextareaField name="extra_info" cols={90} register={register} />
        </div>

        <div className=" flex justify-center items-center gap-5 pt-6">
          <LoadingButton inputType="submit" title="Add doctor" isLoading={mutation.isPending} />
          <LoadingButton title="reset" color="red" />
        </div>
      </form>
       </ContenerForm>
    </>
  );
};

export default AdministrativeForm;
