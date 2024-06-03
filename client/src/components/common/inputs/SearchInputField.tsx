import React from "react";
import { IoSearchSharp } from "react-icons/io5";

interface SearchInputFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({ onChange, value }) => {
  return (
    <div className="relative max-w-xs">
      <label className="sr-only">Search</label>
      <input
        className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg bg-slate-100 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral400 dark:placeholder-neutral500 dark:focus:ring-neutral600"
        placeholder="Search for items"
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
        <IoSearchSharp className="size-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchInputField;