import moment from "moment";

export const currentDate = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDay = (day: string) => moment(day).format("YYYY-MM-DD");

export const isFutureOrToday = (date: string): boolean => {
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (inputDate >= today) return true;
  return false;
};

export const formatTitle = (title: string): string => {
  return title
    .split("/")
    .slice(1)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};
