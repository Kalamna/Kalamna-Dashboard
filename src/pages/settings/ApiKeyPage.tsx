import { Navigate } from "react-router-dom";
import { ApiKeySection } from "../../components/settings/ApiKeySection";
import { getUser, isOwner } from "../../utils/authUtils";

export const ApiKeyPage = () => {
  const user = getUser();

  if (!isOwner(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <ApiKeySection />;
};
