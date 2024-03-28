/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import LoadingButton from "@/components/common/button/LoadingButton";
import SelectPermissions from "@/components/common/select/SelectPermissions";
import SelectSpecialty from "@/components/common/select/SelectSpecialty";
import { fetchSpecialtyThunk } from "@/redux/specialty/specialtySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { AddDoctorParams, UserPermissionFixed } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addDoctorMutation } from "../action";
import { useToast } from "@/utils/hook/useToast";
import TextareaField from "@/components/common/inputs/TextareaField";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";
import ContenerForm from "@/components/common/main-form/ContenerForm";
const { error } = useToast({ theme: "dark" });
const DoctorForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  const [selectdSpecialty, setSelectdSpecialty] = useState<number | undefined>(undefined);
  const [selectedPermission, setSelectdPermission] = useState<UserPermissionFixed | "doctor">("doctor");

  const handleSelectdPermission = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectdPermission(event.target.value as UserPermissionFixed | "doctor");
  };

  const handleSelectdSpecialty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectdSpecialty(event.target.value as unknown as number);
  };

  useEffect(() => {
    if (specialties.length == 0) dispatch(fetchSpecialtyThunk());
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddDoctorParams>();

  const mutation = addDoctorMutation(reset);
  const onSubmit: SubmitHandler<AddDoctorParams> = async (data: AddDoctorParams) => {
    if (isNaN(data?.specialty_id as any) || !data.permission) {
      error("pleas choose specialty");
      return;
    }
    mutation.mutateAsync(data);
  };
  setValue("is_doctor", true);
  setValue("specialty_id", +selectdSpecialty!);
  setValue("permission", selectedPermission);

  return (
    <>
        <ContenerForm>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <InputFieldWithError
            title="Dr: Name *"
            name="name"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
          <InputFieldWithError
            title="Dr: Email *"
            name="email"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <InputFieldWithError
            title="Dr: Phone *"
            name="phone"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
          <InputFieldWithError
            title="Dr: Password *"
            name="password"
            typeInput="password"
            register={register}
            errors={errors as FieldErrorsImpl<AddDoctorParams>}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
          <SelectSpecialty
            setSpecialties={specialties}
            onChange={handleSelectdSpecialty}
            errors={errors.specialty_id?.message}
          />
          <SelectPermissions
            defaultPermission="doctor"
            onChange={handleSelectdPermission}
            errors={errors.permission?.message}
          />
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

export default DoctorForm;
