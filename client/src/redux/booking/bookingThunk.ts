import { getPatientBookingAPI } from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientBookingThunk = createAsyncThunk("fetch/patients/booking", async (page:number) => {
  const response = await getPatientBookingAPI(page);
  return response.data;
});
