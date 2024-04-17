import { bookingNotificationsAPI } from "@/utils/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getbookingNotificationsThunk = createAsyncThunk(
  "fetch/booking/patients-notifications",
  async () => {
    const response = await bookingNotificationsAPI();
    return response.data;
  }
);
