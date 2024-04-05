import { getPatientBookingAPI, getPatientBookingSearchAPI } from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientsBookingThunk = createAsyncThunk("fetch/patients/booking", async (page: number) => {
  const response = await getPatientBookingAPI(page);
  return response.data;
});

export const searchOnPatienstBookingThunk = createAsyncThunk(
  "search/patients/booking",
  async (search: string) => {
    const response = await getPatientBookingSearchAPI(search);
    return response.data;
  }
);
