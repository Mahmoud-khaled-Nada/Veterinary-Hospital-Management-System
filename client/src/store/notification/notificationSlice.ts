/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { BookingNotificationsState } from "@/utils/types";
import { getbookingNotificationsThunk } from "./notificationThunk";
import { toast } from "react-toastify";

const initialState: BookingNotificationsState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    readNotification: (state, action) => {
      const id = action.payload;
      const exists = state.notifications.find((bn) => bn.notification_id === id);
      if (!exists) return;
      state.notifications = state.notifications.filter((bn) => bn.notification_id !== id);
      toast("you was received notification ", {
        position: "bottom-left",
      });
    },
  },

  extraReducers: (builder) =>
    builder.addCase(getbookingNotificationsThunk.fulfilled, (state, action) => {
      console.log("getbookingNotificationsThunk.fulfilled")
      state.notifications = action.payload as any;
    }),
});

export const { readNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
