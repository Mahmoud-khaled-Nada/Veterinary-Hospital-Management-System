import { FC } from "react";
import { AuthenticationRouterProps } from "@/utils/types";
import { useAuth } from "@/utils/hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AuthenticationRouter: FC<AuthenticationRouterProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log(user);
  
  if (isLoading) return "loading";

  if (user) return <>{children}</>;

  return <Navigate to="/login" state={{ from: location }} replace />;
};
export default AuthenticationRouter;