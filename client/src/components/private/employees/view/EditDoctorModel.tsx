/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import SelectPermissions from "@/components/common/select/SelectPermissions";
import SelectSpecialty from "@/components/common/select/SelectSpecialty";
import InputField from "@/components/common/inputs/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserPermissionFixed } from "@/utils/types";
import { fetchSpecialtyThunk } from "@/redux/specialty/specialtySlice";
import LoadingButton from "@/components/common/button/LoadingButton";
import TextareaField from "@/components/common/inputs/TextareaField";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserasDoctorMutation } from "../action";
import ContenerForm from "@/components/common/main-form/ContenerForm";

type AddDoctorParams = {
  is_doctor: boolean;
  specialty_id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  password?: string | undefined;
  permission?: "doctor" | UserPermissionFixed | undefined;
  extra_info?: string | undefined;
};

interface Props {
  openModalEdit: boolean;
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  doctorId: number | undefined;
}

const EditDoctorModel: FC<Props> = ({ openModalEdit, setOpenModalEdit, doctorId }) => {
  console.log("get user id from edit doctor");
  console.log(doctorId);

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
    formState: { errors },
  } = useForm<AddDoctorParams>();

  const mutation = updateUserasDoctorMutation(doctorId!);
  const onSubmit: SubmitHandler<AddDoctorParams> = async (data: AddDoctorParams) => {
    if (isNaN((data?.specialty_id as any) && !data?.specialty_id)) delete data.specialty_id;
    !data.email && delete data.email;
    !data.name && delete data.name;
    !data.password && delete data.password;
    !data.phone && delete data.phone;
    !data.permission && delete data.permission;
    !data.extra_info && delete data.extra_info;
    console.log(data);
    mutation.mutateAsync(data as any);
  };
  setValue("is_doctor", true);
  setValue("specialty_id", +selectdSpecialty!);
  setValue("permission", selectedPermission);

  mutation.isSuccess && setOpenModalEdit(false);

  return (
    <>
      {openModalEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 z-50 flex justify-center items-center">
          <ContenerForm>
            <div className="flex items-start gap-4">
              <span className="text-red-600">
                <GiConfirmed className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <strong className="block font-medium text-white">
                  Please confirm the edit operation.
                </strong>
              </div>
              <button
                className="text-gray-300 transition hover:text-gray-400"
                onClick={() => {
                  setOpenModalEdit(false);
                }}
              >
                <span className="sr-only">Dismiss popup</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                <InputField title="Dr: Name *" name="name" register={register} />
                <InputField title="Dr: Email *" name="email" register={register} />
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                <InputField title="Dr: Phone *" name="phone" register={register} />
                <InputField title="Dr: Password *" name="password" typeInput="password" register={register} />
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
        </div>
      )}
    </>
  );
};

export default EditDoctorModel;
