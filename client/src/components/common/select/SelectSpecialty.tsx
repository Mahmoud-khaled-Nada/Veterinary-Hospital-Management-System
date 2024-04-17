/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch, RootState } from "@/store";
import { fetchSpecialtyThunk } from "@/store/specialtySlice";
import { FC, useEffect } from "react";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
};

const SelectSpecialty: FC<Props<any>> = ({ register, errors }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { specialties } = useSelector((state: RootState) => state.specialty);

  useEffect(() => {
    if (specialties.length == 0) dispatch(fetchSpecialtyThunk());
  }, []);

  return (
    <div className="text-left">
      <label htmlFor="specialty_id" className="block text-sm text-gray-700 font-medium mb-2 dark:text-white">
        Select specialty
      </label>
      <select
        id="specialty_id"
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        {...register("specialty_id")}
      >
        <option>Who shot first?</option>
        {specialties.length > 0 &&
          specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.specialty_name}
            </option>
          ))}
      </select>

      {errors["specialty_id"] && (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">
          <span className="font-medium">Oh, snap!</span> {errors?.specialty_id.message as any}
        </p>
      )}
    </div>
  );
};

export default SelectSpecialty;
