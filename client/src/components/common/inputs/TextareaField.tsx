/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  cols?: number;
  rows?: number;
  register: UseFormRegister<T>;
  name: string;
  placeholder?: string;
};
const TextareaField: FC<Props<any>> = ({ cols, rows, register, name, placeholder }) => {
  return (
    <textarea
      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral400 dark:placeholder-neutral500 dark:focus:ring-neutral600"
      cols={cols}
      rows={rows}
      {...register(name.toString())}
      autoComplete="off"
      placeholder={placeholder ? placeholder : "Add extra information"}
    ></textarea>
  );
};

export default TextareaField;
