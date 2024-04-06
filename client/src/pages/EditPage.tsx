import GeneralModelContainer from "@/components/common/models/GeneralFormModelContainer";
import { useState } from "react";

const EditPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>
      {open && (
        <GeneralModelContainer onClose={() => setOpen(false)} title="mode">
          <form method="dialog" className="grid grid-cols-6 gap-6">
       
              <label htmlFor="Name" className="block text-sm font-medium text-gray-400 p-1">
                Change Status of booking
              </label>
              <select
                id="permission"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <option>choose</option>
                <option value="waiting">waiting</option>
                <option value="in_progress">transfer to doctor</option>
                <option value="cancel">cancel</option>
              </select>
      

              <label htmlFor="Name" className="block text-sm font-medium text-gray-400 p-1">
                Change Status of booking
              </label>
              <select
                id="permission"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <option>choose</option>
                <option value="waiting">waiting</option>
                <option value="in_progress">transfer to doctor</option>
                <option value="cancel">cancel</option>
              </select>

            <div className="col-span-6">
              <label htmlFor="Name" className="block text-sm font-medium text-gray-400 p-1">
                Change Status of booking
              </label>
              <select
                id="permission"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <option>choose</option>
                <option value="waiting">waiting</option>
                <option value="in_progress">transfer to doctor</option>
                <option value="cancel">cancel</option>
              </select>
            </div>
          </form>
        </GeneralModelContainer>
      )}
    </>
  );
};

export default EditPage;
