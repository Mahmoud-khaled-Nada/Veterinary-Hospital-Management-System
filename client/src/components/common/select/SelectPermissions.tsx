/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
  defaultPermission?: string;
};

const SelectPermissions: FC<Props<any>> = ({ defaultPermission, register, errors }) => {
  const permissions = ["sub_admin", "admin", "doctor", "receptionist", "user"];

  return (
    <div className="text-left">
      <label htmlFor="permission" className="block text-sm font-medium mb-2 dark:text-white">
        Choose permission * <span className=" text-green-500">{defaultPermission}</span>
      </label>
      <select
        id="permission"
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral400 dark:placeholder-neutral500 dark:focus:ring-neutral600"
        {...register("permission")}
      >
        <option disabled>choose</option>
        {permissions.map((permission) => (
          <option key={permission} value={permission}>
            {permission}
          </option>
        ))}
      </select>

      {errors['permission'] && (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">
          <span className="font-medium">Oh, snap!</span> {errors?.permission.message as any}
        </p>
      )}
    </div>
  );
};

export default SelectPermissions;
