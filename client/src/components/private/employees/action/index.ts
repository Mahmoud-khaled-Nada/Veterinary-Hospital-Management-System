/* eslint-disable react-hooks/rules-of-hooks */
import { deleteUserasDoctorAPI, getUserAsDoctorAPI, postAddUserAPI, updateUserasDoctorAPI } from "@/utils/apis";
import { useToast } from "@/utils/hook/useToast";
import { AddDoctorParams } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const { success, error } = useToast({ theme: "dark" });

export const addDoctorMutation = (resetFn: () => void) => {
  const mutation = useMutation({
    mutationKey: ["postAddUserAPI"],
    mutationFn: async (data: AddDoctorParams) => {
      return await postAddUserAPI(data);
    },
    onSuccess: (res) => {
      console.log(res);
      success(res.data.message);
      resetFn();
    },
    onError: (err) => {
      console.log("Create Specialty Error");
      console.log(err);
      error("Error sending friend request");
    },
  });

  return mutation;
};


export const fetchDoctorsQuery = () =>{
  const query = useQuery({
    queryKey: ["getUserAsDoctorAPI"],
    queryFn: async () => {
      const response = await getUserAsDoctorAPI();
      return response.data;
    },
  });

  return {
    ...query,
    refetch: query.refetch 
  };
}


export const updateUserasDoctorMutation = (doctorId:number) => {
  const doctorsQuery = fetchDoctorsQuery();
  const mutation = useMutation({
    mutationKey: ["updateUserasDoctorAPI", doctorId],
    mutationFn: async (data: AddDoctorParams) => {
      return await updateUserasDoctorAPI(doctorId, data);
    },
    onSuccess() {
      success("Doctor updated successfully")
      doctorsQuery.refetch();
    },
    onError: (err) => {
      console.log("Create Specialty Error");
      console.log(err);
      error("Error sending friend request");
    },
  });

  return mutation;
};



export const deleteUserasDoctorMutation = () => {
  const doctorsQuery = fetchDoctorsQuery();
  const mutation = useMutation({
    mutationKey: ["deleteUserasDoctorAPI"],
    mutationFn: async (doctorId:number) => {
      return await deleteUserasDoctorAPI(doctorId);
    },
    onSuccess() {
      success("Doctor deleted successfully")
      doctorsQuery.refetch();
    },
    onError: (err) => {
      console.log("Create Doctor Error");
      console.log(err);
      error("Error deleted Doctor request");
    },
  });

  return mutation;
};