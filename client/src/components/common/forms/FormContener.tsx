import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  style?: string;
};
const FormContener: FC<Props> = ({ children, style }) => {
  return (
    <div className={` border rounded-xl shadow-sm p-6 dark:bg-neutral-800 dark:border-neutral-700 ${style}`}>
      {children}
    </div>
  );
};

export default FormContener;

