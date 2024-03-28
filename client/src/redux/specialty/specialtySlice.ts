import { deleteSpecialtyAPI, getSpecialtyAPI } from "@/utils/apis";
import { specialtiesDetailsType } from "@/utils/types";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../store";

export const fetchSpecialtyThunk = createAsyncThunk("fetch/specialty", async () => {
  const response = await getSpecialtyAPI();
  return response.data;
});

export const deleteSpecialtyThunk = createAsyncThunk("delete/specialty", async (id: number) => {
  const response = await deleteSpecialtyAPI(id);
  return response.data;
});

const initialState: specialtiesDetailsType = {
  specialties: [],
  isLoading: false,
};

export const specialtySlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSpecialties: (state, action) => {
      const { id } = action.payload;
      const exist = state.specialties.find((s) => s.id === id);
      if (exist) state.specialties = state.specialties.map((s) => (s.id === id ? action.payload : s));
      else state.specialties = [...state.specialties, action.payload];
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchSpecialtyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSpecialtyThunk.fulfilled, (state, action) => {
        state.specialties = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSpecialtyThunk.rejected, (state) => {
        console.log("fetchSpecialtyThunk.rejected");
        state.isLoading = false;
      })
      .addCase(deleteSpecialtyThunk.fulfilled, (state, action) => {
        const { id } = action.payload;
        const exist = state.specialties.find((s) => s.id == id);
        if (!exist) return;
        state.specialties = state.specialties.filter((s) => s.id != id);
        toast("Specialty deleted successfully", { type: "success" });
      })
      .addCase(deleteSpecialtyThunk.rejected, () => {
        console.log("deleteSpecialtyThunk.rejected");
      }),
});

const selectSpecialty = (state: RootState) => state.specialty.specialties;
const selectSpecialtyName = (state: RootState, name: string) => name;

export const selectSpecialtyByName = createSelector(
  [selectSpecialty, selectSpecialtyName],
  (specialties, specialtyName) => specialties.find((sp) => sp.specialty_name === specialtyName)
);

//setSpecialties
export const { setSpecialties } = specialtySlice.actions;
export default specialtySlice.reducer;
