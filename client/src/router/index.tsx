import { createBrowserRouter } from "react-router-dom";
import { GuestLayout, DefaultLayout } from "../layout";
import AuthenticationRouter from "./guard/AuthenticationRouter";
import { Doctor, Home, Login, Reception, Reports, Specialty } from "@/pages";
import Employees from "@/pages/Employees";
import CreateBooking from "@/components/reception/booking/CreateBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticationRouter>
        <DefaultLayout />
      </AuthenticationRouter>
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
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/doctor",
        element: <Doctor />,
      },
      {
        path: "/reception",
        element: <Reception />,
      },
      {
        path: "/create-booking/:id",
        element: <CreateBooking />,
      },
      {
        path: "/reports",
        element: <Reports />,
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
