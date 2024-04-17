/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

export type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
  name: string;
  title: string;
  typeInput?: string;
  icon?: React.JSXElementConstructor<any>;
};

const formatterPlaceholder = (value: string) => value.toLowerCase();

const InputFieldWithError: FC<Props<any>> = ({
  title,
  name,
  register,
  errors,
  typeInput = "text",
  icon: Icon,
}) => {
  const errorClassName = errors[name] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

  return (
    <div className="text-left">
      <label htmlFor={name} className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
        {title}
      </label>
      <div className="relative">
        <input
          type={typeInput}
          {...register(
            name,
            errors && {
              required: title + " is Required",
            }
          )}
          className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${errorClassName}`}
          aria-describedby={`${name}-error-helper`}
          placeholder={`Enter ${formatterPlaceholder(title)}....`}
        />
        {Icon && (
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
            <Icon className={`flex-shrink-0 size-4 ${errors[name] ? "text-red-500" : ""}`} />
          </div>
        )}
      </div>
      {errors && errors[name] && (
        <p className="text-sm text-red-600 mt-2" id={`${name}-error-helper`}>
          <span className="font-medium">Oh, snap!</span> {errors[name]?.message as any}
        </p>
      )}
    </div>
  );
};

export default InputFieldWithError;
