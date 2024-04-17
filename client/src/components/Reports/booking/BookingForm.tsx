import InputField from "@/components/common/inputs/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContener from "../../common/forms/FormContener";
import Button from "../../common/button/Button";

type ReportQueryParams = {
  statue: string;
  from: string;
  to: string;
};
const BookingForm = () => {
  const { register, handleSubmit } = useForm<ReportQueryParams>();

  const onSubmit: SubmitHandler<ReportQueryParams> = async (data: ReportQueryParams) => {
    console.log(data);
  };
  return (
    <FormContener style="max-w-[700px] m-auto">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div className="text-left">
            <label htmlFor="permission" className="block text-sm font-medium mb-2 dark:text-white">
              Select booking status
            </label>
            <select
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              {...register("statue")}
            >
              <option value="done">Done</option>
              <option value="waiting">Waiting</option>
              <option value="in_progress">In progress</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
          <InputField title="From Date" register={register} name="from" typeInput="date" />
          <InputField title="To Date" register={register} name="to" typeInput="date" />
        </div>
        <div className="text-center">
          <Button inputType="submit" title="show" />
        </div>
      </form>
    </FormContener>
  );
};

export default BookingForm;
