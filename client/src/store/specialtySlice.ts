import { SpecialtiesState } from "@/utils/types";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { toast } from "react-toastify";
import { deleteSpecialtyAPI, getSpecialtyAPI } from "@/utils/apis";

export const fetchSpecialtyThunk = createAsyncThunk("fetch/specialty", async () => {
  const response = await getSpecialtyAPI();
  return response.data;
});

export const deleteSpecialtyThunk = createAsyncThunk("delete/specialty", async (id: number) => {
  const response = await deleteSpecialtyAPI(id);
  return response.data;
});

const initialState: SpecialtiesState = {
  specialties: [],
  isLoading: false,
};

export const specialtySlice = createSlice({
  name: "specialtySlice",
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
        toast.success("Specialty deleted successfully");
      })
      .addCase(deleteSpecialtyThunk.rejected, () => {
        console.log("deleteSpecialtyThunk.rejected");
      }),
});

const specialties = (state: RootState) => state.specialty.specialties;
export const selectSpecialtyById = createSelector([specialties, (_, id: number) => id], (specialties, id) =>
  specialties.find((sp) => sp.id === id)
);

export const selectSpecialtyByName = createSelector(
  [specialties, (_, name: string) => name],
  (specialties, specialty_name) => specialties.find((sp) => sp.specialty_name === specialty_name)
);

export const { setSpecialties } = specialtySlice.actions;
export default specialtySlice.reducer;
