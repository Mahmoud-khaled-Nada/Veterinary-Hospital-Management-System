import { AppDispatch, RootState } from "@/store";
import { fetchSpecialtyThunk } from "@/store/specialtySlice";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    selectSpecialty: (value: string) => void;
};

const SelectSpecialtyByName: FC<Props> = ({ selectSpecialty }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { specialties } = useSelector((state: RootState) => state.specialty);

  useEffect(() => {
    if (specialties.length == 0) dispatch(fetchSpecialtyThunk());
  }, []);

  return (
    <div className="text-left">
      <label htmlFor="specialty_id" className="block text-sm font-medium mb-2 dark:text-white">
        Select specialty
      </label>
      <select
        id="specialty_id"
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral400 dark:placeholder-neutral500 dark:focus:ring-neutral600"
        onChange={(e) => selectSpecialty(e.target.value)}
      >
        <option>Who shot first?</option>
        {specialties.length > 0 &&
          specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.specialty_name}>
              {specialty.specialty_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectSpecialtyByName;
