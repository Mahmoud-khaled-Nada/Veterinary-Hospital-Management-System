/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDay } from "@/utils/helper";
import { UserDetails } from "@/utils/types";
import { FC, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import EditDoctorModel from "./EditDoctorModel";
import DeleteDoctorModel from "./DeleteDoctorModel";

type Props = {
  isLoading: boolean;
  setData: UserDetails[] | undefined;
};

const EmployeesTable: FC<Props> = ({ isLoading, setData }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  console.log("openModalDelete :" + openModalDelete);

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        "Loading..."
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>Specialty</th>
              <th>email</th>
              <th>phone</th>
              <th>permission</th>
              <th>extra info</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {setData?.map((row: any) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.specialty_name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.permission}</td>
                <td>{row.extra_info}</td>
                <td>{formatDay(row.created_at)}</td>
                <td className=" flex items-center gap-3">
                  <FaUserEdit
                    onClick={() => {
                      setOpenModalEdit(true);
                      setDoctorId(row.id);
                    }}
                    className="text-lg cursor-pointer text-gray-600"
                  />
                  <RiDeleteBin6Line
                    onClick={() => {
                      setOpenModalDelete(true);
                      setDoctorId(row.id);
                    }}
                    className="text-lg cursor-pointer text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <EditDoctorModel
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        doctorId={doctorId}
      />

      <DeleteDoctorModel
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        detetedId={doctorId}
      />
    </div>
  );
};

export default EmployeesTable;
