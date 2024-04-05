/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { addNewAppointments, getNextPatient } from "@/redux/doctor/doctorSlice";
import { getPatientsQueuetoDoctorThunk } from "@/redux/doctor/doctorThunk";
import { AppDispatch } from "@/redux/store";
import { addDoctorAppointmentsAPI, bookingFinishedAPI } from "@/utils/apis";
import { useToast } from "@/utils/hook/useToast";
import { AppointmentsParam, DoctorReportParams } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const { error, success } = useToast({ theme: "dark" });

export const addDoctorAppointmentsMutation = (doctorId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  if (!doctorId) return;
  const mutation = useMutation({
    mutationKey: ["updateUserasDoctorAPI", doctorId],
    mutationFn: async (data: AppointmentsParam) => {
      const res = await addDoctorAppointmentsAPI(doctorId, data);
      return res.data;
    },
    onSuccess(res) {
      dispatch(addNewAppointments(res.data));
      success(res?.message);
    },
    onError: (err: any) => {
      console.log("Create Specialty Error");
      error(err.response.data.message || "Error sending friend request");
    },
  });

  return mutation;
};

export const bookingFinishedMutation = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const mutation = useMutation({
    mutationKey: ["bookingFinishedAPI"],
    mutationFn: async (data: DoctorReportParams) => {
      const res = await bookingFinishedAPI(data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(getNextPatient(id));
      success("Patient successfully");
    },
    onError: (err: any) => {
      console.log("booking Finished Mutation");
      console.log(err);
    },
  });

  return mutation;
};
