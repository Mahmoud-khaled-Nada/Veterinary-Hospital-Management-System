import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setSpecialties } from "@/redux/specialty/specialtySlice";
import { CreateSpecialtyType } from "@/utils/types";
import { createSpecialtyAPI, updateSpecialtyAPI } from "@/utils/apis";

export const CreateSpecialtyAction = (resetFn: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const mutation = useMutation({
    mutationKey: ["CreateSpecialtyAction"],
    mutationFn: async (data: CreateSpecialtyType) => {
      return await createSpecialtyAPI(data);
    },
    onSuccess: (response) => {
      console.log("Create Specialty");
      dispatch(setSpecialties(response.data[0]));
      toast.clearWaitingQueue();
      toast(response?.data?.message, { type: "success" });
      resetFn();
    },
    onError: (error) => {
      console.log("Create Specialty Error");
      console.log(error);
      toast.clearWaitingQueue();
      toast("please try again", { type: "error" });
    },
  });

  return mutation;
};

export const UpdateSpecialtyAction = (id: number, closeModel: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const mutation = useMutation({
    mutationFn: async (data: CreateSpecialtyType) => {
      return await updateSpecialtyAPI(id, data);
    },
    onSuccess: (response) => {
      console.log("Update Specialty");
      dispatch(setSpecialties(response.data[0]));
      toast.clearWaitingQueue();
      toast(response.data.message, { type: "success" });
      closeModel();
    },
    onError: (err) => {
      console.log(err);
      toast.clearWaitingQueue();
      toast("Please try again", { type: "error" });
    },
  });

  return mutation;
};
