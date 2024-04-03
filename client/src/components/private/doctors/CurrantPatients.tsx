import { getCurrentPatientsToDoctorAPI } from "@/utils/apis";
import { useQuery } from "@tanstack/react-query";
import staticDog from "@/assets/images/static-dog.jpg";
const CurrantPatients = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCurrentPatientsToDoctorAPI"],
    queryFn: async () => {
      const response = await getCurrentPatientsToDoctorAPI();
      return response.data;
    },
  });

  console.log(data);
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img className="min-w-80 h-96" src={staticDog} alt="Movie" />
      </figure>
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white text-base">
                <th>Owner name</th>
                <th>Animal name</th>
                <th>Animal type</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? "Loading..."
                : data && (
                    <tr className="bg-base-200 text-white">
                      <td>{data.owner_name}</td>
                      <td>{data.animal_name}</td>
                      <td>{data.animal_type}</td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        <div className="absolute top-3/4 left-1/2">
          <button
            className="btn bg-blue-600 text-white mr-2"
            //   onClick={() => setOpenModal(true)}
          >
            Add Report
          </button>
          <button
            className="btn bg-emerald-600 text-white"
            //   onClick={() => mutation.mutate(query.data?.id)}
          >
            Done
          </button>
          {/* <AddPatientReport
          openModal={openModal}
          setOpenModal={setOpenModal}
          sendId={query.data?.id}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default CurrantPatients;
