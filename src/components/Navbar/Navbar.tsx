import { RiFileList3Line } from "react-icons/ri";
import NavbarItem from "./Navbar-Item";
import { TbDeviceAnalytics } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiFoodMenu } from "react-icons/bi";
import { Button } from "@mui/material";
import { PiSignOut } from "react-icons/pi";

interface NavbarItem {
  title: string;
  to: string;
  icon: JSX.Element;
}

const Navbar = () => {
  const navbarItems: NavbarItem[] = [
    {
      title: "dashboard",
      to: "/",
      icon: <TbDeviceAnalytics />,
    },
    {
      title: "order",
      to: "/order",
      icon: <RiFileList3Line />,
    },
    {
      title: "listOrders",
      to: "/list-orders",
      icon: <HiOutlineClipboardList />,
    },
    {
      title: "menu",
      to: "/menu",
      icon: <BiFoodMenu />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 border-r h-full">
      <div className="flex flex-col items-center gap-4 w-full p-4">
        <div className="w-full h-[150px] flex  items-center justify-center">
          <img src="poring.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="space-y-1">
        {navbarItems.map((item) => (
          <NavbarItem key={item.title} {...item} />
        ))}
      </div>

      <Button
        variant="text"
        color="primary"
        href="/login"
        sx={{
          display: "flex",
          gap: "8px",
        }}
      >
        <PiSignOut />
        Sign out
      </Button>
    </div>
  );
};

export default Navbar;
