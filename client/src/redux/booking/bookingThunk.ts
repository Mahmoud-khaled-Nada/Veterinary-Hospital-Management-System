import { getPatientBookingAPI } from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientBookingThunk = createAsyncThunk("fetch/patients/booking", async () => {
  const response = await getPatientBookingAPI();
  return response.data;
});
