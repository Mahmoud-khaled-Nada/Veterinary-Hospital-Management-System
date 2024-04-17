import { FC } from "react";

type Props = {
  isLoading: boolean;
  numberPages: number;
  onClick: (index: number) => void;
};

const PaginationButtons: FC<Props> = ({ isLoading, numberPages, onClick }) => {
  function Buttons(num: number): JSX.Element[] {
    return Array.from({ length: num }, (_, index) => (
      <button
        key={index}
        type="button"
        className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"
        onClick={() => onClick(index + 1)}
      >
        {index + 1}
      </button>
    ));
  }

  return (
    <div className="py-1 px-4">
      <nav className="flex items-center space-x-1">
        {isLoading ? (
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          Buttons(numberPages)
        )}
      </nav>
    </div>
  );
};

export default PaginationButtons;
