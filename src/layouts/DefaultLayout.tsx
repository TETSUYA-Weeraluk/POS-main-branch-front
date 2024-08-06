import React from "react";
import { Outlet } from "react-router-dom";
import HeaderDefault from "../components/Header/HeaderDefault";
import Navbar from "../components/Navbar/Navbar";

const DefaultLayout: React.FC = () => (
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

export default DefaultLayout;
