import InputField from "@/components/common/inputs/InputField";
import TextareaField from "@/components/common/inputs/TextareaField";
import ContenerForm from "@/components/common/main-form/ContenerForm";
import { DoctorReportParams } from "@/utils/types";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiConfirmed } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { bookingFinishedMutation } from "../actions";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookingId: number | undefined;
};

const DoctorReportToPatientMode: FC<Props> = ({ openModal, setOpenModal, bookingId }) => {
  const { register, handleSubmit, setValue } = useForm<DoctorReportParams>();

  const mutation = bookingFinishedMutation(bookingId!);
  const onSubmit: SubmitHandler<DoctorReportParams> = async (data: DoctorReportParams) => {
    if (!data.booking_id && !data.booking_status) return;
    console.log(data);
    mutation.mutateAsync(data);
  };

  setValue("booking_id", bookingId!);
  setValue("booking_status", "done");
  return (
    <>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 z-50 flex justify-center items-center">
          <ContenerForm>
            <div className="flex items-start gap-4">
              <span className="text-red-600">
                <GiConfirmed className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <strong className="block font-medium text-white">Please confirm the edit operation.</strong>
              </div>
              <button
                className="text-gray-300 transition hover:text-gray-400"
                onClick={() => setOpenModal(false)}
              >
                <span className="sr-only">Dismiss popup</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
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
              <button type="submit" className="btn btn-accent">
                save
              </button>
              <button type="button" className="btn" onClick={() => setOpenModal(false)}>
                Close
              </button>
            </form>
          </ContenerForm>
        </div>
      )}
    </>
  );
};

export default DoctorReportToPatientMode;
