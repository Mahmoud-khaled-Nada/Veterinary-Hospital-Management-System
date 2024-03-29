/* eslint-disable @typescript-eslint/no-explicit-any */
export type PrivateRouteProps = {
  children?: React.ReactNode;
};

export type navigateListType = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

//  speciality

export type CreateSpecialtyType = {
  specialty_name: string;
};

export type SpecialtyDetailsType = {
  id: number;
  specialty_name: string;
};
export type specialtiesDetailsType = {
  specialties: SpecialtyDetailsType[];
  isLoading: boolean;
};

// User CreateUserParams

export type AuthorizationToken = {
  token: any;
  user: UserDetails;
};

export type UserLoginParams = {
  email: string;
  password: string;
};

export type UserDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_doctor?: string;
  permission: string;
  extra_info: string | null;
  created_at: string;
  updated_at?: string;
};

export type AuthUserState = {
  user: UserDetails | null;
  isLoading: boolean;
};

export type CreatePatientDetails = {
  owner_name: string;
  owner_email: string;
  owner_number: string;
  animal_name: string;
  animal_type: string;
};

export type PatientDetails = {
  id: number;
  owner_name: string;
  owner_email: string;
  owner_number: string;
  animal_name: string;
  animal_type: string;
  created_at: string;
  updated_at: string;
};

export type ReceptionState = {
  patients: PatientDetails[];
  DoctorsAppointments: AppointmentsDetails[];
  isLoading?: boolean;
};

// doctor

export type DoctorAppointmentsDetails = {
  id: number;
  user_id: number;
  doctor_name: string;
  day: string;
  start_time: string;
  end_time: string;
  cases_number: string;
  specialty_name: string;
};

// booking

export type PatientBookingParams = {
  user_id: number | undefined;
  patient_id: number | undefined;
  booking_date: string | undefined;
  specialty_id: string | undefined;
  detection_price: string;
  booking_stauts: string;
};

export type PatientsBookingDetails = {
  id: number;
  owner_name: string;
  doctor_name: string;
  specialty_name: string;
  booking_date: string;
  detection_price: string;
  medications: string;
  doctor_report: string;
  booking_status: string;
  created_at: string;
  map: any;
};

export type BookingState = {
  bookings: PatientsBookingDetails[];
};

// user add

export type UserPermissionFixed = {
  permission?: "sub_admin" | "admin" | "doctor" | "receptionist" | "user";
};

export type AddDoctorParams = {
  is_doctor: boolean;
  specialty_id?: number | undefined;
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: "doctor" | UserPermissionFixed;
  extra_info: string;
};

//AppointmentsParam

export type AppointmentsParam = {
  day: string;
  start_time: string;
  end_time: string;
  cases_number: string;
};

export type AppointmentsDetails = {
  id: number;
  user_id: number;
  day: string;
  start_time: string;
  end_time: string;
  cases_number: string;
  created_at: string;
  updated_at: string;
};

export type AppointmentsState = {
  appointments: AppointmentsDetails[];
};

//Notifications

export type BookingNotificationsDetails = {
  booking_at: string;
  owner_name: string;
  owner_email: string;
  animal_name: string;
  animal_type: string;
};

export type BookingNotificationsState = {
  bookingNotifications: BookingNotificationsDetails[];
};
