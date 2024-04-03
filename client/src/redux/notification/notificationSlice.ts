import { createSlice } from "@reduxjs/toolkit";
import { BookingNotificationsDetails, BookingNotificationsState } from "@/utils/types";
import { getbookingNotificationsThunk } from "./notificationThunk";
import { toast } from "react-toastify";

const initialState: BookingNotificationsState = {
  allNotifications: [],
};

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    readNotification: (state, action) => {
      const id = action.payload;
      const exists = state.allNotifications.find((bn) => bn.notification_id === id);
      if (!exists) return;
      state.allNotifications = state.allNotifications.filter((bn) => bn.notification_id !== id);
      toast("you was received notification ", {
        position: "bottom-left",
      });
    },
  },

  extraReducers: (builder) =>
    builder.addCase(getbookingNotificationsThunk.fulfilled, (state, action) => {
      state.allNotifications = action.payload as unknown as BookingNotificationsDetails[];
    }),
});

export const { readNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
