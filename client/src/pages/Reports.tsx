import { useState } from "react";
import TabsNavigator from "@/components/common/TabsNavigator";
import { Bs1CircleFill, Bs2CircleFill } from "react-icons/bs";
import Booking from "@/components/Reports/booking/Booking";
import SafeForm from "@/components/Reports/safe/SafeForm";

const Reports = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Bookings",
      icon: <Bs1CircleFill />,
      content: <Booking />,
    },
    {
      title: "Safe",
      icon: <Bs2CircleFill />,
      content: <SafeForm />,
    },
    // {
    //   title: "Bookings",
    //   icon: <Bs1CircleFill />,
    //   content: <Booking />,
    // },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Reports;
