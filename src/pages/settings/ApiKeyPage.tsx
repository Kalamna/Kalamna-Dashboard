import { Navigate } from "react-router-dom";
import { ApiKeySection } from "../../components/settings/ApiKeySection";
import { useAuth } from "../../context/AuthContext";

// import { getUser, isOwner } from "../../utils/authUtils";


export const ApiKeyPage = () => {
  // const user = getUser();
  const { role } = useAuth();


  // if (!isOwner(user)) {
  if (role !== "owner") {

    return <Navigate to="/dashboard" replace />;
  }

  return <ApiKeySection />;
};
