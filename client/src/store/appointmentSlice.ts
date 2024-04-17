import { allAppointmentsAPI, doctorAppointmentsAPI } from "@/utils/apis";
import { AppointmentState } from "@/utils/types";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export const getDoctorAppointmentsThunk = createAsyncThunk("fetch/doctor/appointment", async () => {
  const response = await doctorAppointmentsAPI();
  return response.data;
});

export const getAllAppointmentsThunk = createAsyncThunk("fetch/all/appointments", async () => {
  const response = await allAppointmentsAPI();
  return response.data;
});

const initialState: AppointmentState = {
  appointments: [],
  allAppointments: []
};

export const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    addAppointments: (state, action) => {
        console.log("update new item");
        state.appointments.push(action.payload);
      },
    deleteAppointment: (state, action) => {
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
        state.appointments = action.payload;
      })
      .addCase(getDoctorAppointmentsThunk.rejected, () => {
        console.log("getDoctorAppointmentsThunk.rejected");
      })
      .addCase(getAllAppointmentsThunk.fulfilled, (state, action) => {
        console.log("getAllAppointmentsThunk.fulfilled");
        state.allAppointments = action.payload;
      })
      .addCase(getAllAppointmentsThunk.rejected, () => {
        console.log("getAllAppointmentsThunk.rejected");
      }),
});


const appointments = (state: RootState) => state.appointment.allAppointments;
export const selectDoctorAppointment = createSelector(
  [appointments , (_, id: number) => id],
  (Appointments, AppointmentId) => Appointments.filter((appointment) => appointment.user_id === AppointmentId)
);


export const { addAppointments, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
