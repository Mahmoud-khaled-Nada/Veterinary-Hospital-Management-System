import { createSlice } from "@reduxjs/toolkit";
import { BookingNotificationsDetails, BookingNotificationsState } from "@/utils/types";
import { getbookingNotificationsThunk } from "./notificationThunk";

const initialState: BookingNotificationsState = {
  bookingNotifications: [],
};

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getbookingNotificationsThunk.fulfilled, (state, action) => {
        console.log("getbookingNotificationsThunk.fulfilled");
        state.bookingNotifications = action.payload as unknown as BookingNotificationsDetails[];
      })
      .addCase(getbookingNotificationsThunk.rejected, () => {
        console.log("getbookingNotificationsThunk.rejected");
      }),
});

// export const { selectDoctorAppointment } = notificationSlice.actions;
export default notificationSlice.reducer;
