import { SpecialtyDetailsType } from "@/utils/types";
import { FC } from "react";

type Props = {
  setSpecialties: SpecialtyDetailsType[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: string | undefined;
};

const SelectSpecialty: FC<Props> = ({ setSpecialties, onChange, errors }) => {
  return (
    <div className="text-left">
      <label htmlFor="specialty" className="block text-sm text-gray-700 font-medium mb-2 dark:text-white">
        Select specialty
      </label>
      <select className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={onChange}>
        <option>Who shot first?</option>
        {setSpecialties.map((specialty) => (
          <option key={specialty.id} value={specialty.id}>
            {specialty.specialty_name}
          </option>
        ))}
      </select>
      {errors && (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">
          <span className="font-medium">Oh, snap!</span> {errors}
        </p>
      )}
    </div>
  );
};

export default SelectSpecialty;
