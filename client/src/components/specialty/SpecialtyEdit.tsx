import { FC, FormEvent, useState, useEffect } from "react";
import FormModelContainer from "../common/models/FormModelContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectSpecialtyById } from "@/store/specialtySlice";
import { updateSpecialtyMutation } from "./process";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  specialtyId: number;
}

const SpecialtyEdit: FC<Props> = ({ openModal, setOpenModal, specialtyId }) => {
  const [updateValue, setUpdateValue] = useState("");
  const specialty = useSelector((state: RootState) => selectSpecialtyById(state, specialtyId));

  // Update input value when specialty changes
  useEffect(() => {
    specialty && setUpdateValue(specialty.specialty_name || "");
  }, [specialty]);

  // process
  const mutation = updateSpecialtyMutation(specialtyId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutateAsync({ specialty_name: updateValue })
  };

  return (
    <>
      {openModal && (
        <FormModelContainer
          onClose={() => setOpenModal(false)}
          title="Edit Specialty"
          onSubmit={handleSubmit}
        >
          <div className="col-span-6">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-400 mb-2">
              Specialization Name
            </label>
            <input
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
          </div>
        </FormModelContainer>
      )}
    </>
  );
};

export default SpecialtyEdit;
