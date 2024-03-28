import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  style?: string;
};
//  bg-white
const ContenerForm: FC<Props> = ({ children, style }) => {
  return <div className={`border rounded-xl shadow-sm p-6 dark:bg-slate-800 border-gray-700 ${style}`}>{children}</div>;

};

export default ContenerForm;
