import { useState } from "react";
import DoctorForm from "./view/DoctorForm";
import AdministrativeForm from "./view/AdministrativeForm";

const AddEmployee = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  return (
    <>
      <section>
        <div className="flex justify-end items-center">
          <label className="label cursor-pointer gap-4 mr-5">
            <input type="checkbox" className="checkbox" onClick={() => setIsDoctor(!isDoctor)} />
            <span className="font-medium text-gray-600 mr-4">Add as Doctor</span>
          </label>
        </div>
        <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        {isDoctor ? <DoctorForm /> : <AdministrativeForm />}
        </div>
      </section>
    </>
  );
};

export default AddEmployee;
