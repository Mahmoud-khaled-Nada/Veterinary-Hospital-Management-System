import TabsNavigator from "@/components/common/TabsNavigator";
import { DoctorList, NewPatient, ShowPatientsBooking } from "@/components/private/reception";
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
      title: "Doctors",
      icon: <Bs3CircleFill />,
      content: <DoctorList />,
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