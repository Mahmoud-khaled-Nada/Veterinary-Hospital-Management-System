import { AppointmentsParam } from "@/utils/types";
import { FC, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteAppointmentMutation } from "../process";
import ConfirmedModel from "../../common/models/ConfirmedModel";

type Props = {
  appointments: AppointmentsParam[];
};

const AppointmentContent: FC<Props> = ({ appointments }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const deleteMutation = useDeleteAppointmentMutation();
  const confirmDeleteAppointments = async () => {
    if (selectedId) {
      await deleteMutation.mutateAsync(selectedId);
      setOpenModal(false);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        <thead>
          <tr>
            <th>#</th>
            <th>Day</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Cases number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="badge badge-accent badge-outline">{row.day}</div>
                </td>
                <td>{row.start_time}</td>
                <td>{row.end_time}</td>
                <td>{row.cases_number}</td>
                <td className="flex items-center gap-3">
                  <RiDeleteBin6Line
                    className="text-lg cursor-pointer text-red-700"
                    onClick={() => {
                      setSelectedId(row.id);
                      setOpenModal(true);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmedModel
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirmAction={confirmDeleteAppointments}
        actionName="Delete"
      />
    </div>
  );
};

export default AppointmentContent;
