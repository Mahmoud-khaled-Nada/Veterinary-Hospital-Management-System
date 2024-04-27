import axios from "axios";
import { getCookie } from "@/utils/hook/useCookies";
import { prefix } from "./constant";
import {
  AppointmentsParam,
  BookingActionParams,
  BookingDetails,
  BookingParams,
  BookingReportParams,
  CreatePatientParams,
  DoctorDetails,
  DoctorReportParams,
  EditDoctorParams,
  ReportParams,
  SpecialtyParam,
  User,
  UserParams,
} from "./types";

const { VITE_API_URL_DEV } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = getCookie("access_token");
    token ? (config.headers["Authorization"] = `Bearer ${token}`) : (location.href = "/login");
    return config;
  },
  (error) => {
    location.href = "/login";
    return Promise.reject(error);
  }
);

//? start end-point apis

//** start user actions **
export const postLoginUserAPI = (data: UserParams) => api.post("/auth/login", data);
export const postAddUserAPI = (data: UserParams) => api.post("/auth/create-user", data);
export const getUserProfileAPI = () => api.get<User>("/profile");
export const logoutUserAPI = () => api.post("/logout");

//** start Specialty actions **
export const createSpecialtyAPI = (data: SpecialtyParam) => api.post(`${prefix.SPECIALTY}`, data);

export const getSpecialtyAPI = () => api.get(`${prefix.SPECIALTY}`);

export const updateSpecialtyAPI = (id: number, data: SpecialtyParam) =>
  api.patch(`${prefix.SPECIALTY}/${id}`, data);

export const deleteSpecialtyAPI = (id: number) => api.delete(`${prefix.SPECIALTY}/${id}`);

//** start Employees actions **
export const DoctorsAPI = () => api.get(`doctor`);

export const updateDoctorsAPI = (id: number, data: EditDoctorParams) =>
  api.patch(`doctor/update/${id}`, data);

export const deleteDoctorsAPI = (id: number) => api.delete(`doctor/delete/${id}`);

export const AdministrativesAPI = () => api.get<User[]>("/administratives");
export const deleteAdministrativesAPI = (id: number) => api.delete<User>(`/administratives/delete/${id}`);

//** start Appointments actions **
export const addDoctorAppointmentsAPI = (data: AppointmentsParam) => api.post("/appointments/create", data);

export const doctorAppointmentsAPI = () => api.get<AppointmentsParam[]>("appointments/doctor");
export const deleteAppointmentAPI = (id: number) => api.delete(`appointments/delete/${id}`);

export const allAppointmentsAPI = () => api.get("appointments");

//** start patients actions **

export const addPatientAPI = (data: CreatePatientParams) => api.post("patients/create", data);

//** start booking actions **
export const createBookingAPI = (data: BookingParams) => api.post("/booking/create", data);

export const getBookingAPI = (page: number) => api.get(`booking?page=${page}`);

export const bookingSearchAPI = (query: string) => api.get(`/booking/search?query=${query}`);

export const transferBookingActionAPI = (data: BookingActionParams) =>
  api.post("/reception-process/transfer-patient-to-doctor", data);

//bookingNotificationsAPI

export const bookingNotificationsAPI = () => api.get("/doctor-notifications/new-booking");
export const readBookingNotificationsAPI = (id: string) =>
  api.post(`/doctor-notifications/read-booking/${id}`);

//** start doctors patients-queue actions **
export const getPatientsQueuetoDoctorAPI = () => api.get("/doctor-process/patients-queue");

export const bookingFinishedAPI = (data: DoctorReportParams) =>
  api.patch("/doctor-process/booking-done", data);

//** start Reports actions **
export const bookingReportAPI = (data: BookingReportParams) => api.post("/reports/booking", data);
export const deleteBookingReportAPI = (id: number) => api.delete(`/reports/booking/${id}/delete`);

export const safeReportAPI = (data: ReportParams) => api.post("/reports/safe", data);

