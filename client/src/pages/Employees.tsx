import TabsNavigator from "@/components/common/TabsNavigator";
import AddEmployee from "@/components/employees/AddEmployee";
import ShowAdministrative from "@/components/employees/e-administrative/ShowAdministrative";
import ShowDoctors from "@/components/employees/e-doctor/ShowDoctors";
import { useState } from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

const Employees = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Add new employee",
      icon: <Bs1CircleFill />,
      content: <AddEmployee />,
    },
    {
      title: "Show doctors",
      icon: <Bs2CircleFill />,
      content: <ShowDoctors/>,
    },
    {
      title: "Show Administratives",
      icon: <Bs3CircleFill />,
      content: <ShowAdministrative/>,
    },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Employees;
