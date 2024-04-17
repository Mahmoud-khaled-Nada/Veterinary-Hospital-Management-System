import { FC } from "react";
import FormModelContainer from "../common/models/FormModelContainer";
import InputFieldWithError from "../common/inputs/InputFieldWithError";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { SpecialtyParam } from "@/utils/types";
import { createSpecialtyMutation } from "./process";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewSpecialtyModel: FC<Props> = ({ openModal, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecialtyParam>();

  const mutation = createSpecialtyMutation();
  const onSubmit: SubmitHandler<SpecialtyParam> = async (data: SpecialtyParam) => {
    mutation.mutateAsync(data);
  };
  return (
    <>
      {openModal && (
        <FormModelContainer
          onClose={() => setOpenModal(false)}
          title="Add Specialty"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <InputFieldWithError
              title="specialty medical name *"
              name="specialty_name"
              register={register}
              errors={errors as FieldErrorsImpl<SpecialtyParam>}
            />
          </div>
        </FormModelContainer>
      )}
    </>
  );
};

export default CreateNewSpecialtyModel;
