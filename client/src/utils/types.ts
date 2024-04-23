export type AuthenticationRouterProps = {
  children?: React.ReactNode;
};

export type NavigateListType = {
  name: string;
  path: string;
  icon: React.ReactNode;
};


export type AuthorizationToken = {
  access_token: string;
  expires_in: number;
  user: User;
};

export type UserParams = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_doctor: string;
  permission: string;
  extra_info: string | null;
  created_at: string;
  updated_at?: string;
}

export type UserState = {
  user: User | null;
  isLoading: boolean;
};

//* Specialty
export type SpecialtyParam = {
  specialty_name: string;
};

export type SpecialtyDetails = {
  id: number;
  specialty_name: string;
};

export type SpecialtiesState = {
  specialties: SpecialtyDetails[];
  isLoading: boolean;
};

//* Employee

export type EmployeeParams = {
  specialty_id?: number | undefined;
  is_doctor: boolean;
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: UserPermissionFixed;
  extra_info: string;
};

export type UserPermissionFixed = {
  permission: "sub_admin" | "admin" | "doctor" | "receptionist" | "user";
};

export interface DoctorDetails extends User {
  specialty_name: string;
}

export type EditDoctorParams = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  permission?: UserPermissionFixed;
  specialty_id?: number;
};

export type AppointmentsParam = {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  cases_number: string;
};

export type DoctorAppointmentsDetails = {
  id: number;
  doctor_name: string;
  user_id: number;
  day: string;
  start_time: string;
  end_time: string;
  cases_number: string;
  specialty_name: string;
};

export type AppointmentState = {
  appointment: AppointmentsParam[];
  allAppointments: DoctorAppointmentsDetails[];
};

export type CreatePatientParams = {
  id: number;
  owner_name: string;
  owner_email: string;
  owner_number: string;
  animal_name: string;
  animal_type: string;
};

export type PatientState = {
  patient: CreatePatientParams | null;
};

export type BookingParams = {
  user_id: number;
  patient_id: number;
  booking_date: string;
  specialty_id: number;
  detection_price: string;
};

export type BookingDetails = {
  id: number;
  user_id: number;
  patient_id: number;
  specialty_id: number;
  specialty_name: string;
  booking_date: string;
  medications: string;
  doctor_report: string;
  booking_status: string;
  owner_name: string;
  doctor_name: string;
  created_at: string;
  updated_at: string;
};

export type BookingState = {
  bookings: BookingDetails[];
  isLoading: boolean;
  lastPage: number;
};

export type BookingActionParams = {
  booking_id: number;
  booking_status: string;
};

export type BookingNotificationsDetails = {
  booking_id: number;
  booking_date: string;
  booking_created_at: string;
  notification_unread: boolean;
  notification_id: string;
  booking_at: string;
  owner_name: string;
  animal_name: string;
  animal_type: string;
};

export type BookingNotificationsState = {
  notifications: BookingNotificationsDetails[];
};


export type PatientQueueDetails = {
  booking_id: number;
  booking_status: string;
  patient_id: number;
  user_id: number;
  specialty_id: number;
  booking_date: string;
  owner_name: string;
  animal_name: string;
  animal_type: string;
};

export type DoctorState = {
  queue: PatientQueueDetails[];
}




export type DoctorReportParams = {
  booking_id: number;
  booking_status: string;
  medications?: string | undefined;
  doctor_report?: string | undefined;
}
