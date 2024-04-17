import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import specialtySlice from "./specialtySlice";
import receptionSlice from "./reception/receptionSlice";
import notificationSlice from "./notification/notificationSlice";
import appointmentSlice from "./appointmentSlice";
import patientSlice from "./patientSlice";
import bookingSlice from "./booking/bookingSlice";
import doctorSlice from "./doctor/doctorSlice";
export const store = configureStore({
  reducer: {
    users: userSlice,
    specialty: specialtySlice,
    reception: receptionSlice,
    notification: notificationSlice,
    appointment: appointmentSlice,
    patient: patientSlice,
    booking: bookingSlice,
    doctor: doctorSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
