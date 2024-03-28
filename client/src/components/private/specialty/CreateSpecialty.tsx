import { useEffect } from "react";
import { useForm, SubmitHandler, FieldErrorsImpl } from "react-hook-form";
import GetSpecialty from "./GetSpecialty";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSpecialtyThunk } from "@/redux/specialty/specialtySlice";
import { CreateSpecialtyAction } from "./actions/CreateSpecialtyAction";
import { CreateSpecialtyType } from "@/utils/types";
import InputFieldWithError from "@/components/common/inputs/InputFieldWithError";
import LoadingButton from "@/components/common/button/LoadingButton";
import ContenerForm from "@/components/common/main-form/ContenerForm";

const CreateSpecialty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSpecialtyType>();
  const mutation = CreateSpecialtyAction(reset);
  const onSubmit: SubmitHandler<CreateSpecialtyType> = async (data: CreateSpecialtyType) =>
    mutation.mutateAsync(data);

  useEffect(() => {
    if (specialties.length <= 0) dispatch(fetchSpecialtyThunk());
  }, [specialties]);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8 pt-10">
        <ContenerForm>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center items-center gap-6">
              <div className="w-[70%]">
                <InputFieldWithError
                  title="Add new specialty medical *"
                  name="specialty_name"
                  register={register}
                  errors={errors as FieldErrorsImpl<CreateSpecialtyType>}
                />
              </div>
              <div className="w-[30%] mt-7">
                <LoadingButton inputType="submit" title="save" isLoading={mutation.isPending} />
              </div>
            </div>
          </form>
        </ContenerForm>
      </div>
      <>
        <GetSpecialty />
      </>
    </section>
  );
};

export default CreateSpecialty;
