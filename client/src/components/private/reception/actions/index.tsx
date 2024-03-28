/* eslint-disable react-hooks/rules-of-hooks */
import {
  addPatientAPI,
  addPatientBookingAPI,
  getPatientBookingAPI,
  getPatientBookingSearchAPI,
} from "@/utils/apis";
import { useToast } from "@/utils/hook/useToast";
import { CreatePatientDetails, DoctorAppointmentsDetails, PatientBookingParams } from "@/utils/types";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const { success, error } = useToast({ theme: "dark" });

export const addPatientMutation = (resetFn: () => void) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["addPatient"],
    mutationFn: async (data: CreatePatientDetails) => {
      return await addPatientAPI(data);
    },
    onSuccess: (res) => { 
      success(res.data.message);
      resetFn();
      navigate(`/reception/booking/${res.data[0]}`);
    },
    onError: (err) => {
      console.log("Create Specialty Error");
      console.log(err);
      error("Error sending friend request");
    },
  });

  return mutation;
};

// Memoize the filter function using useCallback filterDoctorsByDateAndSpecialty
export const filterDoctorsByDateAndSpecialty = (
  doctors: DoctorAppointmentsDetails[],
  specialty: string,
  date: string
) => {
  return doctors.filter((doctor) => {
    const isDateAvailable = doctor.day === date;

    const isSpecialtyMatched = doctor.specialty_name === specialty;

    return isDateAvailable && isSpecialtyMatched;
  });
};

//

export const addPatientBookingMutation = () => {
  const mutation = useMutation({
    mutationKey: ["addPatient"],
    mutationFn: async (data: PatientBookingParams) => {
      return await addPatientBookingAPI(data);
    },
    onSuccess: (res) => {
      console.log(res);
      success(res.data.message);
    },
    onError: (err) => {
      console.log("Create Specialty Error");
      console.log(err);
      error("Error sending friend request");
    },
  });

  return mutation;
};

export const getPatientsBookingAllOrBySearch = (search: string) => {
  const query = useQuery({
    queryKey: ["getPatientBooking", search],
    queryFn: async () => {
      if (search) {
        const response = await getPatientBookingSearchAPI(search);
        return response.data;
      } else {
        const response = await getPatientBookingAPI();
        return response.data;
      }
    },
    // staleTime: 1000 * 60 * 10,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return query;
};
