import { ReceptionState } from "@/utils/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getFromReceptionPatientThunk } from "./receptionThunk";
import { RootState } from "../store";

const initialState: ReceptionState = {
  patients: [],
};

export const receptionSlice = createSlice({
  name: "reception",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getFromReceptionPatientThunk.fulfilled, (state, action) => {
        state.patients = action.payload;
      })
      .addCase(getFromReceptionPatientThunk.rejected, () => {
        console.log("getFromReceptionPatientThunk.rejected");
      }),
});

const selectPatients = (state: RootState) => state.reception.patients;
const selectPatientsId = (state: RootState, id: number) => id;

export const selectPatientsById = createSelector(
  [selectPatients, selectPatientsId],
  (getPatienys, patienyId) => getPatienys.find((c) => c.id === patienyId)
);

// export const {  } = receptionSlice.actions;
export default receptionSlice.reducer;
