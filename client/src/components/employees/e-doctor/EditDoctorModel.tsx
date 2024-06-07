import FormModelContainer from "@/components/common/models/FormModelContainer";
import SelectPermissions from "@/components/common/select/SelectPermissions";
import SelectSpecialty from "@/components/common/select/SelectSpecialty";
import { EditDoctorParams } from "@/utils/types";
import { FC } from "react";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { useUpdateDoctorMutation } from "../process";
import InputField from "@/components/common/inputs/InputField";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: number | null;
}

const EditDoctorModel: FC<Props> = ({ openModal, setOpenModal, selectedId }) => {
  const updateDoctorMutation = useUpdateDoctorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDoctorParams>();

  const onSubmit: SubmitHandler<EditDoctorParams> = async (data: EditDoctorParams) => {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== ""));
    if (selectedId) await updateDoctorMutation.mutateAsync({ selectedId, filteredData });
  };

  return (
    <>
      {openModal && (
        <FormModelContainer
          onClose={() => setOpenModal(false)}
          title="Edit doctor information"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <InputField title="Dr: Name *" name="name" register={register} />
            <InputField title="Dr: Email *" name="email" register={register} />
          </div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <InputField title="Dr: Phone *" name="phone" register={register} />
            <InputField title="Dr: Password *" name="password" typeInput="password" register={register} />
          </div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <SelectSpecialty register={register} errors={errors as FieldErrorsImpl<EditDoctorParams>} />
            <SelectPermissions register={register} errors={errors as FieldErrorsImpl<EditDoctorParams>} />
          </div>
        </FormModelContainer>
      )}
    </>
  );
};

export default EditDoctorModel;
