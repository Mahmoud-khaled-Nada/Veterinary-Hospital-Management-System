import { FC, useState } from "react";
import { DoctorAppointmentsDetails } from "@/utils/types";
import { AiFillCheckCircle } from "react-icons/ai";
import doctorImg from "@/assets/images/doctor.webp";

type Props = {
  title: string;
  data: DoctorAppointmentsDetails[];
  setDoctorId: (id: number) => void;
};
const ShowDoctorCardList: FC<Props> = ({ title, data, setDoctorId }) => {
  const [selectId, setSelectId] = useState<number>();
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
        {/* <a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a> */}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data &&
            data.map((row, indxe) => (
              <li key={indxe} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={doctorImg} alt="Neil image" />
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
                    <span>
                      <AiFillCheckCircle
                        onClick={() => {
                          setDoctorId(+row.user_id);
                          setSelectId(row.user_id);
                        }}
                        color={selectId == row.user_id ? "#009c00" : ""}
                        size={22}
                        cursor="pointer"
                      />
                    </span>
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
