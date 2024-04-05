/* eslint-disable react-hooks/rules-of-hooks */
import { changeStatusBooking } from "@/redux/booking/bookingSlice";
import { getPatientsQueuetoDoctorThunk } from "@/redux/doctor/doctorThunk";
import { getbookingNotificationsThunk } from "@/redux/notification/notificationThunk";
import { AppDispatch } from "@/redux/store";
import {
  addPatientAPI,
  addPatientBookingAPI,
  getPatientBookingAPI,
  getPatientBookingSearchAPI,
  processTransferToDoctorAPI,
} from "@/utils/apis";
import { useToast } from "@/utils/hook/useToast";
import {
  CreatePatientDetails,
  DoctorAppointmentsDetails,
  PatientBookingParams,
  TransferToDoctorParams,
} from "@/utils/types";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
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

export const addPatientBookingMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mutation = useMutation({
    mutationKey: ["addPatient"],
    mutationFn: async (data: PatientBookingParams) => {
      return await addPatientBookingAPI(data);
    },
    onSuccess: (res) => {
      console.log(res);
      dispatch(getbookingNotificationsThunk());
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

export const getPatientsBookingAllOrBySearch = (search?: string, page?: number) => {
  const query = useQuery({
    queryKey: ["getPatientBooking", search],
    queryFn: async () => {
      if (search) {
        const response = await getPatientBookingSearchAPI(search);
        return response.data;
      } else {
        const response = await getPatientBookingAPI(page!);
        return response.data;
      }
    },
  });

  return query;
};
// export const fetchAllBookingsQuery = (searchTerm: string, page: number) => {
//   const query = useQuery({
//     queryKey: ["getPatientBooking", searchTerm, page],
//     queryFn: async () => {
//       try {
//         if (searchTerm) {
//           const response = await getPatientBookingSearchAPI(searchTerm);
//           return response.data;
//         } else {
//           const response = await getPatientBookingAPI(page!);
//           return response.data;
//         }
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         throw error;
//       }
//     },
//   });

//   return query;
// };

export const processTransferToDoctorMutation = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const mutationKey = ["processTransferToDoctorAPI"];
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (data: TransferToDoctorParams) => {
      try {
        return await processTransferToDoctorAPI(data);
      } catch (error) {
        console.error("Error processing transfer to doctor:", error);
        throw error;
      }
    },
    onSuccess: (res) => {
      dispatch(changeStatusBooking(id));
      dispatch(getPatientsQueuetoDoctorThunk());
      success(res.data.message);
    },
    onError: (err) => {
      console.error("Error processing transfer to doctor:", err);
      error("Error processing transfer to doctor");
    },
  });

  return mutation;
};
