import React, { FC } from "react";

type Props = {
  title: string;
  inputType?: "button" | "submit" | "reset";
  isLoading?: boolean;
  addClass? : boolean;
  color?: string;
  onClick?: () => void;
};

const LoadingButton: FC<Props> = ({
  title,
  isLoading,
  color = "blue",
  inputType = "button",
  addClass = false,
  onClick,
}) => {
  return (
    <div className={addClass ? "mt-4 text-center": ""}>
      <button
        type={inputType}
        className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-${color}-600 text-white hover:bg-${color}-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
        onClick={onClick}
      >
        {isLoading && (
          <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"></span>
        )}
        {title}
      </button>
    </div>
  );
};

export default LoadingButton;
