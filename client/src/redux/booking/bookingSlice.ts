import { BookingState, PatientsBookingDetails } from "@/utils/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getPatientsBookingThunk, searchOnPatienstBookingThunk } from "./bookingThunk";

const initialState: BookingState = {
  bookings: [],
  isLoading: false,
  lastPage: 1,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    changeStatusBooking: (state, action) => {
      const id = action.payload;
      const index = state.bookings.findIndex((item) => item.id === id);
      if (index !== -1) {
        // Create a copy of the booking object to update
        const updatedBooking = { ...state.bookings[index] };
        // Update the status of the copied booking object
        updatedBooking.booking_status = "in_progress";
        // Update the state with the new array containing the updated booking object
        state.bookings.splice(index, 1, updatedBooking);
      }
    },
    deleteBookingById: (state, action) => {
      const id = action.payload;
      const exists = state.bookings.find((b) => b.id === id);
      if (!exists) return;
      state.bookings = state.bookings.filter((b) => b.id != id);
    },
  },
  extraReducers(builder) {
    builder.addCase(getPatientsBookingThunk.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getPatientsBookingThunk.fulfilled, (state, action) => {
        state.lastPage = action.payload.last_page;
        const newBookings = action.payload.data.filter(
          (booking: PatientsBookingDetails) =>
            !state.bookings.some((existingBooking) => existingBooking.id === booking.id)
        );
        state.bookings.push(...(newBookings as unknown as PatientsBookingDetails[]));
        state.isLoading = false;
      }),
      builder.addCase(searchOnPatienstBookingThunk.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isLoading = false;
      });
  },
});

const getBookings = (state: RootState) => state.booking.bookings;
const bookingId = (state: RootState, id: number) => id;

export const selectBookingById = createSelector([getBookings, bookingId], (bookings, bookingId) =>
  bookings.filter((b) => b.id === bookingId)
);

export const { changeStatusBooking, deleteBookingById } = bookingSlice.actions;
export default bookingSlice.reducer;
