import { FC } from "react";

type Props = {
  defaultPermission?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: string | undefined;
};

const SelectPermissions: FC<Props> = ({ defaultPermission, onChange, errors }) => {
  const permissions = ["sub_admin", "admin", "doctor", "receptionist", "user"];

  return (
    <div className="text-left">
      <label htmlFor="permission" className="block text-sm text-gray-700 font-medium mb-2 dark:text-white">
        Choose permission * <span className=" text-green-500">{defaultPermission}</span>
      </label>
      <select id="permission" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={onChange}>
        <option disabled>choose</option>
        {permissions.map((permission) => (
          <option key={permission} value={permission}>
            {permission}
          </option>
        ))}
      </select>

      {errors && (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">
          <span className="font-medium">Oh, snap!</span> {errors}
        </p>
      )}
    </div>
  );
};

export default SelectPermissions;
