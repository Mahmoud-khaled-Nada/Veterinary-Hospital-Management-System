import { BookingState, PatientsBookingDetails } from "@/utils/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: BookingState = {
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      const newBookings = action.payload.filter(
        (booking: PatientsBookingDetails) =>
          !state.bookings.some((existingBooking) => existingBooking.id === booking.id)
      );
      state.bookings.push(...newBookings);
    },
    deleteBookingById: (state, action) => {
      const id = action.payload;
      const exists = state.bookings.find((b) => b.id === id);
      if (!exists) return;
      state.bookings = state.bookings.filter((b) => b.id != id);
    },
  },
});

const getBookings = (state: RootState) => state.booking.bookings;
const bookingId = (state: RootState, id: number) => id;

export const selectBookingById = createSelector([getBookings, bookingId], (bookings, bookingId) =>
  bookings.filter((b) => b.id === bookingId)
);

export const { setBookings, deleteBookingById } = bookingSlice.actions;
export default bookingSlice.reducer;
