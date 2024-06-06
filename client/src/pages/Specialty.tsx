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
      <div className="ml-auto py-4 px-4">
      <SmallButton title="create" onClick={() => setOpenModal(true)}/>
      </div>
      <CreateNewSpecialtyModel openModal={openModal} setOpenModal={setOpenModal} />
      <SpecialtyContent />
    </>
  );
};

export default Specialty;
