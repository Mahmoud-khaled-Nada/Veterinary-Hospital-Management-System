//

import { useEffect, useState } from "react";
import SearchInputField from "@/components/common/inputs/SearchInputField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { searchOnBookingThunk } from "@/store/booking/bookingThunk";
import { getBookingThunk } from "@/store/booking/bookingThunk";
import PaginationButtons from "@/components/common/button/PaginationButtons";
import BookingActionModel from "./BookingActionModel";
import { formatDay } from "@/utils/helper";

const ShowBookingContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const { bookings, isLoading, lastPage } = useSelector((state: RootState) => state.booking);
  useEffect(() => {
    if (searchTerm) dispatch(searchOnBookingThunk(searchTerm));
    else bookings.length === 0 && dispatch(getBookingThunk(page));
  }, [dispatch, page, searchTerm]);

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle ">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="py-3 px-4">
                <SearchInputField onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 dark:bg-neutral700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Owner name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Specialty
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Doctor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Booking Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Booking stauts
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Created at
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.length > 0 &&
                      bookings?.map((row, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {row.owner_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {row.specialty_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {row.doctor_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {row.booking_date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {row.booking_status === "in_progress" ? (
                              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-blue-600 text-blue-600 dark:text-blue-500">
                                {row.booking_status}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-teal-500 text-teal-500">
                                {row.booking_status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {formatDay(row.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-blue-600 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-blue-500 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              onClick={() => {
                                setBookingId(row.id);
                                setOpenModal(true);
                              }}
                            >
                              Actions
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <PaginationButtons
                isLoading={isLoading}
                numberPages={lastPage || 1}
                onClick={(index: number) => setPage(index)}
              />
            </div>
          </div>
        </div>
      </div>
      <BookingActionModel openModal={openModal} setOpenModal={setOpenModal} bookingId={bookingId} />
    </>
  );
};

export default ShowBookingContent;
