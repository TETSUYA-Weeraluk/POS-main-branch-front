import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
