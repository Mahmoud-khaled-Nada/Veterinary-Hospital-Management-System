import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteSpecialtyThunk } from "@/store/specialtySlice";
import SpecialtyEdit from "./SpecialtyEdit";
import { useState } from "react";

function SpecialtyContent() {
  // state
  const dispatch = useDispatch<AppDispatch>();

  const [specialtyId, setSpecialtyId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { specialties } = useSelector((state: RootState) => state.specialty);

  const onDelete = (id: number) => dispatch(deleteSpecialtyThunk(id));

  const onEdit = (id: number) => {
    setSpecialtyId(id);
    setOpenModal(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className=" dark:text-white text-nowrap">
            <tr>
              <th>#</th>
              <th>Specialty</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {specialties.length > 0 &&
              specialties?.map((item, index: number) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className=" dark:text-white text-nowrap"> {item.specialty_name}</td>
                  <td>
                    <FiEdit
                      className="cursor-pointer text-neutral-500 hover:text-neutral-300 transition-all"
                      size={17}
                      onClick={() => onEdit(item.id)}
                    />
                  </td>
                  <td>
                    <RiDeleteBin6Line
                      className="cursor-pointer text-red-800 hover:text-red-500 transition-all"
                      size={17}
                      onClick={() => onDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <SpecialtyEdit openModal={openModal} setOpenModal={setOpenModal} specialtyId={specialtyId!} />
      </div>
    </>
  );
}

export default SpecialtyContent;
