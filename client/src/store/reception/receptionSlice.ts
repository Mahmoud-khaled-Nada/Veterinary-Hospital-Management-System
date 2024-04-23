// import { ReceptionState } from "@/utils/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { fetchDoctorsAppointmentsThunk, getFromReceptionPatientThunk } from "./receptionThunk";
import { RootState } from "..";

const initialState = {

};

export const receptionSlice = createSlice({
  name: "reception",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      // .addCase(getFromReceptionPatientThunk.fulfilled, (state, action) => {
      //   state.patients = action.payload;
      // })
      // .addCase(getFromReceptionPatientThunk.rejected, () => {
      //   console.log("getFromReceptionPatientThunk.rejected");
      // })
      // .addCase(fetchDoctorsAppointmentsThunk.fulfilled, (state, action) => {
      //   console.log("getFromReceptionPatientThunk.fulfilled");
      //   state.DoctorsAppointments = action.payload;
      // }),
});

// const selectPatients = (state: RootState) => state.reception.patients;
// const selectPatientsId = (state: RootState, id: number) => id;

// export const selectPatientsById = createSelector(
//   [selectPatients, selectPatientsId],
//   (getPatienys, patienyId) => getPatienys.find((c) => c.id === patienyId)
// );

// const getAppointments = (state: RootState) => state.reception.DoctorsAppointments;
// const selectAppointmentId = (state: RootState, id: number) => id;

// export const selectDoctorAppointment = createSelector(
//   [getAppointments, selectAppointmentId],
//   (Appointments, AppointmentId) => Appointments.filter((appointment) => appointment.user_id === AppointmentId)
// );

// export const { selectDoctorAppointment } = receptionSlice.actions;
export default receptionSlice.reducer;
