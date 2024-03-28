import axios from "axios";
import { getCookie } from "@/utils/hook/useCookies";
import {
  UserLoginParams,
  CreatePatientDetails,
  CreateSpecialtyType,
  PatientBookingParams,
  PatientsBookingDetails,
  UserDetails,
  AddDoctorParams,
  AppointmentsParam,
  AppointmentsDetails,
} from "./types";
import { prefix } from "./constant";

const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;
const API = axios.create({
  baseURL: API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login

export const postLoginUserAPI = (data: UserLoginParams) => API.post("/auth/login", data);

export const getUserProfileAPI = () => API.get<UserDetails>("/profile");

export const logoutUserAPI = () => API.post("/logout");
// user add

export const postAddUserAPI = (data: UserLoginParams) => API.post("/auth/create-user", data);

//  speciality

// get employees as doctor

export const getUserAsDoctorAPI = () => API.get<UserDetails[]>(`/${prefix.DOCTORS}`);

export const updateUserasDoctorAPI = (id: number, data: AddDoctorParams) =>
  API.patch(`/${prefix.DOCTORS}/update/doctor/${id}`, data);

export const deleteUserasDoctorAPI = (id: number) => API.delete(`/${prefix.DOCTORS}/delete/doctor/${id}`);

// Administratives
export const getUserAsAdministrativesAPI = () => API.get<UserDetails[]>("/administratives");

export const getSpecialtyAPI = () => API.get(`${prefix.SPECIALTY}`);

export const createSpecialtyAPI = (data: CreateSpecialtyType) => API.post(`${prefix.SPECIALTY}`, data);

export const updateSpecialtyAPI = (id: number, data: CreateSpecialtyType) =>
  API.patch(`${prefix.SPECIALTY}/${id}`, data);

export const deleteSpecialtyAPI = (id: number) => API.delete(`${prefix.SPECIALTY}/${id}`);

// patient api

export const addPatientAPI = (data: CreatePatientDetails) =>
  API.post(`${prefix.RECEPTION}/add/patient`, data);

export const getPatientAPI = () => API.get(`${prefix.RECEPTION}/patients`);

// export const getPatientByIdAPI = (id: number) =>
//   API.get(`${prefix.RECEPTION}/patient/${id}`);

// doctors
export const getDoctorsAPI = () => API.get(`${prefix.DOCTORS}`);

export const getDoctorsAppointmentsAPI = () => API.get(`${prefix.DOCTORS}/get/appointments`);

//Appointments

export const addDoctorAppointmentsAPI = (id: number, data: AppointmentsParam) =>
  API.post(`${prefix.DOCTORS}/create/${id}/appointments`, data);

export const getDoctorAppointmentsByIdAPI = (id: number) =>
  API.get<AppointmentsDetails>(`${prefix.DOCTORS}/get-by/${id}/appointment`);

export const deleteAppointmentsByIdAPI = (id: number) =>
  API.delete(`${prefix.DOCTORS}/delete/${id}/appointment`);

export const addPatientBookingAPI = (data: PatientBookingParams) =>
  API.post(`${prefix.BOOKINGS}/add/patient/booking`, data);

export const getPatientBookingAPI = () => API.get<PatientsBookingDetails>(`${prefix.BOOKINGS}`);

export const getPatientBookingSearchAPI = (query: string) =>
  API.get(`${prefix.BOOKINGS}/booking/search?query=${query}`);
