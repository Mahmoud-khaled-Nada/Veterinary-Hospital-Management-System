import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import specialtySlice from "./specialty/specialtySlice";
import receptionSlice from "./reception/receptionSlice";
import bookingSlice from "./booking/bookingSlice";
import doctorSlice from "./doctor/doctorSlice";
import notificationSlice from "./notification/notificationSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    specialty: specialtySlice,
    reception: receptionSlice,
    booking: bookingSlice,
    doctor: doctorSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
