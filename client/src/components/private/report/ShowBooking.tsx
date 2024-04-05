import LoadingButton from "@/components/common/button/LoadingButton";
import InputField from "@/components/common/inputs/InputField";
import ContenerForm from "@/components/common/main-form/ContenerForm";
import { SubmitHandler, useForm } from "react-hook-form";

type ReportQueryParams = {
  from: string;
  to: string;
};
const ShowBooking = () => {
  const { register, handleSubmit } = useForm<ReportQueryParams>();

  const onSubmit: SubmitHandler<ReportQueryParams> = async (data: ReportQueryParams) => {
    console.log(data);
  };
  return (
    <ContenerForm style="max-w-[700px] m-auto">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div className="text-left">
            <label htmlFor="permission" className="block text-sm font-medium mb-2 dark:text-white">
            <span className=" text-green-500">ddddd</span>
              Choose permission
            </label>
            <select id="permission" className="select select-bordered w-full">
              <option disabled>choose</option>
              <option disabled>choose</option>
              <option disabled>choose</option>
              <option disabled>choose</option>
            </select>
          </div>
          <InputField title="From Date" register={register} name="from" typeInput="date" />
          <InputField title="To Date" register={register} name="to" typeInput="date" />
        </div>
        <div className="text-center">
          <LoadingButton inputType="submit" title="show" />
        </div>
      </form>
    </ContenerForm>
  );
};

export default ShowBooking;
