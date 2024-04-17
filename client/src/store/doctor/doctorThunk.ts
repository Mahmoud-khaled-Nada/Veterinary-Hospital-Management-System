import {
  getPatientsQueuetoDoctorAPI,
} from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientsQueuetoDoctorThunk = createAsyncThunk("fetch/patients/queueto", async () => {
  const response = await getPatientsQueuetoDoctorAPI();
  return response.data;
});
