/* eslint-disable react-hooks/rules-of-hooks */
import { addNewAppointments } from "@/redux/doctor/doctorSlice";
import { AppDispatch } from "@/redux/store";
import { addDoctorAppointmentsAPI } from "@/utils/apis";
import { useToast } from "@/utils/hook/useToast";
import { AppointmentsParam } from "@/utils/types";
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
    onError: (err) => {
      console.log("Create Specialty Error");
      console.log(err);
      error("Error sending friend request");
    },
  });

  return mutation;
};
