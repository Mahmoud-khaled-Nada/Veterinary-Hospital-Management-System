import { FC, FormEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UpdateSpecialtyAction } from "./actions/CreateSpecialtyAction";
import ContenerForm from "@/components/common/main-form/ContenerForm";
import GeneralFormModelContainer from "@/components/common/models/GeneralFormModelContainer";
interface ModelProps {
  openModalEdit: boolean;
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  sendIdEdit: number | undefined;
}

const EditSpecialty: FC<ModelProps> = ({ openModalEdit, setOpenModalEdit, sendIdEdit }) => {
  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  const [updateValue, setUpdateValue] = useState("");

  useEffect(() => {
    if (sendIdEdit) handelSpecialtySelected(sendIdEdit);
  }, [sendIdEdit]);

  const mutation = UpdateSpecialtyAction(sendIdEdit!, () => setOpenModalEdit(false));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutateAsync({ specialty_name: updateValue });
  };

  const handelSpecialtySelected = (id: number) => {
    const result = specialties.find((s) => s.id == id);
    setUpdateValue(result!.specialty_name);
  };

  return (
    <>
      {openModalEdit && (
        <>
          <GeneralFormModelContainer
            onClose={() => setOpenModalEdit(false)}
            title="Please confirm the edit operation."
            onSubmit={handleSubmit}
          >
            <div className="col-span-6">
              <label htmlFor="Name" className="block text-sm font-medium text-gray-400">
                Specialization Name
              </label>
              <input
                value={updateValue || ""}
                onChange={(e) => setUpdateValue(e.target.value)}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
            </div>
          </GeneralFormModelContainer>
        </>
      )}
    </>
  );
};

export default EditSpecialty;
