import { useState } from "react";
import TabsNavigator from "@/components/common/TabsNavigator";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import DoctorsAppointments from "@/components/private/doctors/DoctorsAppointments";
import NotificationsList from "@/components/common/notifications/NotificationsList";
import { MdNotificationsActive } from "react-icons/md";
import Patientswaiting from "@/components/private/doctors/Patientswaiting";
import CurrantPatients from "@/components/private/doctors/CurrantPatients";

const Doctor = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Notifications",
      icon: <MdNotificationsActive />,
      content: <NotificationsList />,
    },
    {
      title: "Add appointments",
      icon: <Bs1CircleFill />,
      content: <DoctorsAppointments />,
    },
    {
      title: "Patient waiting",
      icon: <Bs2CircleFill />,
      content: <Patientswaiting />,
    },
    {
      title: "Currant patient",
      icon: <Bs3CircleFill />,
      content: <CurrantPatients />,
    },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Doctor;
