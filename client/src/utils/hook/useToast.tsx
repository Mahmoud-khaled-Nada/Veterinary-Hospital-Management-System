/* eslint-disable @typescript-eslint/ban-types */
import { toast, ToastOptions } from "react-toastify";
import { MdError } from "react-icons/md";

export function useToast(defaultOptions: ToastOptions<{}> = { theme: "dark" }) {
  const success = (data: string) =>
    toast(data, { ...defaultOptions, type: "success" });

  const error = (data: string, options?: ToastOptions<{}>) =>
    toast(data, {
      ...defaultOptions,
      ...options,
      type: "error",
      icon: <MdError />,
    });

  const info = (data: string, options?: ToastOptions<{}>) =>
    toast(data, { ...defaultOptions, ...options, type: "info" });
  return { success, error, info };
}
