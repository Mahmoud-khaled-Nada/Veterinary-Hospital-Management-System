import moment from "moment";

export const currentDate = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDay = (day: string) => moment(day).format("YYYY-MM-DD");

export const isFutureOrToday = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (inputDate >= today) {
    return true;
  }
  return false;
};
