import { RiFileList3Line } from "react-icons/ri";
import NavbarItem from "./Navbar-Item";
import { TbDeviceAnalytics } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineHistory } from "react-icons/md";
import { LuUsers } from "react-icons/lu";

interface NavbarItem {
  title: string;
  to: string;
  icon: JSX.Element;
}

const Navbar = () => {
  const navbarItems: NavbarItem[] = [
    {
      title: "nav.dashboard",
      to: "/",
      icon: <TbDeviceAnalytics />,
    },
    {
      title: "nav.order",
      to: "/order",
      icon: <RiFileList3Line />,
    },
    {
      title: "nav.listOrders",
      to: "/list-orders",
      icon: <HiOutlineClipboardList />,
    },
    {
      title: "nav.history",
      to: "/history-orders",
      icon: <MdOutlineHistory />,
    },
    {
      title: "nav.product",
      to: "/product",
      icon: <BiFoodMenu />,
    },
    {
      title: "nav.employee",
      to: "/employee",
      icon: <LuUsers />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 border-r h-full">
      <div className="flex flex-col items-center gap-4 w-full p-4">
        <div className="w-full h-[150px] flex  items-center justify-center">
          <img
            src="poring.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="space-y-1">
        {navbarItems.map((item) => (
          <NavbarItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
