//.tsx

import InputField from "@/components/common/inputs/InputField";
import TextareaField from "@/components/common/inputs/TextareaField";
import { DoctorReportParams } from "@/utils/types";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiConfirmed } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { bookingFinishedMutation } from "../process";
import FormContener from "@/components/common/forms/FormContener";
import FormModelContainer from "@/components/common/models/FormModelContainer";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookingId: number | undefined;
};

const AddExaminationReportForPatientModel: FC<Props> = ({ openModal, setOpenModal, bookingId }) => {
  const { register, handleSubmit, setValue } = useForm<DoctorReportParams>();

  const mutation = bookingFinishedMutation(bookingId!);
  const onSubmit: SubmitHandler<DoctorReportParams> = async (data: DoctorReportParams) => {
    if (!data.booking_id && !data.booking_status) return;
    await mutation.mutateAsync(data);
    console.log(data)
  };

  setValue("booking_id", bookingId!);
  setValue("booking_status", "done");
  return (
    <>
      {openModal && (
        <FormModelContainer
          onClose={() => setOpenModal(false)}
          title="Edit doctor information"
          onSubmit={handleSubmit(onSubmit)}
          isLoading={mutation.isPending}
        >
          <div className="col-span-6 mb-4">
            <InputField title="Medications" name="medications" register={register} />
          </div>
          <div className="col-span-6">
            <TextareaField
              name="doctor_report"
              register={register}
              placeholder="Please add report to patient..."
              cols={80}
            />
          </div>
        </FormModelContainer>
      )}
    </>
  );
};

export default AddExaminationReportForPatientModel;
