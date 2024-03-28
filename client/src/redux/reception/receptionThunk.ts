import { getPatientAPI } from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFromReceptionPatientThunk = createAsyncThunk(
  "fetch/all/patients",
  async () => {
    const response = await getPatientAPI();
    return response.data?.data;
  }
);
