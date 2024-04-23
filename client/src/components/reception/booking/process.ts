/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "@/store";
import { changeStatusBooking } from "@/store/booking/bookingSlice";
import { getBookingThunk } from "@/store/booking/bookingThunk";
import { createBookingAPI, transferBookingActionAPI } from "@/utils/apis";
import { BookingActionParams, BookingParams, DoctorAppointmentsDetails } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const filterDoctorsByDateAndSpecialty = (
  doctors: DoctorAppointmentsDetails[],
  specialty: string,
  bookingDay: string
): DoctorAppointmentsDetails[] => {
  return doctors.filter((doctor) => {
    return doctor.day === bookingDay && doctor.specialty_name === specialty;
  });
};

export const createBookingMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation<any, AxiosError, BookingParams>({
    mutationKey: ["createBooking"],
    mutationFn: async (data: BookingParams) => {
      return await createBookingAPI(data);
    },
    onSuccess: (response) => {
      dispatch(getBookingThunk(1));
      toast.success(response.data.message);
      navigate(`/reception`);
    },
    onError: (error: AxiosError) => {
      toast.error("Please try booking again");
      navigate("/reception");
    },
  });
};

export const processTransferToDoctorMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mutationKey = ["processTransferToDoctorAPI"];
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (data: BookingActionParams) => {
      return await transferBookingActionAPI(data);
    },
    onSuccess: (res) => {
      dispatch(changeStatusBooking(res.data[0]));
      toast.success(res.data.message);
    },
    onError: (err) => {
      console.error("Error processing transfer to doctor:", err);
      toast.error("Error processing transfer to doctor");
    },
  });

  return mutation;
};
