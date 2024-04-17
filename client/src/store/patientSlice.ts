import { PatientState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PatientState = {
  patient: null,
};

export const patientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {
    showPatient: (state, action) => {
      state.patient = action.payload;
    },
  },
});

export const { showPatient } = patientSlice.actions;
export default patientSlice.reducer;
