import TabsNavigator from "@/components/common/TabsNavigator";
import ShowBookingContent from "@/components/reception/booking/ShowBookingContent";
import ShowBookingDone from "@/components/reception/booking/booking-done/ShowBookingDone";
import ShowDoctorsAppointments from "@/components/reception/doctors/ShowDoctorsAppointments";
import Patient from "@/components/reception/patient/Patient";
import { useState } from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill, Bs4CircleFill } from "react-icons/bs";

const Reception = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Patient",
      icon: <Bs1CircleFill />,
      content: <Patient />,
    },
    {
      title: "Booking Process",
      icon: <Bs2CircleFill />,
      content: <ShowBookingContent />,
    },
    {
      title: "Booking Done",
      icon: <Bs3CircleFill />,
      content: <ShowBookingDone />,
    },
    {
      title: "Doctors",
      icon: <Bs4CircleFill />,
      content: <ShowDoctorsAppointments />,
    },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Reception;

//
