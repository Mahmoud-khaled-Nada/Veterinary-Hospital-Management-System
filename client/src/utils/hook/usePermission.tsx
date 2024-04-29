import { useNavigate } from "react-router-dom";

const usePermission = () => {
  const navigate = useNavigate();

  const selectPermission = (userPermission: string) => {
    switch (userPermission) {
      case "doctor":
        navigate("/doctor");
        break;
      case "receptionist":
        navigate("/reception");
        break;
      default:
        navigate("/");
    }
  };

  return selectPermission;
};

export default usePermission;
