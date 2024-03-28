import { createBrowserRouter } from "react-router-dom";
import { GuestLayout, DefaultLayout } from "../layout";
import PrivateRoute from "./PrivateRoute";
import { Doctor, Home, Login, Reception, Specialty } from "@/pages";
import { CreateBooking } from "@/components/private/reception";
import Employees from "@/pages/Employees";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/specialty",
        element: <Specialty />,
      },
      {
        path: "/reception",
        element: <Reception />,
      },
      {
        path: "/reception/booking/:id",
        element: <CreateBooking />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/doctor",
        element: <Doctor />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Home/>
  // }
]);

export default router;
