import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchSpecialtyThunk } from "@/store/specialtySlice";
import CreateNewSpecialtyModel from "@/components/specialty/CreateNewSpecialtyModel";
import SpecialtyContent from "@/components/specialty/SpecialtyContent";
import SmallButton from "@/components/common/button/SmallButton";

const Specialty = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSpecialtyThunk());
  }, []);
  return (
    <>
      <div className="flex justify-between mx-2 my-4">
        <h1>Specialty</h1>
      <SmallButton title="create" onClick={() => setOpenModal(true)}/>
      </div>
      <CreateNewSpecialtyModel openModal={openModal} setOpenModal={setOpenModal} />
      <SpecialtyContent />
    </>
  );
};

export default Specialty;
