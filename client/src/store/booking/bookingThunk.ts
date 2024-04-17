import { bookingSearchAPI, getBookingAPI } from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBookingThunk = createAsyncThunk("fetch/patients/booking", async (page: number) => {
  const response = await getBookingAPI(page);
  return response.data;
});

export const searchOnBookingThunk = createAsyncThunk(
  "search/patients/booking",
  async (search: string) => {
    const response = await bookingSearchAPI(search);
    return response.data;
  }
);
