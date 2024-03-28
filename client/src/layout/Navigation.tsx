import { navigateListType } from "@/utils/types";
import { FaDog } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";

export const ListLinkes: navigateListType[] = [
  {
    name: "Specialty",
    path: "/specialty",
    icon: <BiSolidCategoryAlt size={20} />,
  },
  {
    name: "Reception",
    path: "/reception",
    icon: <FaDog size={20} />,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: <GrUserNew size={20} />,
  },
  {
    name: "Doctor",
    path: "/doctor",
    icon: <FaUserDoctor size={20} />,
  },
];
