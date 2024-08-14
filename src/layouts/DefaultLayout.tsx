import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../config/authProvider";
import OwnerLayout from "./OwnerLayout";

const DefaultLayout: React.FC = () => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role === "ADMIN" || user.role === "MANAGER") {
    return <OwnerLayout />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <span>Hello</span>
    </div>
  );
};

export default DefaultLayout;
