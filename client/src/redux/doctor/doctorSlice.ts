import { AppointmentsState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { getDoctorAppointmentsThunk, getPatientsQueuetoDoctorThunk } from "./doctorThunk";

const initialState: AppointmentsState = {
  appointments: [],
  patientsQueue: [],
  currentPatient: [],
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
    getCurrentPatient: (state) => {
     const data = state.patientsQueue.find((patient) => patient.booking_status);
     console.log(data);
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
      })
      .addCase(getPatientsQueuetoDoctorThunk.fulfilled, (state, action) => {
        console.log("getPatientsQueuetoDoctorThunk.fulfilled");
        state.patientsQueue = action.payload;
      })
});

export const { addNewAppointments, deleteAppointments, getCurrentPatient } = doctorSlice.actions;
export default doctorSlice.reducer;
