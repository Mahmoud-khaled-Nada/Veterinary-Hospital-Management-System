import { FC, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiXCircle } from "react-icons/hi";
import doctorImg from "@/__assets__/images/doctor.webp";
import { DoctorAppointmentsDetails } from "@/utils/types";

type Props = {
  title: string;
  setDoctor: DoctorAppointmentsDetails[];
  setDoctorId: (id: number) => void;
};

const IconComponent: FC<{
  isSelected: boolean;
  onClickHandler: () => void;
}> = ({ isSelected, onClickHandler }) => {
  const Icon = isSelected ? AiFillCheckCircle : HiXCircle;
  const color = isSelected ? "#009c00" : "red";
  return <Icon onClick={onClickHandler} color={color} size={22} cursor="pointer" />;
};

const ShowDoctorCardList: FC<Props> = ({ title, setDoctor, setDoctorId }) => {
  const [selectId, setSelectId] = useState<number>();

  const handleIconClick = (userId: number) => {
    setDoctorId(userId);
    setSelectId(userId);
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-neutral800 dark:border-neutral700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {setDoctor.length > 0 &&
            setDoctor.map((row, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={doctorImg} alt="Doctor" />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {row.doctor_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {row.start_time} && {row.end_time}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-4 text-base font-semibold text-gray-900 dark:text-white">
                    <span> {row.cases_number}</span>
                    <IconComponent
                      isSelected={selectId === row.user_id}
                      onClickHandler={() => handleIconClick(row.user_id)}
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDoctorCardList;
