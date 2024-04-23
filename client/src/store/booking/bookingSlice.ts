import { BookingState, BookingDetails } from "@/utils/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getBookingThunk, searchOnBookingThunk } from "./bookingThunk";

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
      const { id, booking_status } = action.payload;
      const index = state.bookings.findIndex((item) => item.id === id);
      
      if (index !== -1) {
        const updatedBooking = { ...state.bookings[index], booking_status };
        if (booking_status === "in_progress") {
          state.bookings.splice(index, 1);
          state.bookings.unshift(updatedBooking);
        } else {
          state.bookings.splice(index, 1, updatedBooking);
        }
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
    builder.addCase(getBookingThunk.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getBookingThunk.fulfilled, (state, action) => {
        console.log("getBookingThunk.fulfilled");
        const { last_page, data } = action.payload;
        state.lastPage = last_page;
        const existingBookingIds = new Set(state.bookings.map((booking) => booking.id));
        const newBookings = data.filter((booking: { id: number }) => !existingBookingIds.has(booking.id));
        state.bookings.push(...newBookings);
        state.isLoading = false;
      }),
      builder.addCase(searchOnBookingThunk.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isLoading = false;
      });
  },
});

const getBookings = (state: RootState) => state.booking.bookings;
export const selectBookingById = createSelector([getBookings, (_, id: number) => id], (bookings, id) =>
  bookings.find((b) => b.id === id)
);

export const { changeStatusBooking, deleteBookingById } = bookingSlice.actions;
export default bookingSlice.reducer;
