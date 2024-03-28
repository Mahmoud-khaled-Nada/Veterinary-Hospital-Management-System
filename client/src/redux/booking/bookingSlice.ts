import { BookingState, PatientsBookingDetails } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { getPatientBookingThunk } from "./bookingThunk";

const initialState: BookingState = {
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // searchBokking: (state, action) => {
    //   const search = action.payload;
    //   if (!search) return;
    //   state.bookings = state.bookings.filter((booking) => {
    //     return (
    //       booking.owner_name.toLowerCase().includes(search) ||
    //       booking.booking_date.toLowerCase().includes(search) ||
    //       booking.created_at.toLowerCase().includes(search) ||
    //       booking.doctor_name.toLowerCase().includes(search)
    //     );
    //   });
    // },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getPatientBookingThunk.fulfilled, (state, action) => {
        console.log("getPatientBookingThunk.fulfilled");
        state.bookings = action.payload as unknown as PatientsBookingDetails[];
      })
      .addCase(getPatientBookingThunk.rejected, () => {
        console.log("getPatientBookingThunk.rejected");
      }),
});

// export const { searchBokking } = bookingSlice.actions;
export default bookingSlice.reducer;
