import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import HeaderDefault from "../../components/Header/HeaderDefault";

const Branch = () => {
  return (
    <div className="flex h-full w-full">
      <Navbar />

      <main className="space-y-4">
        <HeaderDefault />
        <div className="px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Branch;
