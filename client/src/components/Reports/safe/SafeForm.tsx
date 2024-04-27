/* eslint-disable react-hooks/rules-of-hooks */
import InputField from "@/components/common/inputs/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContener from "../../common/forms/FormContener";
import Button from "../../common/button/Button";
import SafeContent from "./SafeContent";
import { useMutation } from "@tanstack/react-query";
import { safeReportAPI } from "@/utils/apis";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

type Params = {
  startDate: string;
  endDate: string;
};

const SafeForm = () => {
  const [safe, setSafe] = useState([]);
  const [total, setTotal] = useState(0);
  const mutation = useMutation({
    mutationKey: ["safeReport"],
    mutationFn: (params: Params) => {
      return safeReportAPI(params);
    },
    onSuccess: (res) => {
      toast.success("success");
      setSafe(res.data.safe);
      setTotal(res.data.total);
    },
    onError: (error: AxiosError) => {
      console.log("Create Specialty Error");
      console.log(error);
    },
  });
  const { register, handleSubmit } = useForm<Params>();
  const onSubmit: SubmitHandler<Params> = async (data: Params) => mutation.mutateAsync(data);

  return (
    <>
      <FormContener style="max-w-[700px] m-auto">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <InputField title="From Date" register={register} name="startDate" typeInput="date" />
            <InputField title="To Date" register={register} name="endDate" typeInput="date" />
            <div className="mt-7">
              <Button inputType="submit" title="show" isLoading={mutation.isPending} />
            </div>
          </div>
        </form>
      </FormContener>
      <div className="divider"></div>
      <SafeContent safe={safe} total={total} isLoading={mutation.isPending} />
    </>
  );
};

export default SafeForm;
