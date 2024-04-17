import { useState } from "react";
import TabsNavigator from "@/components/common/TabsNavigator";
import { Bs1CircleFill } from "react-icons/bs";
import Booking from "@/components/Reports/booking/Booking";

const Reports = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Bookings",
      icon: <Bs1CircleFill />,
      content: <Booking />,
    },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Reports;
