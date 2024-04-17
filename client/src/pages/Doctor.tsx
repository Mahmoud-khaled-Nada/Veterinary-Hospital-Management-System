import { useState } from "react";
import TabsNavigator from "@/components/common/TabsNavigator";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import Appointment from "@/components/doctors/Appointment/Appointment";
import NewBookingNotification from "@/components/doctors/NewBookingNotification";
import { MdNotificationsActive } from "react-icons/md";
import PatientsTodayList from "@/components/doctors/patients/PatientsTodayList";
import CurrantPatients from "@/components/doctors/patients/CurrantPatients";
const Doctor = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Notifications",
      icon: <MdNotificationsActive />,
      content: <NewBookingNotification />,
    },
    {
      title: "Add appointments",
      icon: <Bs1CircleFill />,
      content: <Appointment />,
    },
    {
      title: "Waiting list ",
      icon: <Bs2CircleFill />,
      content: <PatientsTodayList />,
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
