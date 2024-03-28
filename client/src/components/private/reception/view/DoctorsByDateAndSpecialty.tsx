import { getFromReceptionPatientThunk } from "@/redux/reception/receptionThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { getDoctorsAppointmentsAPI } from "@/utils/apis";
import { DoctorAppointmentsDetails } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialtyThunk } from "@/redux/specialty/specialtySlice";
import { filterDoctorsByDateAndSpecialty } from "../actions";
import GetSpecialtiesMenu from "@/components/common/GetSpecialtiesMenu";
import { useParams } from "react-router-dom";
interface Props {
  setSelectedDoctor: (doctors: DoctorAppointmentsDetails[]) => void;
  date: string | undefined;
  setspecialtyValue:(data : string) => void;
}

const DoctorsByDateAndSpecialty: FC<Props> = ({ setSelectedDoctor, date, setspecialtyValue }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [selectSpecialty, setSelectSpecialty] = useState<string>("");
  const [doctors, setDoctors] = useState<DoctorAppointmentsDetails[]>([]);

  // Selectors
  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  // Effects
  useEffect(() => {
    dispatch(getFromReceptionPatientThunk());
    dispatch(fetchSpecialtyThunk());
    console.log("Fetching new bookings");
    getDoctorsAppointmentsAPI()
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, [id, dispatch]);

  useEffect(() => {
    if (date && selectSpecialty && doctors.length > 0) {
      const filteredDoctors = filterDoctorsByDateAndSpecialty(doctors, selectSpecialty, date);
      setSelectedDoctor(filteredDoctors);
      setspecialtyValue(selectSpecialty)
    }
  }, [date, selectSpecialty]);

  return (
    <>
      <GetSpecialtiesMenu specialties={specialties} setSelectSpecialty={setSelectSpecialty} />
    </>
  );
};

export default DoctorsByDateAndSpecialty;
