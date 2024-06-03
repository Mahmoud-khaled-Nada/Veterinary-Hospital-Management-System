import InputField from "@/components/common/inputs/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContener from "../../common/forms/FormContener";
import Button from "../../common/button/Button";
import { useMutation } from "@tanstack/react-query";
import { BookingDetails, BookingReportParams } from "@/utils/types";
import { bookingReportAPI } from "@/utils/apis";
import { useState } from "react";
import BookingContent from "./BookingContent";

type ReportQueryParams = {
  statue: string;
  startDate: string;
  endDate: string;
};

const BookingForm = () => {
  const [booking, setBooking] = useState<BookingDetails[]>([]);
  const mutation = useMutation({
    mutationKey: ["bookingReport"],
    mutationFn: async (data: BookingReportParams) => {
      return await bookingReportAPI(data);
    },
    onSuccess: (response) => {
      setBooking(response.data);
    },
    onError: (error) => {
      console.log("Create Specialty Error");
      console.log(error);
    },
  });

  const { register, handleSubmit } = useForm<ReportQueryParams>();
  const onSubmit: SubmitHandler<ReportQueryParams> = async (data: ReportQueryParams) =>
    mutation.mutateAsync(data);

  return (
    <>
      <FormContener style="max-w-[700px] m-auto">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div className="text-left">
              <label htmlFor="permission" className="block text-sm font-medium mb-2 dark:text-white">
                Select booking status
              </label>
              <select
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral400 dark:placeholder-neutral500 dark:focus:ring-neutral600"
                {...register("statue")}
              >
                <option value="done">Done</option>
                <option value="waiting">Waiting</option>
                <option value="in_progress">In progress</option>
                <option value="cancel">Cancel</option>
              </select>
            </div>
            <InputField title="From Date" register={register} name="startDate" typeInput="date" />
            <InputField title="To Date" register={register} name="endDate" typeInput="date" />
          </div>
          <div className="text-center">
            <Button inputType="submit" title="show" isLoading={mutation.isPending} />
          </div>
        </form>
      </FormContener>
      <div className="divider"></div>
      <BookingContent booking={booking} isLoading={mutation.isPending} />
    </>
  );
};

export default BookingForm;
