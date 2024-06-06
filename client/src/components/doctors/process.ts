/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppDispatch } from "@/store";
import { addAppointments, deleteAppointment } from "@/store/appointmentSlice";
import { getNextPatient } from "@/store/doctor/doctorSlice";
import { addDoctorAppointmentsAPI, bookingFinishedAPI, deleteAppointmentAPI } from "@/utils/apis";
import { AppointmentsParam, DoctorReportParams } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const addDoctorAppointmentsMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation<any, AxiosError, AppointmentsParam>({
    mutationFn: async (data: AppointmentsParam) => {
      return await addDoctorAppointmentsAPI(data);
    },
    onSuccess: (response) => {
      dispatch(addAppointments(response.data[0])); // state
      toast.success("Appointment successfully added");
    },
    onError: (error: AxiosError | any) => {
      const err = error.response;
      if (err.status == 400) toast.warn(err.data.message);
      else toast.error(err.data.message || "Failed to create appointment");
    },
  });
};

export const useDeleteAppointmentMutation = () => {

  const dispatch = useDispatch<AppDispatch>();

  return useMutation<any, AxiosError, number>({
    mutationFn: async (id: number) => {
      const response = await deleteAppointmentAPI(id);
      return response.data;
    },
    onSuccess: (response) => {
      dispatch(deleteAppointment(response.id));
      toast.success("Appointment deleted successfully");
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting Appointment:", error);
      toast.error("Failed to delete Appointment");
    },
  });
};

export const bookingFinishedMutation = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationKey: ["bookingFinishedAPI"],
    mutationFn: async (data: DoctorReportParams) => {
      const res = await bookingFinishedAPI(data);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(getNextPatient(id));
      toast.success("Patient successfully");
    },
    onError: (err: any) => {
      console.log("booking Finished Mutation");
      console.log(err);
    },
  });
};
