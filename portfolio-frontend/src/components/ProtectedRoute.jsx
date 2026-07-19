import React from "react";
import { Navigate } from "react-router-dom";
import { getAdminToken, isAdminSessionActive } from "../utils/adminSession";

function ProtectedRoute({ children }) {
  const isAuthorized = Boolean(getAdminToken()) && isAdminSessionActive();

  if (!isAuthorized) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
