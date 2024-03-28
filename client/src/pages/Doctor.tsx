import { useState } from "react";
import TabsNavigator from "@/components/common/TabsNavigator";
import { Bs1CircleFill } from "react-icons/bs";
import DoctorsAppointments from "@/components/private/doctors/DoctorsAppointments";

const Doctor = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Add appointments",
      icon: <Bs1CircleFill />,
      content: <DoctorsAppointments />,
    },
    // {
    //   title: "Show doctors",
    //   icon: <Bs2CircleFill />,
    //   content: <ShowDoctors />,
    // },
    // {
    //   title: "Show Administratives",
    //   icon: <Bs3CircleFill />,
    //   content: <ShowAdministratives />,
    // },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Doctor;


