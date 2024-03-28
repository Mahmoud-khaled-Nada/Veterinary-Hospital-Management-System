import TabsNavigator from "@/components/common/TabsNavigator";
import { NewPatient, ShowPatientsBooking } from "@/components/private/reception";
import { useState } from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill  } from "react-icons/bs";

const Reception = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "New patient",
      icon: <Bs1CircleFill />,
      content: <NewPatient />,
    },
    {
      title: "Patients booking",
      icon: <Bs2CircleFill />,
      content: <ShowPatientsBooking />,
    },
    {
      title: "Get Employee as Admin",
      icon: <Bs3CircleFill />,
      content: "Hello tab two",
    },
  ];

  return (
    <>
      <TabsNavigator active={activeTab} setActive={setActiveTab} tabContent={tabs} />
    </>
  );
};

export default Reception;
