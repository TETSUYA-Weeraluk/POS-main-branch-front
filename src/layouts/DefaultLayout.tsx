import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderDefault from "../components/Header/HeaderDefault";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../config/authProvider";
import OwnerLayout from "./OwnerLayout";

const DefaultLayout: React.FC = () => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role === "ADMIN") {
    return <OwnerLayout />;
  }
  if (user.role === "MANAGER") {
    return <OwnerLayout />;
  }
  if (user.role === "EMPLOYEE") {
    return <OwnerLayout />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <div>
        <Navbar />
      </div>
      <div className="w-full">
        <header>
          <HeaderDefault />
        </header>
        <main className="w-full flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
