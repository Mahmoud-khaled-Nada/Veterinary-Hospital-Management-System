/* eslint-disable react-hooks/rules-of-hooks */
import { AppDispatch } from "@/store";
import { setSpecialties } from "@/store/specialtySlice";
import { createSpecialtyAPI, updateSpecialtyAPI } from "@/utils/apis";
import { SpecialtyParam } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const createSpecialtyMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: async (data: SpecialtyParam) => {
      return await createSpecialtyAPI(data);
    },
    onSuccess: (response) => {
      dispatch(setSpecialties(response.data[0]));
      toast.success("Specialty created successfully");
    },
    onError: (error) => {
      console.log("Create Specialty Error");
      console.log(error);
      toast.error("please try again");
    },
  });
};

export const updateSpecialtyMutation = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: async (data: SpecialtyParam) => {
      return await updateSpecialtyAPI(id, data);
    },
    onSuccess: (response) => {
      dispatch(setSpecialties(response.data[0]));
      toast(response.data.message, { type: "success" });
    },
    onError: (err) => {
      console.log(err);
      toast("Please try again", { type: "error" });
    },
  });
};
