import { FC } from "react";

type Props = {
  title: string;
  style?: string;
  onClick: () => void;
};

const SmallButton: FC<Props> = ({ title, onClick , style }) => {
  return (
    <button
      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${style}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SmallButton;
