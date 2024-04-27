import { FC } from "react";

type Props = {
  onClick: () => void;
  title: string;
  style?: string;
  color?: string;
  isLoading?: boolean;
};

const SmallButton: FC<Props> = ({ title, onClick, style, isLoading, color = "blue" }) => {
  return (
    <button
      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white ${`bg-${color}-600  hover:bg-${color}-700`}  disabled:opacity-50 disabled:pointer-events-none ${style}`}
      onClick={onClick}
    >
      {isLoading && (
        <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"></span>
      )}
      {title}
    </button>
  );
};

export default SmallButton;
