import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store.user);

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to={-1} />;
};

export default ProtectedRoute;
