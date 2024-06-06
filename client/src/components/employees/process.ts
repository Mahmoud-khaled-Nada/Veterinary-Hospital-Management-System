/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  AdministrativesAPI,
  deleteAdministrativesAPI,
  deleteDoctorsAPI,
  DoctorsAPI,
  postAddUserAPI,
  updateDoctorsAPI,
} from "@/utils/apis";
import { EditDoctorParams, User, UserParams } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const addEmployeeMutation = () => {
  return useMutation<any, AxiosError, UserParams>({
    mutationKey: ["addEmployeeMutation"],
    mutationFn: async (data: UserParams) => {
      return await postAddUserAPI(data);
    },
    onError: (error: AxiosError) => {
      console.log("error from addEmployeeMutation  functions..");
      console.log(error.message);
      toast.error("your data is invalid");
    },
  });
};

export const fetchDoctorsQuery = () => {
  return useQuery<any>({
    queryKey: ["fetchDoctors"],
    queryFn: async () => {
      const response = await DoctorsAPI();
      return response.data.data;
    },
  });
};

export const useDeleteDoctorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, number>({
    mutationKey: ["addEmployeeMutation"],
    mutationFn: async (id: number) => {
      const response = await deleteDoctorsAPI(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDoctors"] });
      toast.success("Doctor deleted successfully");
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
    },
  });
};

export const useUpdateDoctorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { selectedId: number; filteredData: EditDoctorParams }>({
    mutationKey: ["updateDoctorMutation"],
    mutationFn: async ({ selectedId, filteredData }) => {
      const response = await updateDoctorsAPI(selectedId, filteredData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDoctors"] });
      toast.success("Doctor updated successfully");
    },
    onError: (error) => {
      console.error("Error updating doctor:", error);
      toast.error("Failed to update doctor");
    },
  });
};

export const useFetchAdministrativeQuery = () => {
  return useQuery<User[]>({
    queryKey: ["fetchAdministrative"],
    queryFn: async () => {
      const response = await AdministrativesAPI();
      return response.data;
    },
  });
};

export const useDeleteAdministrativeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, number>({
    mutationKey: ["deleteDoctorsAPI"],
    mutationFn: async (id: number) => {
      const response = await deleteAdministrativesAPI(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAdministrative"] });
      toast.success("Administrative deleted successfully");
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
    },
  });
};
