import { Outlet } from "react-router-dom";
import DefaultNavbar from "../components/DefaultNavbar/DefaultNavbar";

const OwnerLayout = () => {
  return (
    <div>
      <header>
        <DefaultNavbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
