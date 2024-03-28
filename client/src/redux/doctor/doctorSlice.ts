import { AppointmentsState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { getDoctorAppointmentsThunk } from "./doctorThunk";

const initialState: AppointmentsState = {
  appointments: [],
};

export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {
    addNewAppointments: (state, action) => {
      console.log("update new item");
      state.appointments.push(action.payload);
    },
    deleteAppointments: (state, action) => {
      const id = action.payload;
      const exists = state.appointments.find((appoint) => appoint.id === id);
      if (!exists) return;
      state.appointments = state.appointments.filter((appoint) => appoint.id !== id);
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getDoctorAppointmentsThunk.fulfilled, (state, action) => {
        console.log("getDoctorAppointmentsThunk.fulfilled");
        state.appointments = action.payload as unknown as AppointmentsState["appointments"];
      })
      .addCase(getDoctorAppointmentsThunk.rejected, () => {
        console.log("getDoctorAppointmentsThunk.rejected");
      }),
});

export const {addNewAppointments, deleteAppointments } = doctorSlice.actions;
export default doctorSlice.reducer;
