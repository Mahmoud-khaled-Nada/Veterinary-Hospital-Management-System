import { useState } from "react";
import DoctorForm from "./e-doctor/DoctorForm";
import AdministrativeForm from "./e-administrative/AdministrativeForm";

const AddEmployee = () => {

  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <>
      <section>
        <div className="flex justify-end items-center">
          <label className="label cursor-pointer gap-4 mr-5">
            <input type="checkbox" className="checkbox" onClick={() => setIsDoctor(!isDoctor)} />
            <span className="font-medium text-gray-300 mr-4">Add As Doctor</span>
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