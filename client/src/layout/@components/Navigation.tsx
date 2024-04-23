/* eslint-disable react-hooks/rules-of-hooks */
import { FaDog } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { NavigateListType, User } from "@/utils/types";

const generateNavigationLinks = (user: User): NavigateListType[] => {
  const baseLinks: NavigateListType[] = [];

  if (user.permission === "admin") {
    baseLinks.push(
      {
        name: "Specialty",
        path: "/specialty",
        icon: <BiSolidCategoryAlt size={20} />,
      },
      {
        name: "Employees",
        path: "/employees",
        icon: <GrUserNew size={20} />,
      },
      {
        name: "Reception",
        path: "/reception",
        icon: <FaDog size={20} />,
      },
      {
        name: "Doctor",
        path: "/doctor",
        icon: <FaUserDoctor size={20} />,
      },
      {
        name: "Reports",
        path: "/reports",
        icon: <TbReportAnalytics size={20} />,
      }
    );
  }

  if (user.permission === "doctor") {
    baseLinks.push({
      name: "Doctor",
      path: "/doctor",
      icon: <FaUserDoctor size={20} />,
    });
  }

  if (user.permission === "reception") {
    baseLinks.push({
      name: "Reception",
      path: "/reception",
      icon: <FaDog size={20} />,
    });
  }

  return baseLinks;
};

export default generateNavigationLinks;
