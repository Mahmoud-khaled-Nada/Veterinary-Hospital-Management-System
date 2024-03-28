import DoctorsTable from "./view/DoctorsTable";
import { fetchDoctorsQuery } from "./action";

const ShowDoctors = () => {
  const { data, isLoading } = fetchDoctorsQuery();

  return (
    <>
      <DoctorsTable isLoading={isLoading} setData={data} />
    </>
  );
};

export default ShowDoctors;
