import { FC, FormEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UpdateSpecialtyAction } from "./actions/CreateSpecialtyAction";
import ContenerForm from "@/components/common/main-form/ContenerForm";
interface ModelProps {
  openModalEdit: boolean;
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  sendIdEdit: number | undefined;
}

const EditSpecialty: FC<ModelProps> = ({
  openModalEdit,
  setOpenModalEdit,
  sendIdEdit,
}) => {
  const specialties = useSelector(
    (state: RootState) => state.specialty.specialties
  );
  const [updateValue, setUpdateValue] = useState("");

  const mutation = UpdateSpecialtyAction(sendIdEdit!, () =>
    setOpenModalEdit(false)
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutateAsync({ specialty_name: updateValue });
  };

  const handelSpecialtySelected = (id: number) => {
    const result = specialties.find((s) => s.id == id);
    setUpdateValue(result!.specialty_name);
  };

  useEffect(() => {
    if (sendIdEdit) handelSpecialtySelected(sendIdEdit);
  }, [sendIdEdit]);

  return (
    <>
      {openModalEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 z-50 flex justify-center items-center">
            <ContenerForm>
            <div className="flex items-start gap-4">
              <span className="text-red-600">
                <GiConfirmed className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <strong className="block font-medium text-white">
                  Please confirm the edit operation.
                </strong>
              </div>
              <button
                className="text-gray-300 transition hover:text-gray-400"
                onClick={() => {
                  setOpenModalEdit(false);
                  setUpdateValue("");
                }}
              >
                <span className="sr-only">Dismiss popup</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            <form
              method="dialog"
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6">
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-400"
                >
                  Specialization Name
                </label>
                <input
                  value={updateValue || ""}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  className="block w-full rounded-lg border-gray-200 p-3 text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
              <button type="submit" className="btn btn-accent">
                Edit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setOpenModalEdit(false);
                  setUpdateValue("");
                }}
              >
                Close
              </button>
            </form>
            </ContenerForm>
        </div>
      )}
    </>
  );
};

export default EditSpecialty;
