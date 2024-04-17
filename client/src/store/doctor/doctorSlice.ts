import { DoctorState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { getPatientsQueuetoDoctorThunk } from "./doctorThunk";

const initialState: DoctorState = {
  queue: [],
};

export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {
    getNextPatient: (state, action) => {
      const id = action.payload;
      const exists = state.queue.find((patient) => patient.booking_id === id);
      if (!exists) return;
      state.queue = state.queue.filter((patient) => patient.booking_id !== id);
    },
  },

  extraReducers: (builder) =>
    builder.addCase(getPatientsQueuetoDoctorThunk.fulfilled, (state, action) => {
      console.log("getPatientsQueuetoDoctorThunk.fulfilled");
      state.queue = action.payload;
    }),
});

export const { getNextPatient } = doctorSlice.actions;
export default doctorSlice.reducer;
