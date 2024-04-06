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
      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      cols={cols}
      rows={rows}
      {...register(name.toString())}
      placeholder={placeholder ? placeholder : "Add extra information"}
    ></textarea>
  );
};

export default TextareaField;
