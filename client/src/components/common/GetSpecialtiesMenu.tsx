import { SpecialtyDetailsType } from "@/utils/types";

import { FC } from "react";
type Props = {
  specialties: SpecialtyDetailsType[];
  setSelectSpecialty: (value: string) => void;
};

const GetSpecialtiesMenu: FC<Props> = ({ specialties, setSelectSpecialty }) => {
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="block text-sm font-medium dark:text-white">Choose specialty</span>
        </div>
        <select className="select select-bordered border " onChange={(e) => setSelectSpecialty(e.target.value)}>
          <option value="" >
            specialty 
          </option>
          {specialties.map((specialty) => (
            <option key={specialty.id}
            onChange={() => alert(specialty.id)}
            value={specialty.specialty_name}>
              {specialty.specialty_name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default GetSpecialtiesMenu;
