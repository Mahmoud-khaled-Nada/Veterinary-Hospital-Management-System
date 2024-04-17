import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteSpecialtyThunk } from "@/store/specialtySlice";
import SpecialtyEdit from "./SpecialtyEdit";
import { useState } from "react";

function SpecialtyContent() {
  const [specialtyId, setSpecialtyId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { specialties, isLoading } = useSelector((state: RootState) => state.specialty);
  const onDelete = (id: number) => dispatch(deleteSpecialtyThunk(id));
  const onEdit = (id: number) => {
    setSpecialtyId(id);
    setOpenModal(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
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
                  <td className=" text-white text-nowrap"> {item.specialty_name}</td>
                  <td>
                    <FiEdit size={17} color="#374151" cursor="pointer" onClick={() => onEdit(item.id)} />
                  </td>
                  <td>
                    <RiDeleteBin6Line
                      size={17}
                      color="red"
                      cursor="pointer"
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
