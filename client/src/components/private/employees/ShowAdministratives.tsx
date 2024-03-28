import { useQuery } from "@tanstack/react-query";
import { getUserAsAdministrativesAPI } from "@/utils/apis";
import AdministrativesTable from "./view/AdministrativesTable";

const ShowAdministratives = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserAsAdministrativesAPI"],
    queryFn: async () => {
      const response = await getUserAsAdministrativesAPI();
      return response.data;
    },
  });



  return (
    <>
      <AdministrativesTable
       isLoading={isLoading} 
       setData={data} 
       />
    </>
  );
};

export default ShowAdministratives;
