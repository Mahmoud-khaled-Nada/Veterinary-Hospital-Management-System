import { useState } from "react";
import TabsNavigator from "@/components/common/TabsNavigator";
import { Bs1CircleFill } from "react-icons/bs";
import { ShowBooking } from "@/components/private/report";


const Reports = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Show bookings",
      icon: <Bs1CircleFill />,
      content: <ShowBooking />,
    },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Reports;
