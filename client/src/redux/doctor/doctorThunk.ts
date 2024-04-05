import {
  deleteAppointmentsByIdAPI,
  getDoctorAppointmentsByIdAPI,
  getPatientsQueuetoDoctorAPI,
} from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDoctorAppointmentsThunk = createAsyncThunk("fetch/doctor/appointment", async (id: number) => {
  console.log("thunking");
  console.log("Userid: " + id);
  const response = await getDoctorAppointmentsByIdAPI(id);
  return response.data;
});

export const deleteAppointmentsThunk = createAsyncThunk("delete/doctor/appointment", async (id: number) => {
  const response = await deleteAppointmentsByIdAPI(id);
  return response.data;
});

//

export const getPatientsQueuetoDoctorThunk = createAsyncThunk("fetch/patients/queueto", async () => {
  const response = await getPatientsQueuetoDoctorAPI();
  return response.data;
});
