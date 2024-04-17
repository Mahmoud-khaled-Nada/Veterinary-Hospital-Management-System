/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
//

import { AppDispatch } from "@/store";
import { showPatient } from "@/store/patientSlice";
import { addPatientAPI } from "@/utils/apis";
import { CreatePatientParams } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const addPatientMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation<any, AxiosError, CreatePatientParams>({
    mutationKey: ["addDoctorAppointmentsMutation"],
    mutationFn: async (data: CreatePatientParams) => {
      return await addPatientAPI(data);
    },
    onSuccess: (response) => {
      if (response.data.isExists === "exists") {
        dispatch(showPatient(response.data[0]));
        toast.info(response.data.message);
        return;
      }
      dispatch(showPatient(response.data[0]));
      toast.success(response.data.message);
    },
    onError: (error: AxiosError) => {
      console.log("error from addEmployeeMutation  functions..");
      console.log(error.message);
    },
  });
};
