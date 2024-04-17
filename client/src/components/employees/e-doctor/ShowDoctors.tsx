/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDay } from "@/utils/helper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import ConfirmedModel from "@/components/common/models/ConfirmedModel";
import { useDeleteDoctorMutation, fetchDoctorsQuery } from "../process";
import EditDoctorModel from "./EditDoctorModel";

const ShowDoctors = () => {
  const doctors = fetchDoctorsQuery() as any;
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const deleteDoctorMutation = useDeleteDoctorMutation();
  const confirmDeleteDoctor = async () => {
    if (selectedDoctorId) {
      await deleteDoctorMutation.mutateAsync(selectedDoctorId);
      setOpenModal(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        <thead>
          <tr>
            <th>name</th>
            <th>Specialty</th>
            <th>email</th>
            <th>phone</th>
            <th>permission</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.isLoading ? (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : !doctors.isError && doctors.data?.data.length > 0 ? (
            doctors.data?.data.map((row: any) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                  <div className="badge badge-accent badge-outline">{row.specialty_name}</div>
                </td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.permission}</td>
                <td>{formatDay(row.created_at)}</td>
                <td className="flex items-center gap-3">
                  <FaUserEdit
                    className="text-lg cursor-pointer text-gray-600"
                    onClick={() => {
                      setSelectedDoctorId(row.id);
                      setOpenModalEdit(true);
                    }}
                  />
                  <RiDeleteBin6Line
                    className="text-lg cursor-pointer text-red-700"
                    onClick={() => {
                      setSelectedDoctorId(row.id);
                      setOpenModal(true);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No doctors found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmedModel
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirmAction={confirmDeleteDoctor}
        actionName="Delete Doctor"
      />
      <EditDoctorModel
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        selectedId={selectedDoctorId}
      />
    </div>
  );
};

export default ShowDoctors;
