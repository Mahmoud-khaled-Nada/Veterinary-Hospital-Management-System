import SmallButton from "@/components/common/button/SmallButton";
import { CreatePatientParams } from "@/utils/types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const PatientContent: FC<{ patient: CreatePatientParams | null }> = ({ patient }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Owner Number</th>
            <th>Animal Name</th>
            <th>Animal Type</th>
            <th>Create Booking</th>
          </tr>
        </thead>
        <tbody>
          {patient ? (
            <tr>
              <td>{patient.owner_name}</td>
              <td>{patient.owner_email}</td>
              <td>{patient.owner_number}</td>
              <td>{patient.animal_name}</td>
              <td>{patient.animal_type}</td>
              <td>
                <SmallButton title="booking" onClick={() => navigate(`/create-booking/${patient.id}`)} />
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={7}>No patient found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientContent;
