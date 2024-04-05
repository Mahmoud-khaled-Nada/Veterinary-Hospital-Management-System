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
      className="textarea textarea-bordered"
      cols={cols}
      rows={rows}
      {...register(name.toString())}
      placeholder={placeholder ? placeholder : "Add extra information"}
    ></textarea>
  );
};

export default TextareaField;
