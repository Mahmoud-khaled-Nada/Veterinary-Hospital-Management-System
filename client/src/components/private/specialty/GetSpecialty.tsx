import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import DeleteSpecialty from "./DeleteSpecialty";
import EditSpecialty from "./EditSpecialty";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function GetSpecialty() {
  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  const isLoading = useSelector((state: RootState) => state.specialty.isLoading);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState<number | undefined>(undefined);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState<number | undefined>(undefined);

  const handleDeleteClick = (itemId: number) => {
    setOpenModalDelete(true);
    setSelectedIdDelete(itemId);
  };
  const handleEditClick = (itemId: number) => {
    setOpenModalEdit(true);
    setSelectedIdEdit(itemId);
  };
  return (
    <>
      <div className="overflow-x-auto text-sm mt-6 m-6">
        {isLoading ? (
          "Loading..."
        ) : (
          <table className="table">
            <thead>
              <tr className="dark:text-gray-300">
                <th>#</th>
                <th>Category Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {specialties.length > 0 &&
                specialties?.map((item, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="badge badge-accent">{item.specialty_name}</div>
                    </td>
                    <td>
                      <button className="text-blue-600 text-lg" onClick={() => handleEditClick(item.id)}>
                        <FiEdit />
                      </button>
                    </td>
                    <td>
                      <button className="text-red-600 text-lg" onClick={() => handleDeleteClick(item.id)}>
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <EditSpecialty
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        sendIdEdit={selectedIdEdit}
      />
      <DeleteSpecialty
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        sendIdDelete={selectedIdDelete}
      />
    </>
  );
}

export default GetSpecialty;
