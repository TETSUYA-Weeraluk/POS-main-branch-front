import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../config/authProvider";
import OwnerLayout from "./OwnerLayout";
import EmployeeLayout from "./EmployeeLayout";

const DefaultLayout: React.FC = () => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role === "ADMIN" || user.role === "MANAGER") {
    return <OwnerLayout />;
  }

  if (user.role === "EMPLOYEE") {
    return <EmployeeLayout />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <span>Hello</span>
      {/* <div>
        <Navbar />
      </div>
      <div className="w-full">
        <header>
          <HeaderDefault />
        </header>
        <main className="w-full flex-grow p-4">
          <Outlet />
        </main>
      </div> */}
    </div>
  );
};

export default DefaultLayout;
